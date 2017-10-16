# Ks Vue Scrollmagic

[![ks-vue-scrollmagic](https://img.shields.io/npm/v/ks-vue-scrollmagic.svg)](https://www.npmjs.com/package/ks-vue-scrollmagic) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)


Easily use ScrollMagic with vue.js (and nuxt.js...).
Now production ready!!!

Try it in this [ fiddle ](https://jsfiddle.net/romainPouchol/bstj6p41/11/).

---

## Getting started

The plugin only works with 2nd version of Vue.js. You don't need to include scrollmagic.js nor GSAP in your bundle or html, as they're yet included in the package.

```bash
    npm i --save ks-vue-scrollmagic
```

## Usage

#### With Webpack

```js
import KsVueScrollmagic from 'ks-vue-scrollmagic'
Vue.use(KsVueScrollmagic)
```
#### With Nuxt

Create a ksvuescrollmagic.js file in yur plugins folder, and add it to yout nuxt.config.js file with ssr: false option

ksvuefp.js
```js
import KsVueScrollmagic from 'ks-vue-scrollmagic'
Vue.use(KsVueScrollmagic)
```

nuxt.config.js
```js
{
  ...
  plugins: [{
    src: '~/plugins/ksvuescrollmagic',
    ssr: false
  }]
  ...
}
```

#### With a script tag

```html
<script src="your/assets/folder/ks-vue-scrollmagic/dist/ks-vue-scrollmagic.min.js"></script>  
```

## Remaining tasks

- [ ] Add installation and utilisation infos to readme.md
- [ ] Add Iscroll option
- [ ] Maybe create a directive to automatically destroy scrollmagic's controller

---

## Contribution

I'm just a lowly frontend developer trying to master ES6, so suggestions are more than welcome, not only for feature requests but also for coding style improvements.

---

## Licence

[ MIT ](http://opensource.org/licenses/MIT)
