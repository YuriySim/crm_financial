<template>
  <div class="page-title">
    <h3>{{ localizeFilter('Support') }}</h3>
  </div>

  <h6 class="center">
    {{ localizeFilter('SupportText') }}
    <br>
    finance_control@support.com
  </h6>
</template>

<script>
  import localizeFilterMixin from '@/mixins/localizeFilter.mixin'

  import { useMeta } from 'vue-meta'

  export default {
    name: 'support',

    setup () {
      useMeta({ title: 'Support' })
    },

    mixins: [localizeFilterMixin],
  }
</script>
