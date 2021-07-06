<template>
  <footer>
    <p class="grey-text">{{ localizeFilter('Rights') }} © 2020-2021 YS Portfolio</p>
  </footer>
</template>

<script>
  import localizeFilterMixin from '@/mixins/localizeFilter.mixin'

  export default {
    mixins: [localizeFilterMixin],
  }
</script>
