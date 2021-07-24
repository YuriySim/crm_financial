<template>
  <div>
    <div class="page-title">
      <h3>
        {{ localizeFilter('Planning') }}
      </h3>

      <h4>
        {{ totalBill }}
        {{ generatorIconCurrency() }}
      </h4>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!categories.length">
      {{ localizeFilter('NoCategories') }}

      <router-link to="/categories">
        {{ localizeFilter('AddNewCategory') }}
      </router-link>
    </p>

    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{ cat.titleCategory }}:</strong>
          {{ cat.spend }} {{ generatorIconCurrency() }}
          {{ localizeFilter('From') }} {{ cat.limitCategory }}
          {{ generatorIconCurrency() }}
        </p>

        <div class="progress" v-tooltip="cat.tooltip">
          <div
          class="determinate"
          :class="cat.progressColor"
          :style="{width:cat.progressPercent+'%'}">
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { useMeta } from 'vue-meta'

  import localizeFilterMixin from '@/mixins/localizeFilter.mixin'
  import accountCurrencyMixin from '@/mixins/accountCurrency.mixin'

  export default {
    name: 'planning',

    setup () {
      useMeta({ title: 'Planning' })
    },

    mixins: [
      localizeFilterMixin,
      accountCurrencyMixin,
    ],

    /*setup () {
      useMeta({ title: 'Planning' })
    },*/

    data() {
      return {
        loading: true,

        bills: [],
        categories: [],

        totalBill: 0,
      }
    },

    async mounted() {
      const records = await this.$store.dispatch('fetchRecords', { directory: 'outcome' })
      const categories = await this.$store.dispatch('fetchCategories', { directory: 'outcome' })

      for (var category of categories) {
        if (category.titleCategory === 'Без категории' || category.titleCategory === 'No category') {
          categories.shift()
        }
      }

      this.bills = await this.$store.dispatch('fetchBills')

      for (var bill of this.bills) {
        this.totalBill += Number(bill.amount)
      }

      this.categories = categories.map(cat => {
        const spend = records
          .filter(r => r.idCategory === cat.id)
          .reduce((total, record) => {
            return total += +record.amount
          }, 0)

        const percent = 100 * spend / cat.limitCategory
        const progressPercent = percent > 100 ? 100 : percent
        const progressColor = percent < 60 ? 'green'
                            : percent < 100 ? 'yellow' : 'red'

        const tooltipValue = cat.limitCategory - spend
        const tooltip = `${ tooltipValue < 0 ? this.localizeFilter('ExceedingLimit') : this.localizeFilter('Remained')} ${Math.abs(tooltipValue)} ₽`

        return {
          ...cat,
          progressPercent,
          progressColor,
          spend,
          tooltip,
        }
      })

      this.loading = false
    },
  }
</script>

