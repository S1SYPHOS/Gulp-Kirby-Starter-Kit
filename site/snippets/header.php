<!DOCTYPE html>
<html class="no-js" lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title><?= $site->title() ?> | <?= $page->title() ?></title>

    <?php
      if (option('environment', 'development') === 'production') {
        echo Bnomei\Fingerprint::css('/assets/styles/main.min.css', ['integrity' => true]);
      } else {
        echo css('assets/styles/main.css');
      }
    ?>
  </head>
  <body>
