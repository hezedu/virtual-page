<template>
  <transition :name="transitionName" :appear="true">
    <div :class="transitionName" v-show="isActive" :style="{zIndex: v.stateKey}">
      <PageMain 
            :path="v.path"
            :title="v.title"
            :isTab="v.isTab"
            :tabIndex="v.tabIndex"
            :stateKey="v.stateKey"
            :route="v.route"
            :isFirstLoad="isFirstLoad"

            :isActive="isActive"

            :style="[globalPageStyle, v.style]"
            :class="v.className"
      >
        <component :is="v.cmptKey" />
      </PageMain>
      <div class="h-nav-modal"  
        v-for="modal in v.modalList" 
        :key="modal.key"
        :style="{zIndex: modal.key}"
      >
        <div :id="'h_nav_modal_' + modal.uid" />
      </div>

    </div>
  </transition>
</template>
<script>
import PageMain from './page_main.vue';
export default {
  name: 'HistoryNavigationPageWrap',
  components: {
    PageMain
  },
  props: {
    transitionName: {
      type: String,
      default: 'h-nav-page'
    },

    v: {
      type: Object,
      required: true
    },
    isActive: {
      type: Boolean,
      required: true
    },
    isFirstLoad: {
      type: Boolean,
      required: true
    },
    globalPageStyle: undefined
  }
}

</script>