# Gulp/Kirby StarterKit
[![Release](https://img.shields.io/github/release/S1SYPHOS/Gulp-Kirby-Starter-Kit.svg)](https://github.com/S1SYPHOS/Gulp-Kirby-Starter-Kit/releases) [![License](https://img.shields.io/github/license/S1SYPHOS/Gulp-Kirby-Starter-Kit.svg)](https://github.com/S1SYPHOS/Gulp-Kirby-Starter-Kit/blob/master/LICENSE) [![Issues](https://img.shields.io/github/issues/S1SYPHOS/Gulp-Kirby-Starter-Kit.svg)](https://github.com/S1SYPHOS/Gulp-Kirby-Starter-Kit/issues)

**You heard about Kirby and want to use it on your next project? You want to harness the power of Gulp? Then THIS is for you!**

Here's my personal (thus opinionated) Gulp+Kirby boilerplate, starring:
- [Kirby CMS](https://getkirby.com/) - a file‑based CMS that's 'easy to setup, easy to use & flexible as hell'
- [Gulp v4](http://gulpjs.com/) - the streaming build system

Although it's recommended to set up an environment closely resembling your production server (eg MAMP, XAMP, Vagrant, Valet), feel free to use PHP's built-in PHP server (default) or have a quick glance with `php -S localhost:8000 kirby/router.php`.

For the **Kirby 2 version**, have a look at [this](https://github.com/S1SYPHOS/Gulp-Kirby-Starter-Kit/tree/legacy).

## Features
This boilerplate provides a solid starting point that you can build upon. Check `Gulpfile.js` or `package.json` to find out about all included features!

Workflow:
- Sass / node-sass / libsass
- Webpack
- CSS / JS minification
- Image optimization
- SVG icon sprites
- Favicon support
- Bourbon / Bitters / Neat
- ...

~~Pre-installed Kirby plugins:~~

## Getting started
Make sure [Node.js](http://nodejs.org/) is installed on your system, then clone this repository and install its dependencies via [NPM](https://npmjs.org/):

### Git

```bash
$ git clone https://github.com/S1SYPHOS/Gulp-Kirby-Starter-Kit.git your-project
$ cd your-project
$ npm install
```

### Composer

```bash
$ mkdir your-project && cd your-project
$ composer require s1syphos/gulp-kirby-starter-kit
$ npm install
```

**Note: Before publishing your project, be sure to check your `.gitignore` file!**

## Special Thanks
I'd like to thank everybody that's making great software - you people are awesome. Also I'm always thankful for feedback and bug reports :)
