const gsap = require('TweenMax')
require('animation.gsap')
const ScrollMagic = require('ScrollMagic');

export const setScrollMagic = (el, binding, vNode) => {
  const timeline = new gsap.TimelineMax();
  const controller = new ScrollMagic.Controller();
  const sceneParams = {
    triggerHook: binding.value.triggerHook || '',
    triggerElement: binding.value.triggerElement || el.parentNode,
    duration: binding.value.duration,
    offset: binding.value.offset
  }
  const scene = new ScrollMagic.Scene(sceneParams)

  if (binding.value.actions.setTween) {
    binding.value.actions.setTween.forEach(tween =>{
      switch (tween.tweenType) {
        case 'to':
        default:
          timeline['to'](el, tween.duration, tween.to, tween.timing)
          break;

        case 'from':
          timeline['from'](el, tween.duration, tween.from, tween.timing)
          break;

        case 'fromTo':
          timeline['fromTo'](el, tween.duration, tween.from, tween.to, tween.timing)
          break;

        case 'staggerFrom':
          timeline['staggerFrom'](el.children, tween.duration, tween.from, tween.stagger_time)
          break;

        case 'staggerTo':
          timeline['staggerTo'](el.children, tween.duration, tween.to, tween.stagger_time)
          break;

        case 'staggerFromTo':
          timeline['staggerFromTo'](el.children, tween.duration, tween.from,  tween.to, tween.stagger_time)
          break;
      }
    })
    // build scene
    scene.setTween(timeline)
  }

  if (binding.value.actions.setClassToggle) {
    scene.setClassToggle(el, binding.value.actions.setClassToggle)
  }

  if (binding.value.actions.setPin) {
    scene.setPin(el)
  }

  scene.addTo(controller)
}
