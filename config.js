module.exports = {
  paths: {
    // source: './_posts',
    build: 'build',
  },
  assets: {
    source: 'source',
    build: 'build/assets',
  },
  server: {
    proxy: '127.0.0.1:8000',
    port: 4000,
    notify: true,
    open: true,
    online: false,
  },
  styles: {
    prefix: [
      // For more browsers, see https://github.com/ai/browserslist
      '> 1%',
      'last 3 versions',
      'IE >= 9',
    ],
    include: [
      // 'node_modules',
      // 'bower_components'
    ],
  },
  scripts: {
    // script options go here
  },
};
