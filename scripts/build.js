
import fs from 'fs-extra';
import { glob } from 'glob';
import CleanCSS from 'clean-css';
import { minify as terserMinify } from 'terser';
import { minify as htmlMinify } from 'html-minifier-terser';
import path from 'node:path';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminSvgo from 'imagemin-svgo';
import imageminWebp from 'imagemin-webp';

const DIST_DIR = 'dist';

const HTML_MINIFY_OPTIONS = {
  collapseWhitespace: true,
  removeComments: true,
  removeOptionalTags: false,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,
  minifyJS: true,
};

const JS_MINIFY_OPTIONS = {
  compress: {
    drop_console: process.env.NODE_ENV === 'production',
    drop_debugger: true,
  },
  mangle: true,
  module: true,
  ecma: 2020,
  format: {
    comments: false,
  },
};

const IMAGE_PLUGINS = [
  imageminMozjpeg({ quality: 80 }),
  imageminPngquant({ quality: [0.6, 0.8] }),
  imageminSvgo(),
];

const WEBP_PLUGINS = [imageminWebp({ quality: 80 })];

const ROOT_FILES = [
  'sw.js',
  'CNAME',
  'robots.txt',
  'sitemap.xml',
  'manifest.json',
  'og-image.png',
  'LICENSE',
  '.nojekyll',
  '.well-known',
];

const ASSET_FOLDERS = ['assets/icons']; // books and img are handled by imagemin

async function cleanDist() {
  console.log(`Cleaning ${DIST_DIR} directory...`);
  await fs.emptyDir(DIST_DIR);
}

async function minifyHtmlFiles() {
  console.log('Minifying HTML files...');
  const htmlFiles = await glob('**/*.html', { ignore: ['node_modules/**', `${DIST_DIR}/**`] });
  for (const file of htmlFiles) {
    const content = await fs.readFile(file, 'utf-8');
    const minifiedContent = await htmlMinify(content, HTML_MINIFY_OPTIONS);
    const destPath = path.join(DIST_DIR, file);
    await fs.ensureDir(path.dirname(destPath));
    await fs.writeFile(destPath, minifiedContent);
    console.log(`Successfully minified and copied ${file} to ${destPath}`);
  }
}

async function processCssFiles() {
  console.log('Processing and minifying CSS files...');
  const cssFiles = await glob('assets/css/**/*.css', { ignore: [`${DIST_DIR}/**`, '**/*.min.css'] });
  const cleanCSS = new CleanCSS({
    level: 2,
    compatibility: '*',
  });
  const postcssProcessor = postcss([autoprefixer]);

  for (const file of cssFiles) {
    try {
      const content = await fs.readFile(file, 'utf-8');
      const postCssResult = await postcssProcessor.process(content, { from: file, to: file });
      const minified = cleanCSS.minify(postCssResult.css);

      if (minified.errors.length > 0) {
        console.error(`CSS errors in ${file}:`, minified.errors);
        throw new Error(`CSS minification failed for ${file}`);
      }

      if (minified.warnings.length > 0) {
        console.warn(`CSS warnings in ${file}:`, minified.warnings);
      }

      const destPath = path.join(DIST_DIR, file.replace(/\.css$/, '.min.css'));
      await fs.ensureDir(path.dirname(destPath));
      await fs.writeFile(destPath, minified.styles);
      console.log(`Successfully processed and minified ${file} to ${destPath}`);
    } catch (error) {
      console.error(`Failed to process ${file}:`, error.message);
      throw error;
    }
  }
}

