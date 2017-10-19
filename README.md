# Ks Vue Scrollmagic

[![ks-vue-scrollmagic](https://img.shields.io/npm/v/ks-vue-scrollmagic.svg)](https://www.npmjs.com/package/ks-vue-scrollmagic) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)


Easily use ScrollMagic with vue.js (and nuxt.js...).
Now production ready!!!

Try it in this [ fiddle ](https://jsfiddle.net/romainPouchol/v9jhjspn/).

---

## Getting started

The plugin only works with 2nd version of Vue.js. You don't need to include scrollmagic.js nor GSAP in your bundle or html, as they're included in the package (for the moment, I'll maybe remove gsap and create a new plugin for it in the future).

```bash
    npm i --save ks-vue-scrollmagic
```

## Usage

##### With Webpack

```js
import KsVueScrollmagic from 'ks-vue-scrollmagic'
Vue.use(KsVueScrollmagic)
```
##### With Nuxt

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

##### With a script tag

```html
<script src="your/assets/folder/ks-vue-scrollmagic/dist/ks-vue-scrollmagic.min.js"></script>  
```

Once installed, the plugin adds $scrollmagic and $gsap to Vue.prototype, to make them easily accessibles in every components.

To use them:
```js
TweenMax.to('.whatever', 1, { autoAlpha: 0 }) // won't work
const scene = new ScrollMagic.Scene() // won't work neither

// Instead, do this:

// To use TweenMax or TimelineMax
vm.$gsap.TweenMax.to('.whatever', 1, { autoAlpha: 0 }) // Works in every components
// To use ScrollMagic
const scene = new vm.$scrollmagic.Scene() // Works in every components
```
The communication between components and ScrollMagic controller is done via an event bus, available at vm.$ksvuescr. You can emit and listen to:

Event name | Datas | Description
----- | ------------- | ---
addScene | scene name, scene object | Add a new scene to ScrollMagic controller
destroyScene | scene name | Destroy a specific scene from ScrollMagic controller
destroy | - | Destroy ScrollMagic and remove it all

```js
//some examples of using Ks Vue Scrollmagic events
created () {
  this.$ksvuescr.$on('addScene', (sceneName, scene) => {
    console.log(`${sceneName} has been added to controller`)
  })
},
methods: {
  destroyScrollmagic () {
    this.$ksvuescr.$emit('destroy') // Destroy the plugin
  }
}

```

## Example code

To better understand how the plugin works, let's reproduce the "Wipes panels effect" (from Scrollmagic documentation itself, see original [here](http://scrollmagic.io/examples/advanced/section_wipes_manual.html)) in a vue component.

First of all, let's create our template:

```html
<template>
  <div id="app"> // Where our app is mounted
    <div class="pinContainer" ref="pin"> // The panels wrapper, that has to be pinned during all our animation
      <section
        v-for="(p, index) in panels"
        class="panel"
        :class="`panel-${index}`"
        :style="{backgroundColor: p.bgColor}"
      > // Single panel element, used with with v-for.
      {{ p.title }}
      </section>
    </div>
  </div>
</template>
```

Then, we add a bit of css to style our elements
```css
  body {
    margin: 0;
  }
  .pinContainer {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
  }
  .panel {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left:0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }

```

Finally we dig into the js part

```js
export default {
  mounted () {
    this.$nextTick(this.pinContainerScene)
  },
  data () {
    return {
      panels:[
        {
          title: 'panel 1',
          bgColor: '#29b6f6'
        },
        {
          title: 'panel 2',
          bgColor: '#ef5350'
        },
        {
          title: 'panel 3',
          bgColor: '#ec407a'
        },
        {
          title: 'panel 4',
          bgColor: '#66bb6a'
        }
      ]
    }
  },
  methods: {
    pinContainerScene () {
      const Length = this.panels.length

      // Create a new Timeline (equivalent to new TimelineMax())
      const tl = new this.$gsap.TimelineMax()

      for (var i = 0; i < Length; i++) { // For each panel in this.panels array:
        let animFrom, animOutLetters;
        switch (i) { // Set animFrom value, depending on the index i of the item
          case 0:
            break; // First panel is already visible on page load, so no animation
          case 1:
            animFrom = {x: '-100%'} // Second panel comes from the left
            break;
          case 2:
            animFrom = {x: '100%'} // Third one comes from the right
            break;
          case 3:
            animFrom = {y: '-100%'} // Finally, the last one comes from the top
            break;
        }
        if (i !== 0) { // For each panel except the one whom index is 0, create the tween and add it to the tl timeline
          tl.fromTo(`section.panel-${i}`, 1.5, animFrom, {x: '0%', y: '0%', ease: Linear.easeNone})
        }
      }

      // create scene and set its params
      const scene = new this.$scrollmagic.Scene({
        triggerElement: '.pinContainer',
        triggerHook: 'onLeave',
        duration: `${Length * 100}%`
      })
      .setPin('.pinContainer')
      .setTween(tl)

      // Add scene to ScrollMagic controller by emiting an 'addScene' event on vm.$ksvuescr (which is our global event bus)
      this.$ksvuescr.$emit('addScene', 'pinContainerScene', scene)

      // TAAAAAAADAAAAAAAAAAAA
    }
  },
  destroyed () {
    // Destroy ScrollMagic when our component is removed from DOM
    this.$ksvuescr.$emit('destroy')
  }
}
```

You can visualize the result of this example in this[ fiddle ](https://jsfiddle.net/romainPouchol/v9jhjspn/).

## Remaining tasks

- [x] Add installation and utilisation infos to readme.md
- [ ] Add Iscroll option
- [ ] Maybe create a directive to automatically destroy scrollmagic's controller

---

## Contribution

If your facing difficulties to use it, find some bugs or unexpected behaviour... feel free to open a new issue, I'll try to answer you asap ;)

I'm just a lowly frontend developer trying to master ES6, so suggestions are more than welcome, not only for feature requests but also for coding style improvements.

---

## Licence

[ MIT ](http://opensource.org/licenses/MIT)
