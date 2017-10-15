const gsap = require('TweenMax')
require('animation.gsap')
const ScrollMagic = require('ScrollMagic');

export const setScrollMagic = (el, binding, vNode) => {
  let timeline = new gsap.TimelineMax();
  const controller = new ScrollMagic.Controller();
  const actions = binding.value
  const scene = new ScrollMagic.Scene(actions.sceneParams)

  if (actions.setTween) {
    actions.setTween.forEach((tween, i) =>{
      timeline = constructTweens(el, tween, timeline, vNode)
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

function constructTweens (el, tween, timeline, vNode) {
  switch (tween.type) {
    case 'to':
      if (!tween.ref) {
        return timeline[tween.type](el, tween.duration, tween.to, tween.timing)
      } else {
        if (vNode.context.$refs[tween.ref] instanceof Array) {
          vNode.context.$refs[tween.ref].forEach((r) => {
            return timeline[tween.type](r, tween.duration, tween.to, tween.timing)
          })
        } else {
          return timeline[tween.type](vNode.context.$refs[tween.ref], tween.duration, tween.to, tween.timing)
        }
      }
      break;
    case 'from':
      if (!tween.ref) {
        return timeline[tween.type](el, tween.duration, tween.from, tween.timing)
      } else {
        if (vNode.context.$refs[tween.ref] instanceof Array) {
          vNode.context.$refs[tween.ref].forEach((r) => {
            return timeline[tween.type](r, tween.duration, tween.from, tween.timing)
          })
        } else {
          return timeline[tween.type](vNode.context.$refs[tween.ref], tween.duration, tween.from, tween.timing)
        }
      }
      break;
    case 'fromTo':
      if (!tween.ref) {
        return timeline[tween.type](el, tween.duration, tween.from, tween.to, tween.timing)
      } else {
        if (vNode.context.$refs[tween.ref] instanceof Array) {
          vNode.context.$refs[tween.ref].forEach((r) => {
            return timeline[tween.type](r, tween.duration, tween.from, tween.to, tween.timing)
          })
        } else {
          return timeline[tween.type](vNode.context.$refs[tween.ref], tween.duration, tween.from, tween.to, tween.timing)
        }
      }
      break;
    case 'staggerTo':
    case 'staggerFrom':
    case 'staggerFromTo':
      return timeline[tween.type](tween.ref ? vNode.context.$refs[tween.ref] : el.children, tween.duration, tween.from, tween.staggerTime, tween.timing)
      break;
  }
}
