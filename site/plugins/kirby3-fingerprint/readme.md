# Kirby 3 Fingerprint

![GitHub release](https://img.shields.io/github/release/bnomei/kirby3-fingerprint.svg?maxAge=1800) ![License](https://img.shields.io/github/license/mashape/apistatus.svg) ![Kirby Version](https://img.shields.io/badge/Kirby-3%2B-black.svg) ![Kirby 3 Pluginkit](https://img.shields.io/badge/Pluginkit-YES-cca000.svg)

File Method and css/js helper to add cachbusting hash and optional [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) to files.

## Commerical Usage

This plugin is free but if you use it in a commercial project please consider to 
- [make a donation 🍻](https://www.paypal.me/bnomei/4) or
- [buy me ☕](https://buymeacoff.ee/bnomei) or
- [buy a Kirby license using this affiliate link](https://a.paddle.com/v2/click/1129/35731?link=1170)

## Installation

- unzip [master.zip](https://github.com/bnomei/kirby3-fingerprint/archive/master.zip) as folder `site/plugins/kirby3-fingerprint` or
- `git submodule add https://github.com/bnomei/kirby3-fingerprint.git site/plugins/kirby3-fingerprint` or
- `composer require bnomei/kirby3-fingerprint`

## Performance

Hash and SRI values are cached and only updated when original file is modified.

## Usage

```php
echo Bnomei\Fingerprint::css('/assets/css/index.css');
// https://../assets/css/index.css?v=1203291283

echo Bnomei\Fingerprint::js('/assets/js/index.min.js');
// https://../assets/js/index.min.js?v=1203291283

echo $page->file('ukulele.pdf')->fingerprint();
// https://../ukulele.pdf?v=1203291283

echo $page->file('ukulele.pdf')->integrity();
// sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC

// generate sri from local file
echo Bnomei\Fingerprint::js(
    '/assets/js/index.min.js', 
    [
        "integrity" => true
    ]
); 
/*
<script src="https://../assets/js/index.min.js"
    integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
    crossorigin="anonymous"></script>
*/

echo Bnomei\Fingerprint::js(
    'https://external.cdn/framework.min.js', 
    [
        "integrity" => "sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
    ]
);
/*
<script src="https://external.cdn/framework.min.js"
    integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
    crossorigin="anonymous"></script>
*/
```

## Settings

**debugforce**
- default: `true` will flush cache if debug mode is active

**hash**
- default: will lead to query string and does not require htaccess setup. thanks @fabianmichael. [#1](https://github.com/bnomei/kirby3-fingerprint/issues/1)

**integrity**
- to disable sri set option `'integrity' => null,`

**ssl**
- default: `false`. boolean value or callback to force *https* scheme.

## Disclaimer

This plugin is provided "as is" with no guarantee. Use it at your own risk and always test it yourself before using it in a production environment. If you find any issues, please [create a new issue](https://github.com/bnomei/kirby3-fingerprint/issues/new).

## License

[MIT](https://opensource.org/licenses/MIT)

It is discouraged to use this plugin in any project that promotes racism, sexism, homophobia, animal abuse, violence or any other form of hate speech.

## Credits

based on [@iksi](https://github.com/iksi) https://github.com/iksi/kirby-fingerprint (Kirby V2)
