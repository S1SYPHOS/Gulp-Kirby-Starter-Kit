<?php

@include_once __DIR__ . '/vendor/autoload.php';

Kirby::plugin('bnomei/fingerprint', [
    'options' => [
      'cache' => true,
      'debugforce' => true,
      'ssl' => function () {
          return false;
      },
      'hash' => function ($file) {
          $url = null;
          $fileroot = is_a($file, 'Kirby\Cms\File') || is_a($file, 'Kirby\Cms\FileVersion') ? $file->root() : kirby()->roots()->index() . DIRECTORY_SEPARATOR . ltrim(str_replace(kirby()->site()->url(), '', $file), '/');
  
          if (\Kirby\Toolkit\F::exists($fileroot)) {
              $filename = implode('.', [
                  \Kirby\Toolkit\F::name($fileroot),
                  \Kirby\Toolkit\F::extension($fileroot) . '?v=' . \filemtime($fileroot)
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
      'integrity' => function ($file) {
          $sri = null;
          $file = is_a($file, 'Kirby\Cms\File')  || is_a($file, 'Kirby\Cms\FileVersion') ? $file->root() : kirby()->roots()->index() . DIRECTORY_SEPARATOR . ltrim(str_replace(kirby()->site()->url(), '', $file), '/');
  
          if (!\Kirby\Toolkit\F::exists($file)) {
              return null;
          }
  
          if (extension_loaded('openssl')) {
              // https://www.srihash.org/
              exec("openssl dgst -sha384 -binary ${file} | openssl base64 -A", $output, $return);
              if (is_array($output) && count($output) >= 1) {
                  $sri = 'sha384-'.$output[0];
              }
          } else {
              exec("shasum -b -a 384 ${file} | xxd -r -p | base64", $output, $return);
              if (is_array($output) && count($output) >= 1) {
                  $sri = 'sha384-'.$output[0];
              }
          }
          return $sri;
      }
    ],
    'fileMethods' => [
      'fingerprint' => function () {
          return \Bnomei\Fingerprint::process($this)['hash'];
      },
      'integrity' => function () {
          return \Bnomei\Fingerprint::process($this)['integrity'];
      }
    ]
  ]);
