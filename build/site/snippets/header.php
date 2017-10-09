<!DOCTYPE html>
<html class="no-js" lang="en">
<head>

  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <title><?php echo $site->title()->html() ?> | <?php echo $page->title()->html() ?></title>

  <?php
    // if you choose kirby-seo, then delete <title> tag & uncomment next line:
    // snippet('seo')
   ?>

  <?php
    echo css('assets/styles/main.css');
  ?>

</head>
<body>
