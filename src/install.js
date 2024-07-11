import NavigationController from './cmpt/navigation-controller.vue';
import DefaultNotFound from './cmpt/default-not-found.vue';
import Navigator from './cmpt/navigator.vue';
import navigator from './navigator/navigator';
import { trimSlash } from './navigator/url';
import ShowHideMixin from './mixin/show-hide-mixin';
import { def, throwErr, getVueV } from './util';
import { uniteVue2} from './fit_vue';
import {cmptPageSuffix, 
  notFoundPageKey, 
  DEF_NAVIGATOR_TRIGGER_EVENT,
  DEF_URL_BASE,
  DEF_URL_IS_HASH_MODE,
  DEF_TRANSITION,
  DEF_PAGE_STYLE } from './constant';


const defNotFoundPage = {
  title: 'Not Found',
  component: DefaultNotFound
}

export default function install(_Vue, config) {
  const vueV = getVueV(_Vue);
  let implementation;
  if(vueV === 2){
    implementation = uniteVue2(_Vue);
  // } else if(vueV === 3){ // FIT_VUE_3_SWITCH
  //   implementation = implementation$3(_Vue);
  //   implementation.is3 = true;
  } else {
    throwErr('Unsupported version of Vue ' + vueV);
  }


  if(!Array.isArray(config.pages)){
    throwErr('config.pages is not Array.');
  }

  const pageMap  = _formatPages(config.pages);
  let tabBar;
  if(config.tabBar){
    tabBar = _formatTabBar(config.tabBar, pageMap);
  }
  
  let notFoundPage = config.notFoundPage || defNotFoundPage;
  _Vue.component(notFoundPageKey, notFoundPage.component);

  notFoundPage = {
    path: null,
    title: notFoundPage.title,
    cmptKey: notFoundPageKey,
    isTab: false,
    
    trimedPath: null
  }

  let i, page;
  for(i in pageMap){
    page = pageMap[i];
    _Vue.component(page.cmptKey, page.component);
  }

  _Vue.component('NavigationController', NavigationController);
  _Vue.component('Navigator', Navigator);
  
  const globalOption = Object.create(null);
  def(globalOption, config, 'navigatorTriggerEvent', DEF_NAVIGATOR_TRIGGER_EVENT);
  def(globalOption, config, 'transition', DEF_TRANSITION);
  def(globalOption, config, 'pageStyle', DEF_PAGE_STYLE);

 
  


  const options = {
    global: globalOption,
    implementation,
    pageMap,
    cmptPageSuffix,
    notFoundPage,
    tabBar,
    onRouted: config.onRouted
  }

  def(options, config, 'urlBase', DEF_URL_BASE);
  def(options, config, 'urlIsHashMode', DEF_URL_IS_HASH_MODE);

  implementation.proto.$navigator = navigator(options);
  _Vue.mixin(ShowHideMixin(implementation.is3));
}

function _formatPages(pages){

  let map = Object.create(null);
  let i = 0, len = pages.length, page, tk, fpage;
  for(; i < len; i++){
    page = pages[i];
    tk = trimSlash(page.path);
    if(map[tk]){
      throwErr(`pageMap key: ${tk} is same as ${page.path}`);
    }
    fpage = Object.assign({}, page);

    Object.assign(fpage, {
      trimedPath: tk,
      isTab: false,
      cmptKey: cmptPageSuffix + i
    });

    map[tk] = fpage;
  }
  return map;
}


function _formatTabBar(tabBar, pageMap){
  const list = tabBar.list;
  let len = list.length;
  if(len < 2){
    throwErr(`tabBar list length must >= 2`);
  }
  let i = 0,  tk, item;
  
  const map = Object.create(null);
  const newList = [];
  for(; i < len; i++){
    item = list[i];
    tk = trimSlash(item.pagePath);
    const page = pageMap[tk];
    if(!page || page.path !== item.pagePath){
      throwErr(`tabBar pagePath: ${i} is not found in pages`);
    }
    if(map[tk]){
      throwErr(`tabBar pagePath: ${tk} is same as ${i}`);
    }
    page.isTab = true;
    page.tabIndex = i;
    map[tk] = true;
    newList.push(Object.assign({}, item));
  }
  return {
    map,
    list: newList
  };
}


