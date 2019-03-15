  <?php
    if (option('environment', 'development') === 'production') {
      echo Bnomei\Fingerprint::js('/assets/scripts/main.min.js', ['integrity' => true]);
    } else {
      echo js('assets/scripts/main.js');
    }
  ?>

  </body>
</html>
