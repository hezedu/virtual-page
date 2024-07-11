<template>
<div class="h-nav-page-main">
  <slot />
</div>
</template>
<script>
import { PAGE_E_SHOW_NAME, PAGE_E_HIDE_NAME } from '../constant';
export default {
  name: 'HistoryNavigationPage',
  provide(){
    return {
      $page: this
    }
  },
  props: {
    path: {
      type: String
    },
    title: String,
    isTab: {
      type: Boolean,
      required: true
    },

    tabIndex: Number,

    stateKey: Number,
    
    route: {
      type: Object,
      required: true
    },
    isFirstLoad: {
      type: Boolean,
      required: true
    },

    isActive: {
      type: Boolean,
      required: true
    },
  },
  data(){
    return {
      isLoad: this.isFirstLoad
    }
  },
  watch: {
    isActive(){
      this._handleShowHide();
    }
  },
  methods: {
    _handleShowHide(){
      if(this.isActive){
        this._uniteEmit(PAGE_E_SHOW_NAME);
      } else {
        this._uniteEmit(PAGE_E_HIDE_NAME);
      }
    },
    _uniteEmit(key){
      this.$emit(key);
    },
    _uniteBeforeDestory(){
      if(!this.isLoad){
        return;
      }
      this.$options._tmp_is_before_destroy = true;

      // // Unlike window app. 
      // // It's like wehn input dom removed the blur event also trigger. 
      // // It's will trigger hide event before destroy.
      if(this.isActive){
        this._uniteEmit(PAGE_E_HIDE_NAME);
      }
      this.isLoad = false;
    }
  },
  beforeCreate(){
    // if(this.$navigator.vueIs3){ // FIT_VUE_3_SWITCH
    //   vue$3FitEmitOnOff(this);
    // }
  },
  mounted(){
    if(this.isLoad){ // For pre rendering or server rendering
      this._uniteEmit(PAGE_E_SHOW_NAME);
      return;
    }
    setTimeout(() => {
      if(this.$options._tmp_is_before_destroy){
        return;
      }
      // If don't use setTimeout, 
      // the next page's document addEventListener click will trigger in current page.
      this.isLoad = true;
      this.$nextTick(() => {
        this._uniteEmit(PAGE_E_SHOW_NAME);
      })
      
    });

  },
  beforeDestroy(){
    this._uniteBeforeDestory();
  },

  beforeUnmount(){
    this._uniteBeforeDestory();
  }
}

</script>