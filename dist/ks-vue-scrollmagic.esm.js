/*!
 * ks-vue-scrollmagic v0.0.1
 * (c) 2017 pirony
 * Released under the MIT License.
 */

var ScrollMagic = require('ScrollMagic');
require('animation.gsap');
var TweenMax = require('TimelineMax');

var setScrollMagic = function (el,binding,vNode) {
  var timeline = new TimelineMax();
  var controller = new ScrollMagic.Controller();
  var sceneParams = {
    triggerHook: binding.value.triggerHook || null,
    triggerElement: binding.value.triggerElement || el.parentNode,
    duration: binding.value.duration,
    offset: binding.value.offset
  };

  switch (binding.value.action) {
    case 'setTween':
      binding.value.tweens.forEach(function (tween) {
        switch (tween.tweenType) {

          case 'to':
            timeline['to'](el, tween.duration,tween.to,tween.timing);
            break;

          case 'from':
            timeline['from'](el, tween.duration,tween.from,tween.timing);
            break;

          case 'fromTo':
            timeline['fromTo'](el, tween.duration, tween.from,tween.to,tween.timing);
            break;

          case 'staggerFrom':
            timeline['staggerFrom'](el.children, tween.duration, tween.from,tween.stagger_time);
            break;

          case 'staggerTo':
            timeline['staggerTo'](el.children, tween.duration, tween.to,tween.stagger_time);
            break;

          case 'staggerFromTo':
            timeline['staggerFromTo'](el.children, tween.duration, tween.from,tween.to,tween.stagger_time);
            break;

          default:
            break;

        }
      });
      // build scene
      var scene = new ScrollMagic.Scene(sceneParams)
      .setTween(timeline)
      .addTo(controller);
      break;

    case 'setClassToggle':
      var scene = new ScrollMagic.Scene(sceneParams)
      .setClassToggle(el,binding.value.class)
      .addTo(controller);
    break;

    case 'setPin':
      var scene = new ScrollMagic.Scene(sceneParams)
      .setPin(el)
      .addTo(controller);
    break;
    default:

  }
};

function plugin (Vue) {
  Vue.directive('scrollmagic', {
    inserted: function inserted(el,binding,vNode){
      vNode.context.$nextTick(function (){
        setTimeout(function (){
          setScrollMagic(el,binding,vNode);
        },300);
      });
    },
    update: function update(el,binding,vNode){
      vNode.context.$nextTick(function (){
        setTimeout(function (){
          setScrollMagic(el,binding,vNode);
        },300);
      });
    },
    unbind: function unbind(el,binding,vNode){
    }
  });
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

var version = '0.0.1';

export { version };export default plugin;
