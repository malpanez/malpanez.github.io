
import fs from 'fs-extra';
import { glob } from 'glob';
import CleanCSS from 'clean-css';
import terser from 'terser';
import { minify as htmlMinify } from 'html-minifier-terser';
import path from 'path';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import imagemin from 'imagemin';
import imageminGifsicle from 'imagemin-gifsicle';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminSvgo from 'imagemin-svgo';
import imageminWebp from 'imagemin-webp';

const DIST_DIR = 'dist';

async function main() {
  try {
    console.log('Starting build process...');

    // 1. Clean the dist directory
    console.log(`Cleaning ${DIST_DIR} directory...`);
    await fs.emptyDir(DIST_DIR);

    // 2. Minify and copy HTML files
    console.log('Minifying HTML files...');
    const htmlFiles = await glob('**/*.html', { ignore: ['node_modules/**', `${DIST_DIR}/**`] });
    for (const file of htmlFiles) {
      const content = await fs.readFile(file, 'utf-8');
      const minifiedContent = await htmlMinify(content, {
        collapseWhitespace: true,
        removeComments: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
      });
      const destPath = path.join(DIST_DIR, file);
      await fs.ensureDir(path.dirname(destPath));
      await fs.writeFile(destPath, minifiedContent);
      console.log(`Successfully minified and copied ${file} to ${destPath}`);
    }

    // 3. Process and minify CSS files
    console.log('Processing and minifying CSS files...');
    const cssFiles = await glob('assets/css/**/*.css', { ignore: [`${DIST_DIR}/**`] });
    const cleanCSS = new CleanCSS({ level: 1 });
    const postcssProcessor = postcss([autoprefixer]);

    for (const file of cssFiles) {
      const content = await fs.readFile(file, 'utf-8');
      const postCssResult = await postcssProcessor.process(content, { from: file, to: file });
      const minifiedContent = cleanCSS.minify(postCssResult.css).styles;
      const destPath = path.join(DIST_DIR, file.replace(/\.css$/, '.min.css'));
      await fs.ensureDir(path.dirname(destPath));
      await fs.writeFile(destPath, minifiedContent);
      console.log(`Successfully processed and minified ${file} to ${destPath}`);
    }

    // 4. Minify and copy JS files
    console.log('Minifying JavaScript files...');
    const jsFiles = await glob('assets/js/**/*.js', { ignore: [`${DIST_DIR}/**`] });
    for (const file of jsFiles) {
      const content = await fs.readFile(file, 'utf-8');
      const result = await terser.minify(content, {
        compress: {
          drop_console: true,
        },
        mangle: true,
      });
      if (result.error) {
        throw result.error;
      }
      const destPath = path.join(DIST_DIR, file.replace(/\.js$/, '.min.js'));
      await fs.ensureDir(path.dirname(destPath));
      await fs.writeFile(destPath, result.code);
      console.log(`Successfully minified and copied ${file} to ${destPath}`);
    }

    // 5. Optimize and copy images
    console.log('Optimizing and copying images...');
    await imagemin(['assets/img/**/*.{jpg,jpeg,png,gif,svg}', 'assets/books/**/*.{jpg,jpeg,png,gif,svg}'], {
      destination: 'dist/assets',
      plugins: [
        imageminGifsicle(),
        imageminMozjpeg({ quality: 80 }),
        imageminPngquant({ quality: [0.6, 0.8] }),
        imageminSvgo(),
      ],
    });
    console.log('Successfully optimized images.');

    // 6. Create WebP versions
    console.log('Creating WebP versions of images...');
    await imagemin(['assets/img/**/*.{jpg,jpeg,png}', 'assets/books/**/*.{jpg,jpeg,png}'], {
      destination: 'dist/assets',
      plugins: [imageminWebp({ quality: 80 })],
    });
    console.log('Successfully created WebP images.');
    
    // 7. Copy other assets
    console.log('Copying other assets...');
    const assetFolders = ['assets/icons'];
    for (const folder of assetFolders) {
        const destPath = path.join(DIST_DIR, 'assets', path.basename(folder));
        await fs.copy(folder, destPath);
        console.log(`Successfully copied ${folder} to ${destPath}`);
    }

    // 8. Copy root files
    console.log('Copying root files...');
    const rootFiles = [
      'CNAME',
      'robots.txt',
      'sitemap.xml',
      'manifest.json',
      'og-image.png',
      'LICENSE',
    ];
    for (const file of rootFiles) {
        if (await fs.pathExists(file)) {
            const destPath = path.join(DIST_DIR, file);
            await fs.copy(file, destPath);
            console.log(`Successfully copied ${file} to ${destPath}`);
        }
    }

    console.log('Build process completed successfully!');

  } catch (error) {
    console.error('Build process failed:', error);
    process.exit(1);
  }
}

main();
