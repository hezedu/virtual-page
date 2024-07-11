
export function uniteVue2(_Vue){

  return {
    proto: _Vue.prototype,
    nextTick: _Vue.nextTick,
    create: function(Cmpt, newOpts) {
      const CmptExtend = _Vue.extend(Cmpt);
      return new CmptExtend(newOpts);
    },
    destroy: function(cmpt){
      cmpt.$destroy();
    },
    set: _Vue.set,
    delete: _Vue.delete
  }
}

/* FIT_VUE_3_SWITCH
let _Vue3; // createApp, h, nextTick;
export function fitVue3(_Vue){
  _Vue3 = _Vue;
}

export function uniteVue3(app){
  return {
    proto: app.config.globalProperties,
    nextTick: _Vue3.nextTick,
    create: (Cmpt, newOpts) => {
      let app = _Vue3.createApp(Cmpt, newOpts.propsData);
      app.mount(newOpts.el);
      return app;
    },
    destroy: function(cmpt){
      cmpt.unmount();
    },
    set: function(obj, k, v){
      obj[k] = v;
    },
    delete: function(obj, k){
      delete obj[k];
    }
  }
}

export function vue3Reactive(obj){ // vue3 API
  return _Vue3.reactive(obj);
}

export function vue3FitEmitOnOff(self){
  const eMap =  self.$options._tmp_e_map =  Object.create(null);
  self.$on = function(key, handle){
    let list = eMap[key];
    if(!list){
      list = eMap[key] = [];
    }
    list.push(handle);
  }

  self.$off = function(key, handle){
    const list = eMap[key];
    if(list){
      const i = list.indexOf(handle);
      if(i !== -1){
        list.splice(i, 1);
      }
    }
    if(!list.length){
      delete eMap[key];
    }
  }

  self._uniteEmit = function(key) {
    const list = eMap[key];
    if(list) {
      const len = list.length;
      let i = 0;
      for(; i < len; i++){
        list[i]();
      }
    }
  }
}

*/