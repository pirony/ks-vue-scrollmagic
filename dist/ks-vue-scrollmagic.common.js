/*!
 * ks-vue-scrollmagic v0.0.1
 * (c) 2017 pirony
 * Released under the MIT License.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Hello = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"hello"},[_c('h1',{staticClass:"hello__title"},[_vm._v(_vm._s(_vm.msg))]),_c('span',[_vm._v("Count: "+_vm._s(_vm.n))]),_vm._v(" "),_c('button',{on:{"click":function($event){_vm.n++;}}},[_vm._v("Add")]),_c('ul',[_c('li',[_vm._v(_vm._s(_vm.n))])])])},staticRenderFns: [],
  data: function data () {
    return {
      msg: 'Hello World!',
      n: 0
    }
  }
};

var HelloJsx = {
  name: 'HelloJsx',
  data: function data () {
    return {
      msg: 'Hello JSX'
    }
  },
  render: function render (h) {
    return (
      h('div', null, [
        h('h1', {class: this.msg !== 'nope' ? 'hello__title' : ''}, [ this.msg])
      ])
    )
  }
};

function plugin (Vue) {
  Vue.component('hello', Hello);
  Vue.component('hello-jsx', HelloJsx);
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

var version = '0.0.1';

exports['default'] = plugin;
exports.Hello = Hello;
exports.HelloJsx = HelloJsx;
exports.version = version;
