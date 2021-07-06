<template>
  <div class="page-title">
    <h3>{{ localizeFilter('Details') }}</h3>
  </div>

  <div>
    <Loader v-if="loading" />

    <div  v-else>
      <div class="nav-wrapper">
        <div class="col s6">
          <router-link to="/history" class="breadcrumb">
            {{ localizeFilter('History') }}
          </router-link>

          <a href="#!" class="breadcrumb" @click.prevent>
            {{ record.key ? localizeFilter('Income')
                          : localizeFilter('Expense') }}
          </a>
        </div>
      </div>

      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="record.key ? 'green' : 'red'">
            <div class="card-content white-text">
              <p v-if="!record.key">
                {{ localizeFilter('DetailDescription') }}
                {{ record.description }}
              </p>

              <p>
                {{ localizeFilter('DetailCategory') }}
                {{ titleCategory }}
              </p>

              <p>
                {{ localizeFilter('DetailAmount') }}
                {{ record.amount }}
                {{ generatorIconCurrency() }}
              </p>

              <p v-if="record.key">
                {{ localizeFilter('DetailBillCredited') }}
                {{ record.titleBill }}
              </p>

              <p v-else>
                {{ localizeFilter('DetailBillDebited') }}
                {{ record.titleBill }}
              </p>

              <p>{{ dateFilter(record.date, localeInfo, 'date') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { useMeta } from 'vue-meta'
  import datetimeMixin from '@/mixins/datetime.mixin'

  import localizeFilterMixin from '@/mixins/localizeFilter.mixin'
  import accountCurrencyMixin from '@/mixins/accountCurrency.mixin'

  export default {
    name: 'ditail',

    setup () {
      useMeta({ title: 'Ditails' })
    },

    mixins: [
      datetimeMixin,
      localizeFilterMixin,
      accountCurrencyMixin,
    ],

    data() {
      return {
        loading: true,
        record: null,

        directory: '',
        titleCategory: null,
      }
    },

    async mounted() {
      const idRecord = this.$route.params.id

      this.directory = await this.$store.dispatch('checkRecordById', {idRecord})

      this.record = await this.$store.dispatch('fetchRecordById', {idRecord, directory: this.directory})

      const idCategory = this.record.idCategory

      this.titleCategory = (await this.$store.dispatch('fetchCategoryById', {idCategory, directory: this.directory})).titleCategory

      this.loading = false
    },

    computed: {
      localeInfo() {
        return this.$store.getters.info.locale
      },
    },
  }
</script>

