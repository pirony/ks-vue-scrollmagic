import gsap from 'TweenMax'
import ScrollMagic from 'ScrollMagic'
require('animation.gsap')

function plugin (Vue) {
  Vue.prototype.$gsap = gsap
  Vue.prototype.$scrollmagic = ScrollMagic
  Vue.prototype.$ksvuescr = new Vue({
    data () {
      return {
        controller: null,
        scenes: {

        }
      }
    },
    created () {
      const vm = this
      vm.$on('addScene', (name, scenes) => {
        Vue.nextTick(() => {
          if(vm.controller === null) vm.controller = new vm.$scrollmagic.Controller();
          vm.scenes[name] = scenes
          vm.scenes[name].addTo(vm.controller)
        })
      })
      vm.$on('destroyScene', (name) => {
        vm.scenes[name].destroy(true)
      })
      vm.$on('destroy', (name, scenes) => {
        vm.controller.destroy(true)
        vm.controller = null
      })
    }
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
