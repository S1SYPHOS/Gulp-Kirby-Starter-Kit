# Gulp-Kirby-Starter-Kit
**You heard about Kirby and want to use it on your next project? You're' also excited about Gulp v4, but want to harness its power today? Then THIS is for you!**

Here's my personal Gulp+Kirby boilerplate, starring:
- [Kirby CMS](https://getkirby.com/) - a file‑based CMS that's 'easy to setup, easy to use & flexible as hell'
- [Gulp v4](http://gulpjs.com/) - the streaming build system

If you just want to have a look, feel free to do so with `php -S localhost:8000`.


## Features
This boilerplate is growing fastly and already provides a solid starting point that you can build upon. For now, just check gulpfile.js or package.json to find out about all the included / planned features!

Workflow:
- Sass / node-sass / libsass
- Webpack
- Bourbon / Bitters
- Image optimization
- Minification (styles & scripts)
- ...

Kirby plugins:
- [Visual Markdown](https://github.com/JonasDoebertin/kirby-visual-markdown)
- [Fingerprint](https://github.com/iksi/KirbyFingerprint)
- ...

_to be continued_


## Getting started
Make sure [Node.js](http://nodejs.org/) is installed on your system, then clone this repository (and all included submodules) and install its dependencies via [NPM](https://npmjs.org/):

```bash
$ git clone --recursive https://github.com/S1SYPHOS/Gulp-Kirby-Starter-Kit.git your-project
$ cd your-project
$ npm install
```

If you want to update all included submodules later on, it's just these two lines:

```bash
 $ git submodule foreach --recursive git checkout master
 $ git submodule foreach --recursive git pull
```

## Special Thanks
I'd like to thank everybody that's making great software - you people are awesome. Also I'm always thankful for feedback and bug reports :)
