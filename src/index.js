import gsap from 'TweenMax'
import ScrollMagic from 'ScrollMagic'
require('animation.gsap')

function plugin (Vue) {
  Vue.prototype.$tweenmax = gsap
  Vue.prototype.$scrollmagic = ScrollMagic
  Vue.prototype.$ksvuescr = new Vue({
    data () {
      return {
        controllers: []
      }
    },
    created () {
      const vm = this
      vm.$on('init', (name, scenes) => {
        Vue.nextTick(() => {
          vm.controllers[name] = new vm.$scrollmagic.Controller();
          scenes.addTo(vm.controllers[name])
        })
      })
      vm.$on('destroy', (name, scenes) => {
        console.log('destroyed');
      })
    },

  })


}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
const version = '__VERSION__'
// Export all components too
export {
  version
}
