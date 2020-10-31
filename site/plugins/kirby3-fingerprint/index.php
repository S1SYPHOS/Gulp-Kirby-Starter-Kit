<?php

@include_once __DIR__ . '/vendor/autoload.php';

Kirby::plugin('bnomei/fingerprint', [
    'options' => [
        'cache' => true,
        'query' => true,
        'https' => function () {
            return kirby()->system()->isLocal() === false;
        },
        'hash' => function ($file, $query = true) {
            return (new \Bnomei\FingerprintFile($file))->hash($query);
        },
        'integrity' => function ($file) {
            return (new \Bnomei\FingerprintFile($file))->integrity();
        },
    ],
    'fileMethods' => [
        'fingerprint' => function () {
            return (new \Bnomei\Fingerprint())->process($this)['hash'];
        },
        'integrity' => function () {
            return (new \Bnomei\Fingerprint())->process($this)['integrity'];
        },
    ],
]);
