<?php

/*
---------------------------------------
Folder structure
---------------------------------------
This boilerplate comes with a custom folder structure by default:
(1) `accounts`, `cache` & `sessions` are stored inside `storage`.

However, for a more secure setup, the following is recommended:
(2) In addition to (1), `assets`, `index.php` & `.htaccess` are
stored inside `public`.

Note: For (2) to work, you need a working Apache or NGINX setup!

See https://getkirby.com/docs/guide/configuration#custom-folder-setup
*/

/* 1 */
include 'kirby/bootstrap.php';

/* 2 */
// include '../vendor/autoload.php';

$kirby = new Kirby([
  'roots' => [
    /* 1 */
    'index'    => $base = __DIR__,

    /* 2 */
    // 'index'    => __DIR__,
    // 'base'     => $base    = dirname(__DIR__),
    // 'content'  => $base . '/content',
    // 'site'     => $base . '/site',

    /* 1 & 2 */
    'storage'  => $storage = $base . '/storage',
    'accounts' => $storage . '/accounts',
    'cache'    => $storage . '/cache',
    'sessions' => $storage . '/sessions',
  ]
]);

echo $kirby->render();
