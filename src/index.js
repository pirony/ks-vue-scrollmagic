import * as utils from './utils'

function plugin (Vue) {
  Vue.directive('scrollmagic', {
    inserted(el,binding,vNode){
      console.log('inserted to' + el);
      vNode.context.$nextTick(()=>{
        setTimeout(()=>{
          utils.setScrollMagic(el,binding,vNode)
        },300)
      })
    },
    update(el,binding,vNode){
      vNode.context.$nextTick(()=>{
        setTimeout(()=>{
          utils.setScrollMagic(el,binding,vNode)
        },300)
      })
    },
    unbind(el,binding,vNode){
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
