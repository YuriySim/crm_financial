<template>
  <div class="page-title">
    <h3>{{ localizeFilter('CurrencyRates') }}</h3>
  </div>

  <Loader v-if="loading" />

  <section v-else class="currency-rates">
    <h6 class="center">
      {{ localizeFilter('BaseCurrency') }}
      {{ currencyInfo }}
    </h6>

    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>{{ localizeFilter('Currency') }}</th>
          <th>{{ localizeFilter('Rate') }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(value, title, idx) of currencies" :key="idx">
          <td>{{ idx + 1 }}</td>
          <td>{{ title }}<Flag :idx='idx'/></td>
          <td>{{ value }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
  import Flag from '@/components/app-currency/Flag.vue'

  import localizeFilterMixin from '@/mixins/localizeFilter.mixin'
  import accountCurrencyMixin from '@/mixins/accountCurrency.mixin'

  import { useMeta } from 'vue-meta'

  export default {
    name: 'currency',

    setup () {
      useMeta({ title: 'Currency rates' })
    },

    mixins: [
      localizeFilterMixin,
      accountCurrencyMixin,
    ],

    data () {
      return {
        loading: true,
      }
    },

    mounted() {
      this.loading = false
    },

    components: {
      Flag,
    },
  }
</script>
