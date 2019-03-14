# Gulp/Kirby StarterKit
[![Release](https://img.shields.io/github/release/S1SYPHOS/Gulp-Kirby-Starter-Kit.svg)](https://github.com/S1SYPHOS/Gulp-Kirby-Starter-Kit/releases) [![License](https://img.shields.io/github/license/S1SYPHOS/Gulp-Kirby-Starter-Kit.svg)](https://github.com/S1SYPHOS/Gulp-Kirby-Starter-Kit/blob/master/LICENSE) [![Issues](https://img.shields.io/github/issues/S1SYPHOS/Gulp-Kirby-Starter-Kit.svg)](https://github.com/S1SYPHOS/Gulp-Kirby-Starter-Kit/issues)

**You heard about Kirby and want to use it on your next project? You want to harness the power of Gulp? Then THIS is for you!**

Here's my personal (thus opinionated) Gulp+Kirby boilerplate, starring:
- [Kirby CMS v3](https://getkirby.com) - a file‑based CMS that's 'easy to setup, easy to use & flexible as hell'
- [Gulp v4](http://gulpjs.com) - the streaming build system

Although it's recommended to set up an environment closely resembling your production server (eg MAMP, XAMP, Vagrant, Valet), feel free to use PHP's built-in PHP server (default) or have a quick glance with `php -S localhost:8000 kirby/router.php`.

For the **Kirby 2 version**, have a look at [this](https://github.com/S1SYPHOS/Gulp-Kirby-Starter-Kit/tree/legacy).

* [Features](#features)
* [Getting started](#getting-started)
  * [Git](#git)
  * [Composer](#composer)
* [Configuration](#configuration)

## Features
This boilerplate provides a solid starting point that you can build upon:

Workflow:
- Sass / node-sass / libsass
- Webpack
- CSS / JS minification
- Image optimization
- SVG icon sprites
- Favicon generation
- Bourbon / Bitters / Neat
- ...

In order to keep everything neat, each task resides in [its own file](https://gulpjs.com/docs/en/getting-started/javascript-and-gulpfiles#splitting-a-gulpfile) under `gulpfile.js/tasks`.

~~Pre-installed Kirby plugins:~~
.. to be continued

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
$ composer create-project s1syphos/gulp-kirby-starter-kit your-project
$ cd your-project
$ npm install
```

Now just type `npm start` and code away!

## Configuration
Tweaking the asset pipeline is pretty easy, as `config.js` comes with sensible defaults and extensive comments. Everything you need to know may be found there - otherwise open an issue and let me know!

Note that rules for linting styles and scripts *are excluded from this pattern* and located in `package.json` which provides a certain flexibility:

> I prefer linting my files while editing them (supported by all major text editors (such as GitHub's [Atom](https://atom.io), Microsoft's [Visual Studio Code](https://code.visualstudio.com), (proprietary) [Sublime Text](https://www.sublimetext.com) or even Adobe's [Brackets](http://brackets.io) through plugins).
> - S1SYPHOS

There are several ways to load the configuration object for both [stylelint](https://stylelint.io/user-guide/configuration/#loading-the-configuration-object) and [ESLint](https://eslint.org/docs/user-guide/configuring#configuring-eslint).

**Note: Before publishing your project, be sure to check your `.gitignore` file!**

## Special Thanks
I'd like to thank everybody that's making great software - you people are awesome. Also I'm always thankful for feedback and bug reports :)
