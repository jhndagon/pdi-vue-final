import Vue from 'vue'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { BFormFile, BImg } from 'bootstrap-vue'
import { LayoutPlugin } from 'bootstrap-vue'


Vue.use(LayoutPlugin)
Vue.component('b-img', BImg)
Vue.component('b-form-file', BFormFile)
Vue.use(BootstrapVue)
