<?php

require 'kirby/bootstrap.php';

$kirby = new Kirby([
    'roots' => [
        'index'    => $base = __DIR__,
        'storage'  => $storage = $base . '/storage',
        'accounts' => $storage . '/accounts',
        'cache'    => $storage . '/cache',
        'sessions' => $storage . '/sessions',
    ]
]);

echo $kirby->render();