async function bundleAndMinifyJs() {
  console.log('Bundling and minifying JavaScript...');

  // Bundle main.js with all its module imports into a single file
  const mainEntry = 'assets/js/main.js';
  const modulesDir = 'assets/js/modules';
  const modules = await glob(`${modulesDir}/*.js`);

  // Read all module files and main entry
  const moduleContents = {};
  for (const mod of modules) {
    const content = await fs.readFile(mod, 'utf-8');
    const basename = path.basename(mod);
    moduleContents[`./modules/${basename}`] = content;
  }
  const mainContent = await fs.readFile(mainEntry, 'utf-8');

  // Inline all imports: strip import/export statements and concatenate
  let bundled = '(function(){\n"use strict";\n';
  for (const [modPath, content] of Object.entries(moduleContents)) {
    const stripped = content
      .replace(/^\s*export\s+(class|function|const|let|var)\s/gm, '$1 ')
      .replace(/^\s*export\s*\{[^}]*\}.*$/gm, '');
    bundled += `// --- ${modPath} ---\n${stripped}\n`;
  }
  // Strip imports from main and add it
  const mainStripped = mainContent
    .replace(/^\s*import\s+.*$/gm, '');
  bundled += `// --- main ---\n${mainStripped}\n`;
  bundled += '})();\n';

  const result = await terserMinify(bundled, {
    ...JS_MINIFY_OPTIONS,
    module: false,
  });
  if (result.error) {
    throw result.error;
  }

  const destPath = path.join(DIST_DIR, 'assets/js/main.js');
  await fs.ensureDir(path.dirname(destPath));
  await fs.writeFile(destPath, result.code);
  console.log(`Successfully bundled and minified JS to ${destPath} (${result.code.length} bytes)`);

  // Also minify standalone JS files (book-page.js, etc.)
  const standaloneFiles = await glob('assets/js/*.js', {
    ignore: [`${DIST_DIR}/**`, '**/*.min.js', mainEntry],
  });
  for (const file of standaloneFiles) {
    try {
      const content = await fs.readFile(file, 'utf-8');
      const minResult = await terserMinify(content, JS_MINIFY_OPTIONS);
      if (minResult.error) throw minResult.error;
      const dest = path.join(DIST_DIR, file);
      await fs.ensureDir(path.dirname(dest));
      await fs.writeFile(dest, minResult.code);
      console.log(`Successfully minified ${file} to ${dest}`);
    } catch (error) {
      console.error(`Failed to minify ${file}:`, error.message);
      throw error;
    }
  }
}

async function optimizeImages() {
  console.log('Optimizing and copying images...');
  await imagemin(['assets/img/**/*.{jpg,jpeg,png,svg}'], {
    destination: 'dist/assets/img',
    plugins: IMAGE_PLUGINS,
  });
  await imagemin(['assets/books/**/*.{jpg,jpeg,png,svg}'], {
    destination: 'dist/assets/books',
    plugins: IMAGE_PLUGINS,
  });
  console.log('Successfully optimized images.');
}

async function createWebpImages() {
  console.log('Creating WebP versions of images...');
  await imagemin(['assets/img/**/*.{jpg,jpeg,png}'], {
    destination: 'dist/assets/img',
    plugins: WEBP_PLUGINS,
  });
  await imagemin(['assets/books/**/*.{jpg,jpeg,png}'], {
    destination: 'dist/assets/books',
    plugins: WEBP_PLUGINS,
  });
  console.log('Successfully created WebP images.');
}

async function copyOtherAssets() {
  console.log('Copying other assets...');
  for (const folder of ASSET_FOLDERS) {
    const destPath = path.join(DIST_DIR, 'assets', folder.replace('assets/', ''));
    await fs.copy(folder, destPath);
    console.log(`Successfully copied ${folder} to ${destPath}`);
  }
}

async function copyRootFiles() {
  console.log('Copying root files...');
  for (const file of ROOT_FILES) {
    if (await fs.pathExists(file)) {
      const destPath = path.join(DIST_DIR, file);
      await fs.copy(file, destPath);
      console.log(`Successfully copied ${file} to ${destPath}`);
    } else {
      console.warn(`Warning: ${file} not found, skipping...`);
    }
  }
}

async function stampSitemap() {
  const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
  if (!(await fs.pathExists(sitemapPath))) {
    return;
  }
  const today = new Date().toISOString().slice(0, 10);
  const xml = await fs.readFile(sitemapPath, 'utf-8');
  const stamped = xml.replace(/<lastmod>[^<]*<\/lastmod>/g, `<lastmod>${today}</lastmod>`);
  await fs.writeFile(sitemapPath, stamped);
  console.log(`Stamped sitemap.xml <lastmod> with build date ${today}`);
}

try {
  console.log('Starting build process...');
  await cleanDist();
  await minifyHtmlFiles();
  await processCssFiles();
  await bundleAndMinifyJs();
  await optimizeImages();
  await createWebpImages();
  await copyOtherAssets();
  await copyRootFiles();
  await stampSitemap();
  console.log('Build process completed successfully!');
} catch (error) {
  console.error('Build process failed:', error);
  process.exit(1);
}
