# Kirby 3 Fingerprint

![Release](https://flat.badgen.net/packagist/v/bnomei/kirby3-fingerprint?color=ae81ff)
![Downloads](https://flat.badgen.net/packagist/dt/bnomei/kirby3-fingerprint?color=272822)
[![Build Status](https://flat.badgen.net/travis/bnomei/kirby3-fingerprint)](https://travis-ci.com/bnomei/kirby3-fingerprint)
[![Coverage Status](https://flat.badgen.net/coveralls/c/github/bnomei/kirby3-fingerprint)](https://coveralls.io/github/bnomei/kirby3-fingerprint) 
[![Maintainability](https://flat.badgen.net/codeclimate/maintainability/bnomei/kirby3-fingerprint)](https://codeclimate.com/github/bnomei/kirby3-fingerprint) 
[![Twitter](https://flat.badgen.net/badge/twitter/bnomei?color=66d9ef)](https://twitter.com/bnomei)


File Method and css/js helper to add cachbusting hash and optional [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) to files.

## Commerical Usage

This plugin is free but if you use it in a commercial project please consider to 
- [make a donation 🍻](https://www.paypal.me/bnomei/4) or
- [buy me ☕](https://buymeacoff.ee/bnomei) or
- [buy a Kirby license using this affiliate link](https://a.paddle.com/v2/click/1129/35731?link=1170)

## Similar Plugins

Both of the following plugins can do cachebusting but they do not cache the modified timestamp nor can they do SRI nor do cachebusting for non js/css files.

- [bvdputte/kirby-fingerprint](https://github.com/bvdputte/kirby-fingerprint)
- [schnti/kirby3-cachebuster](https://github.com/schnti/kirby3-cachebuster)
- [diverently/laravel-mix-kirby](https://github.com/diverently/laravel-mix-kirby)

## Installation

- unzip [master.zip](https://github.com/bnomei/kirby3-fingerprint/archive/master.zip) as folder `site/plugins/kirby3-fingerprint` or
- `git submodule add https://github.com/bnomei/kirby3-fingerprint.git site/plugins/kirby3-fingerprint` or
- `composer require bnomei/kirby3-fingerprint`

## Usage

> This Plugin does **not** override the build in js/css helpers. Use `Bnomei\Fingerprint::css` and `Bnomei\Fingerprint::js` when you need them.

```php
echo Bnomei\Fingerprint::css('/assets/css/index.css');
// <style> element with https://../assets/css/index.css?v=1203291283

echo Bnomei\Fingerprint::js('/assets/js/index.min.js');
// <link> element https://../assets/js/index.min.js?v=1203291283

echo Bnomei\Fingerprint::url('/assets/css/index.css');
// raw url https://../assets/css/index.css?v=1203291283

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

| bnomei.fingerprint.       | Default        | Description               |            
|---------------------------|----------------|---------------------------|
| hash | `callback` | will lead to the hashing logic |
| integrity | `callback` | use it to set option `'integrity' => null,` |
| https | `true` |  boolean value or callback to force *https* scheme. |
| query | `true`|`string` | `myfile.js?v={HASH}`, `myfile.{HASH}.js` or loaded from manifest file |


### Query option: true (default)

```
myfile.js?v={HASH}
```

This is the default since it works without additional changes to your server but be aware that [query strings are not perfect](http://www.stevesouders.com/blog/2008/08/23/revving-filenames-dont-use-querystring/).

### Query option: false

If you disable the query option you also also need to add apache or nginx rules. These rules will redirect css and js files from with hash to the asset on disk.

**.htaccess** – put this directly after the `RewriteBase` statment
```apacheconfig
# RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.+)\.([0-9a-z]{10})\.(js|css)$ $1.$3 [L]
```

**Nginx virtual host setup**
```
location ~ (.+)\.(?:\w+)\.(js|css)$ {
    try_files $uri $1.$2;
}
```

### Query option: string

You can also forward the path of a json encoded manifest file and the plugin will load whatever hash is defined there. This works great for [gulp-rev](https://github.com/sindresorhus/gulp-rev) or with [laravel mix versioning](https://laravel-mix.com/docs/master/versioning).

## Cache & Performance

The plugin will flush its cache and do not write any more caches if **global** debug mode is `true`.

Hash and SRI values are cached and only updated when original file is modified. If you also have the [AutoID Plugin](https://github.com/bnomei/kirby3-autoid) and the file has an autoid field the modified lookup will be at almost zero-cpu cost.

## Disclaimer

This plugin is provided "as is" with no guarantee. Use it at your own risk and always test it yourself before using it in a production environment. If you find any issues, please [create a new issue](https://github.com/bnomei/kirby3-fingerprint/issues/new).

## License

[MIT](https://opensource.org/licenses/MIT)

It is discouraged to use this plugin in any project that promotes racism, sexism, homophobia, animal abuse, violence or any other form of hate speech.

## Credits

- based on [@iksi](https://github.com/iksi) https://github.com/iksi/kirby-fingerprint (Kirby V2)
- [@S1SYPHOS](https://github.com/S1SYPHOS) https://github.com/S1SYPHOS/kirby-sri (Kirby V2)
