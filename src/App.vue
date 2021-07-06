<template>
  <metainfo>
    <template v-slot:title="{ content }">
      {{ content ? `${content} | FinanceControl` : `FinanceControl` }}
    </template>
  </metainfo>

  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
  import HomeLayout from '@/layouts/HomeLayout.vue'
  import EmptyLayout from '@/layouts/EmptyLayout.vue'
  import MainLayout from '@/layouts/MainLayout.vue'

  import { useMeta } from 'vue-meta'

  export default {
    setup () {
      useMeta({
        title: '',
        htmlAttrs: { lang: 'en', amp: true },
      })
    },

    computed: {
      layout() {
        return (this.$route.meta.layout || 'empty') + '-layout'
      }
    },

    components: {
      HomeLayout,
      EmptyLayout,
      MainLayout,
    },
  }
</script>

<style lang="scss">
  @import '~materialize-css/dist/css/materialize.min.css';
  @import './assets/styleHomePage.css';
  @import './assets/style.css';
</style>
