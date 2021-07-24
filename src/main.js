import { createApp } from 'vue'
import { createMetaManager } from 'vue-meta'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import messagePlugin from '@/utils/message.plugin'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

import Loader from '@/components/app/Loader'
import Pagination from 'v-pagination-3'

import tooltipDirective from '@/directives/tooltip.directive'

firebase.initializeApp({
  apiKey: 'AIzaSyC7I8aXdP-s5hrqf0f7xM8HJ-QCTmGQ81Q',
  authDomain: 'finance-control-system.firebaseapp.com',
  projectId: 'finance-control-system',
  storageBucket: 'finance-control-system.appspot.com',
  messagingSenderId: '67700040997',
  appId: '1:67700040997:web:1b27204077d881f10fe6cc',
  measurementId: 'G-ZX2QB413FL',
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(store)
      .use(createMetaManager())
      .use(router)
      .use(messagePlugin)
      .component('Loader', Loader)
      .component('pagination', Pagination)
      .directive('tooltip', tooltipDirective)
      .mount('#app')
  }
})
