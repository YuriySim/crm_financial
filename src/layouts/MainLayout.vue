<template>
  <div class="main-layout">

    <Navbar @clickname="isOpen = !isOpen"/>

    <Sidebar :value="isOpen"/>

    <main class="app-main-content" :class="{full: !isOpen}">
      <div class="app-main-page">
        <router-view />
      </div>
    </main>

    <Footer />

  </div>
</template>

<script>
  import Navbar from '@/components/app/Navbar.vue'
  import Sidebar from '@/components/app/Sidebar.vue'
  import Footer from '@/components/app/Footer.vue'

  import messages from '@/utils/messages'

  export default {
    name: 'main-layout',
    data: () => ({
      isOpen: true,
    }),

    async mounted() {
      if (!Object.keys(this.$store.getters.info).length) {
        await this.$store.dispatch('fetchInfo')
      }
    },

    computed: {
      error() {
        return this.$store.getters.error
      }
    },

    watch: {
      error(fbError) {
        this.$error(messages[fbError.code] || 'Что-то пошло не так')
      }
    },

    components: {
      Navbar,
      Sidebar,
      Footer,
    },
  }
</script>
