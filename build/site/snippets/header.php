<!DOCTYPE html>
<html lang="en">
<head>

  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <title><?php echo $site->title()->html() ?> | <?php echo $page->title()->html() ?></title>

  <?php
    // won't be necessary if cachebusting works as intended
    // if ( c::get('environment') == 'development' ) {
      echo css('assets/styles/main.css')
    // } else {
      // echo css('assets/styles/main.min.css')
    // }
  ?>

</head>
<body>
