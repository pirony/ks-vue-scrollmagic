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
  const actions = binding.value.actions

  if (actions.setTween) {
    actions.setTween.forEach((tween, i) =>{
      switch (tween.tweenType) {
        case 'to':
          if (!tween.ref) {
            timeline[tween.tweenType](el, tween.duration, tween.to, tween.timing)
          } else {
            if (vNode.context.$refs[tween.ref] instanceof Array) {
              vNode.context.$refs[tween.ref].forEach((r) => {
                timeline[tween.tweenType](r, tween.duration, tween.to, tween.timing)
              })
            } else {
              timeline[tween.tweenType](vNode.context.$refs[tween.ref], tween.duration, tween.to, tween.timing)
            }
          }
          break;
        case 'from':
          if (!tween.ref) {
            timeline[tween.tweenType](el, tween.duration, tween.from, tween.timing)
          } else {
            if (vNode.context.$refs[tween.ref] instanceof Array) {
              vNode.context.$refs[tween.ref].forEach((r) => {
                timeline[tween.tweenType](r, tween.duration, tween.from, tween.timing)
              })
            } else {
              timeline[tween.tweenType](vNode.context.$refs[tween.ref], tween.duration, tween.from, tween.timing)
            }
          }
          break;
        case 'fromTo':
          if (!tween.ref) {
            timeline[tween.tweenType](el, tween.duration, tween.from, tween.to, tween.timing)
          } else {
            if (vNode.context.$refs[tween.ref] instanceof Array) {
              vNode.context.$refs[tween.ref].forEach((r) => {
                timeline[tween.tweenType](r, tween.duration, tween.from, tween.to, tween.timing)
              })
            } else {
              timeline[tween.tweenType](vNode.context.$refs[tween.ref], tween.duration, tween.from, tween.to, tween.timing)
            }
          }
          break;
        case 'staggerTo':
        case 'staggerFrom':
        case 'staggerFromTo':
          timeline[tween.tweenType](tween.ref ? vNode.context.$refs[tween.ref] : el.children, tween.duration, tween.from, tween.staggerTime, tween.timing)
          break;
      }
    })
    // build scene
    scene.setTween(timeline)
  }

  if (actions.setClassToggle) {
    actions.setClassToggle.forEach(classTog =>{
      scene.setClassToggle(classTog.element || el, classTog.className)
    })
    if (actions.setClassToggle instanceof Array) {
      actions.setClassToggle.forEach(classTog =>{
        scene.setClassToggle(classTog.element || el, classTog.className || classTog)
      })
    } else
    if (typeof actions.setClassToggle === 'string') {
        scene.setClassToggle(el, actions.setClassToggle)
    } else {
      console.log('setClassToggle property must be a string (if you wanna add class to the directive\'s el), or an array of class names [$el, $el2, $el3] if you wanna add multiple classes');
    }
  }

  if (actions.setPin) {
    if (actions.setPin instanceof Array) {
      actions.setClassToggle.forEach(pinnedEl =>{
        scene.setPin(pinnedEl)
      })
    } else
    if (typeof actions.setPin === 'boolean') {
        scene.setPin(el)
    } else {
      console.log('setPin property must be a boolean (if you wanna pin the directive\'s el) or an array of elements [$el, $el2, $el3] if you wanna pin multiple items');
    }
  }

  scene.addTo(controller)
}
