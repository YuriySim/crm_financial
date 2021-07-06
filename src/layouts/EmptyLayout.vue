<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
  import messages from '@/utils/messages'
  export default {

    // здесь в computed и watch обработка ошибок в автоматическом режиме
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
  }
</script>
