<template>
  <div class="page-title">
    <h3>{{ localizeFilter('History') }}</h3>
  </div>

  <Loader v-if="loading" />

  <div v-else>
    <div v-if="keyOne || keyTwo">
      <h5 class="center">{{ localizeFilter('ExpenseChart') }}</h5>

      <HistoryChart
        :categories="categoriesOutcome"
        :records="recordsOutcome"
      />
    </div>

    <div v-else-if="keyThree">
      <h5 class="center">{{ localizeFilter('IncomeChart') }}</h5>

      <HistoryChart
        :categories="categoriesIncome"
        :records="recordsIncome"
      />
    </div>

    <section>
      <ul id="tabs-swipe-demo" class="tabs" ref="tabs">
        <li
          class="tab col s3"
          @click="paginations(records), switchNav(1)"
        >
          <a href="#test-swipe" :class="{active: keyOne}">
            {{ localizeFilter('All') }}
          </a>
        </li>

        <li
          class="tab col s3"
          @click="paginations(recordsOutcome), switchNav(2)"
        >
          <a href="#test-swipe" :class="{active: keyTwo}">
            {{ localizeFilter('Expenses') }}
          </a>
        </li>

        <li
          class="tab col s3"
          @click="paginations(recordsIncome), switchNav(3)"
        >
          <a href="#test-swipe" :class="{active: keyThree}">
            {{ localizeFilter('Incomes') }}
          </a>
        </li>
      </ul>

      <div id="test-swipe" class="col s12">
        <HistoryTable
          :records="items"
          :numberPage="page"
          :pageSize="pageSize"
        />
      </div>
    </section>

    <pagination
      v-model="page"
      :records="recordCount"
      :per-page="pageSize"
      :showText="showingText"
      :toText="toText"
      :ofText="ofText"
      :recordsText="recordsText"
      :oneRecordText="oneRecordText"
      @paginate="pageChangeHandler"/>
  </div>
</template>

<script>
  import M from 'materialize-css'

  import HistoryTable from '@/components/app-history/HistoryTable'
  import HistoryChart from '@/components/app-history/HistoryChart'

  import paginationMixin from '@/mixins/pagination.mixin'

  import localizeFilterMixin from '@/mixins/localizeFilter.mixin'

  import { Pie } from 'vue3-chart-v2'

  import { useMeta } from 'vue-meta'

  export default {
    name: 'history',

    setup () {
      useMeta({ title: 'History' })
    },

    extends: Pie,

    mixins: [paginationMixin, localizeFilterMixin],

    data () {
      return {
        loading: true,
        constTab: null,

        recordsIncome: [],
        recordsOutcome: [],

        records: [],

        categoriesIncome: [],
        categoriesOutcome: [],

        keyOne: true,
        keyTwo: false,
        keyThree: false,

        showingText: '',
        toText: '',
        ofText: '',
        recordsText: '',
        oneRecordText: '',
      }
    },

    methods: {
      paginations(record) {
        this.setupPaginations(record)
        this.page = 1
      },

      switchNav(param) {
        if (param === 1) {
          this.keyOne = true
          this.keyTwo = false
          this.keyThree = false
        } else if (param === 2) {
          this.keyOne = false
          this.keyTwo = true
          this.keyThree = false
        } else {
          this.keyOne = false
          this.keyTwo = false
          this.keyThree = true
        }
      },
    },

    async mounted() {
      const recordsIncome = await this.$store.dispatch('fetchRecords', {directory: 'income'})
      recordsIncome.sort((a, b) => new Date(b.date) - new Date(a.date))

      const recordsOutcome = await this.$store.dispatch('fetchRecords', {directory: 'outcome'})
      recordsOutcome.sort((a, b) => new Date(b.date) - new Date(a.date))

      this.categoriesIncome = await this.$store.dispatch('fetchCategories', {directory: 'income'})

      this.categoriesOutcome = await this.$store.dispatch('fetchCategories', {directory: 'outcome'})

      this.recordsIncome = recordsIncome.map(record => {
        return {
          ...record,
          titleCategory: this.categoriesIncome.find(c => c.id === record.idCategory).titleCategory,
        }
      })

      this.recordsOutcome = recordsOutcome.map(record => {
        return {
          ...record,
          titleCategory: this.categoriesOutcome.find(c => c.id === record.idCategory).titleCategory,
        }
      })

      this.records = [...this.recordsIncome, ...this.recordsOutcome]
      this.records.sort((a, b) => new Date(b.date) - new Date(a.date))

      this.showingText = this.localizeFilter('Showing')
      this.toText = this.localizeFilter('To')
      this.ofText = this.localizeFilter('Of')
      this.recordsText = this.localizeFilter('Records')
      this.oneRecordText = this.localizeFilter('OneRecord')

      this.paginations(this.records)

      this.loading = false

      this.constTab = M.Tabs.init(this.$refs.tabs)
    },

    components: {
      HistoryTable,
      HistoryChart,
    },

    beforeUnmount() {
      if (this.constTab && this.constTab.destroy) {
        this.constTab.destroy()
      }
    },
  }
</script>
