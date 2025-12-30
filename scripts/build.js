
import fs from 'fs-extra';
import { glob } from 'glob';
import CleanCSS from 'clean-css';
import { minify as terserMinify } from 'terser';
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
    const cssFiles = await glob('assets/css/**/*.css', { ignore: [`${DIST_DIR}/**`, '**/*.min.css'] });
    const cleanCSS = new CleanCSS({
      level: 2,
      compatibility: 'ie11',
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

    // 4. Minify and copy JS files
    console.log('Minifying JavaScript files...');
    const jsFiles = await glob('assets/js/**/*.js', { ignore: [`${DIST_DIR}/**`, '**/*.min.js'] });
    for (const file of jsFiles) {
      try {
        const content = await fs.readFile(file, 'utf-8');
        const result = await terserMinify(content, {
          compress: {
            drop_console: process.env.NODE_ENV === 'production',
            drop_debugger: true,
          },
          mangle: true,
          format: {
            comments: false,
          },
        });
        if (result.error) {
          throw result.error;
        }
        const destPath = path.join(DIST_DIR, file.replace(/\.js$/, '.min.js'));
        await fs.ensureDir(path.dirname(destPath));
        await fs.writeFile(destPath, result.code);
        console.log(`Successfully minified and copied ${file} to ${destPath}`);
      } catch (error) {
        console.error(`Failed to minify ${file}:`, error.message);
        throw error;
      }
    }

    // 5. Optimize and copy images
    console.log('Optimizing and copying images...');
    const imagePlugins = [
        imageminGifsicle(),
        imageminMozjpeg({ quality: 80 }),
        imageminPngquant({ quality: [0.6, 0.8] }),
        imageminSvgo(),
    ];
    // Process assets/img
    await imagemin(['assets/img/**/*.{jpg,jpeg,png,gif,svg}'], {
      destination: 'dist/assets/img',
      plugins: imagePlugins,
    });
    // Process assets/books
    await imagemin(['assets/books/**/*.{jpg,jpeg,png,gif,svg}'], {
        destination: 'dist/assets/books',
        plugins: imagePlugins,
    });
    console.log('Successfully optimized images.');

    // 6. Create WebP versions
    console.log('Creating WebP versions of images...');
    const webpPlugin = [imageminWebp({ quality: 80 })];
    // Process assets/img for webp
    await imagemin(['assets/img/**/*.{jpg,jpeg,png}'], {
      destination: 'dist/assets/img',
      plugins: webpPlugin,
    });
    // Process assets/books for webp
    await imagemin(['assets/books/**/*.{jpg,jpeg,png}'], {
        destination: 'dist/assets/books',
        plugins: webpPlugin,
    });
    console.log('Successfully created WebP images.');
    
    // 7. Copy other assets
    console.log('Copying other assets...');
    const assetFolders = ['assets/icons']; // books and img are handled by imagemin
    for (const folder of assetFolders) {
        const destPath = path.join(DIST_DIR, 'assets', folder.replace('assets/', ''));
        await fs.copy(folder, destPath);
        console.log(`Successfully copied ${folder} to ${destPath}`);
    }

    // 8. Copy root files
    console.log('Copying root files...');
    const rootFiles = [
      'sw.js',
      '_headers',
      'CNAME',
      'robots.txt',
      'sitemap.xml',
      'manifest.json',
      'og-image.png',
      'LICENSE',
      '.nojekyll',
    ];
    for (const file of rootFiles) {
        if (await fs.pathExists(file)) {
            const destPath = path.join(DIST_DIR, file);
            await fs.copy(file, destPath);
            console.log(`Successfully copied ${file} to ${destPath}`);
        } else {
            console.warn(`Warning: ${file} not found, skipping...`);
        }
    }

    console.log('Build process completed successfully!');

  } catch (error) {
    console.error('Build process failed:', error);
    process.exit(1);
  }
}

main();
