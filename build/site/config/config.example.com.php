<?php

/*

---------------------------------------
License Setup
---------------------------------------

Please add your license key, which you've received
via email after purchasing Kirby on http://getkirby.com/buy

It is not permitted to run a public website without a
valid license key. Please read the End User License Agreement
for more information: http://getkirby.com/license

*/

c::set('license', 'put your license key here');

/*

---------------------------------------
Production settings
---------------------------------------

Built-in Cache, see here: https://getkirby.com/docs/developer-guide/advanced/caching
Asset-fingerprinting, see here: https://github.com/iksi/kirby-fingerprint
HTML Minification, see here: https://github.com/iksi/kirby-compress

*/

c::set('env', 'production');
c::set('debug', false);
c::set('cache', true);
c::set('plugin.kirby-sri', true);
c::set('plugin.compress', true);

/*

---------------------------------------
Kirby Configuration
---------------------------------------

By default you don't have to configure anything to
make Kirby work. For more fine-grained configuration
of the system, please check out http://getkirby.com/docs/advanced/options

*/
