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
  apiKey: 'AIzaSyA0zSvIPurvgE9YiiWAwtr06JN6yJDXo1s',
  authDomain: 'crm-financial.firebaseapp.com',
  projectId: 'crm-financial',
  storageBucket: 'crm-financial.appspot.com',
  messagingSenderId: '193700671921',
  appId: '1:193700671921:web:dd9d4845ed7aca21938d90',
  measurementId: 'G-P7TM2KQ0BR',
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
