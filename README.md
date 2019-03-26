# Gulp/Kirby StarterKit
[![Release](https://img.shields.io/github/release/S1SYPHOS/Gulp-Kirby-Starter-Kit.svg)](https://github.com/S1SYPHOS/Gulp-Kirby-Starter-Kit/releases) [![License](https://img.shields.io/github/license/S1SYPHOS/Gulp-Kirby-Starter-Kit.svg)](https://github.com/S1SYPHOS/Gulp-Kirby-Starter-Kit/blob/master/LICENSE) [![Issues](https://img.shields.io/github/issues/S1SYPHOS/Gulp-Kirby-Starter-Kit.svg)](https://github.com/S1SYPHOS/Gulp-Kirby-Starter-Kit/issues)

**You heard about Kirby and want to use it on your next project? You want to harness the power of Gulp? Then THIS is for you!**

Here's my personal (thus opinionated) Gulp+Kirby boilerplate, starring:
- [Kirby CMS v3](https://getkirby.com) - a file‑based CMS that's 'easy to setup, easy to use & flexible as hell'
- [Gulp v4](https://gulpjs.com) - the streaming build system

Although it's recommended to set up an environment closely resembling your production server (eg Docker, MAMP, Vagrant or even Valet), feel free to use PHP's built-in development server or have a quick glance with `cd build && php -S localhost:8000 kirby/router.php`. If you are familiar with Docker, check out Gulp/Kirby StarterKit's [sister project](https://github.com/S1SYPHOS/Docker-Kirby-Starter-Kit) for a straightforward development experience.

Psst! Need the **Kirby 2 version**? Over [here](https://github.com/S1SYPHOS/Gulp-Kirby-Starter-Kit/tree/legacy).

## Features
This boilerplate provides a solid starting point that you can build upon:

Workflow:
- Sass / node-sass / libsass
- Webpack
- CSS / JS minification
- Image optimization
- SVG icon sprites
- Favicon generation
- Font subsetting
- Bourbon / Bitters / Neat
- ...

**Table of Contents**
- [1. Requirements](#requirements)
- [2. Getting started](#getting-started)
- [3. Configuration](#configuration)

## Requirements
- (recommended) Local development server running PHP 7.1 (or later)
- [Node.js](https://nodejs.org) 8 (or later) + NPM

In order to keep everything neat, each task resides in [its own file](https://gulpjs.com/docs/en/getting-started/javascript-and-gulpfiles#splitting-a-gulpfile) under `tasks/`.

Pre-installed Kirby plugins:
- [K3 Fingerprint](https://github.com/bnomei/kirby3-fingerprint) by @bnomei

## Getting started
Make sure [Node.js](https://nodejs.org) is installed on your system, then clone this repository and install its dependencies via [NPM](https://npmjs.org):

```text
# Composer
composer create-project s1syphos/gulp-kirby-starter-kit your-project

# Git
git clone https://github.com/S1SYPHOS/Gulp-Kirby-Starter-Kit.git your-project

# Installing dependencies
cd your-project && npm install
```

Now just type `npm start` and code away! If you want to build for production, use `npm run build`.

## Configuration
Tweaking the asset pipeline is pretty easy, as `config.js` comes with sensible defaults and extensive comments. Everything you need to know may be found there - otherwise open an issue and let me know!

### Development server
By default, this boilerplate uses PHP's built-in server. If you are using a local development server (as recommended above), just set `server.enable` to `false` and replace the default `browsersync:proxy`.

### Linting styles & scripts
Rules for linting styles and scripts *are excluded from this pattern* and located in `package.json` which provides a certain flexibility:

> I prefer linting my files while editing them (supported by all major text editors (such as GitHub's [Atom](https://atom.io), Microsoft's [Visual Studio Code](https://code.visualstudio.com), (proprietary) [Sublime Text](https://www.sublimetext.com) or even Adobe's [Brackets](http://brackets.io) through plugins).
> — S1SYPHOS

There are several ways to load the configuration object for both [stylelint](https://stylelint.io/user-guide/configuration/#loading-the-configuration-object) and [ESLint](https://eslint.org/docs/user-guide/configuring#configuring-eslint).

### Cache-busting / Fingerprinting
For [cache busting](https://www.keycdn.com/support/what-is-cache-busting) via Kirby's built-in helper functions `css()` and `js()` and bnomei's feature-rich [fingerprint plugin](https://github.com/bnomei/kirby3-fingerprint) (plus filename hash, see `build/site/config/config.php`), just follow the next steps:

#### Apache
If you're using [Apache](https://httpd.apache.org/) as your webserver and you are using a custom `.htaccess` ([this](https://github.com/h5bp/server-configs-apache) should get you going) for improved capabilities, add the following lines right after `RewriteBase`:

```text
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.+)\.([0-9]{10})\.(js|css)$ $1.$3 [L]
```

#### NGINX
If you're using [NGINX](https://nginx.org/en/) as your webserver, add the following lines to your virtual host setup:

```text
location /assets {
  if (!-e $request_filename) {
    rewrite "^/(.+)\.([0-9]{10})\.(js|css)$" /$1.$3 break;
  }
}
```

### Self-hosting fonts
If you already have font files (or at least one), that's great. Otherwise, there's FontSquirrel's [webfont generator](http://www.fontsquirrel.com/tools/webfont-generator) (including subsetting, file conversion, CSS generation and much more).

If Google Fonts are what you want, then [this](https://github.com/majodev/google-webfonts-helper) might be helpful.

After learning about [webfont strategies](https://www.zachleat.com/web/comprehensive-webfonts), you might want to subset your fonts, but rather than doing it manually (uploading, configuring, downloading, ..), let the machine handle it for you: This boilerplate supports font subsetting via [`glyphhanger`](https://github.com/filamentgroup/glyphhanger) when building for production. In order to use this feature, you have to install [`pyftsubset`](https://github.com/fonttools/fonttools) via [pip](https://pypi.org/project/pip) first:

```text
pip install fonttools
```


**Note: Before publishing your project, be sure to check your `.gitignore` file!**

## Special Thanks
I'd like to thank everybody that's making great software - you people are awesome. Also I'm always thankful for feedback and bug reports :)
