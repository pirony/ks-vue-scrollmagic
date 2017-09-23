export const setScrollMagic = (el,binding,vNode) => {
  let ScrollMagic = require('ScrollMagic')
  require('animationgsap')
  const timeline = new TimelineMax();
  const controller = new ScrollMagic.Controller();
  const sceneParams = {
    triggerHook: binding.value.triggerHook || null,
    triggerElement: binding.value.triggerElement || el.parentNode,
    duration: binding.value.duration,
    offset: binding.value.offset
  }

  switch (binding.value.action) {
    case 'setTween':
      binding.value.tweens.forEach(tween =>{
        switch (tween.tweenType) {

          case 'to':
            timeline['to'](el, tween.duration,tween.to,tween.timing)
            break;

          case 'from':
            timeline['from'](el, tween.duration,tween.from,tween.timing)
            break;

          case 'fromTo':
            timeline['fromTo'](el, tween.duration, tween.from,tween.to,tween.timing)
            break;

          case 'staggerFrom':
            timeline['staggerFrom'](el.children, tween.duration, tween.from,tween.stagger_time)
            break;

          case 'staggerTo':
            timeline['staggerTo'](el.children, tween.duration, tween.to,tween.stagger_time)
            break;

          case 'staggerFromTo':
            timeline['staggerFromTo'](el.children, tween.duration, tween.from,tween.to,tween.stagger_time)
            break;

          default:
            break;

        }
      })
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
}
