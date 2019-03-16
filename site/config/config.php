<?php

/*
---------------------------------------
Kirby Configuration
---------------------------------------
By default you don't have to configure anything to
make Kirby work. For more fine-grained configuration
of the system, please check out https://getkirby.com/docs/guide/configuration
*/

return [
  // Be sure to read this: https://getkirby.com/docs/reference/system/options/panel#allow-the-panel-to-be-installed-on-a-remote-server
  // 'panel' =>[
  //   'install' => true
  // ],

  // Thumbnail options
  'thumbs' => require_once 'thumbs.php',

  // Routes & redirects
  'routes' => require_once 'routes.php',

  'sitemap.ignore' => ['error'],

  // Adding hash to {css,js} files for cache busting via https://github.com/bnomei/kirby3-fingerprint
  'bnomei.fingerprint.hash' => function ($file) {
    $url = null;
    $fileroot = is_a($file, 'Kirby\Cms\File') || is_a($file, 'Kirby\Cms\FileVersion') ? $file->root() : kirby()->roots()->index() . DIRECTORY_SEPARATOR . ltrim(str_replace(kirby()->site()->url(), '', $file), '/');

    if (\Kirby\Toolkit\F::exists($fileroot)) {
      $filename = implode('.', [
        \Kirby\Toolkit\F::name($fileroot),
        \filemtime($fileroot),
        \Kirby\Toolkit\F::extension($fileroot)
      ]);

      if (is_a($file, 'Kirby\Cms\File') || is_a($file, 'Kirby\Cms\FileVersion')) {
        $url = str_replace($file->filename(), $filename, $file->url());
      } else {
        $dirname = str_replace(kirby()->roots()->index(), '', \dirname($fileroot));
        $url = ($dirname === '.') ? $filename : ($dirname . '/' . $filename);
      }
    } else {
      $url = $file;
    }
    return \url($url);
  },
];
