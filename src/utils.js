const ScrollMagic = require('ScrollMagic')
require('animation.gsap')

export const setScrollMagic = (el, binding, vNode) => {
  const timeline = new TimelineMax()
  const controller = new ScrollMagic.Controller()
  const sceneParams = {
    triggerHook: binding.value.triggerHook || '',
    triggerElement: binding.value.triggerElement || el.parentNode,
    duration: binding.value.duration,
    offset: binding.value.offset
  }
  const actions = binding.value.actions
  const scene = new ScrollMagic.Scene(sceneParams)

  if (actions.setTween) {
    actions.setTween.forEach(tween =>{
      switch (tween.tweenType) {
        case 'to':
          timeline['to'](el, tween.duration, tween.to, tween.timing)
          break
        default:
        case 'from':
          timeline['from'](el, tween.duration, tween.from, tween.timing)
          break

        case 'fromTo':
          timeline['fromTo'](el, tween.duration, tween.from, tween.to, tween.timing)
          break

        case 'staggerFrom':
          timeline['staggerFrom'](el.children, tween.duration, tween.from, tween.stagger_time)
          break

        case 'staggerTo':
          timeline['staggerTo'](el.children, tween.duration, tween.to, tween.stagger_time)
          break

        case 'staggerFromTo':
          timeline['staggerFromTo'](el.children, tween.duration, tween.from,  tween.to, tween.stagger_time)
          break

      }
    })
    // build scene
    scene.setTween(timeline)
  }

  if (actions.setPin) {
    scene.setPin(el)
  }
  if (actions.setClassToggle) {
    const elem = actions.setClassToggle.element || el
    const cssClass = typeof actions.setClassToggle === 'object' ? actions.setClassToggle.cssClass : actions.setClassToggle
    scene.setClassToggle(el, cssClass)
  }
  scene.addTo(controller)
}
