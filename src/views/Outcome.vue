<template>
  <div class="page-title">
    <h3>{{ localizeFilter('Expenses') }}</h3>
  </div>

  <Loader v-if="loading" />

  <OutcomeForm
    v-else
    :bills="bills"
    :categories="categories"
    :key="count"
    @updatedBill="updatedBill"
  />

</template>

<script>
  import OutcomeForm from '@/components/app-outcome/OutcomeForm.vue'

  import localizeFilterMixin from '@/mixins/localizeFilter.mixin'

  import { useMeta } from 'vue-meta'

  export default {
    name: 'expenses',

    setup () {
      useMeta({ title: 'Expenses' })
    },

    mixins: [localizeFilterMixin],

    data () {
      return {
        loading: true,
        count: 0,

        bills: [],
        categories: [],
      }
    },

    methods: {
      updatedBill(formDataBill) {
        for (var bill of this.bills) {
          if (bill.id === formDataBill.idBill) {
            bill.amount = Number(formDataBill.amount)
            this.count++
          }
        }
      }
    },

    async mounted() {
      this.bills = await this.$store.dispatch('fetchBills')

      this.categories = await this.$store.dispatch('fetchCategories', {directory: 'outcome'})

      this.loading = false
    },

    components: {
      OutcomeForm,
    },
  }
</script>

