<template>

  <div class="page-title">
    <h3>{{ localizeFilter('YourFinances') }}</h3>
  </div>

  <div class="row bill-content">
    <div class="col s12 m12 l6 xl4 bill-card">
      <div class="scrol-bill">
        <Loader v-if="loading" />

        <p class="center" v-else-if="!bills.length">
          {{ localizeFilter('NoBills') }}
        </p>

        <div v-else v-for="bill of bills" :key="bill.id">
          <h3 class="title-bill">
            {{bill.titleBill}}
          </h3>

          <div class="currency-line">
            <span :key="refreshToken">
              {{bill.amount}}
              {{ generatorIconCurrency() }}
            </span>
          </div>
        </div>
      </div>

      <div class="center button-box">
        <div>
          <a class="modal-trigger waves-effect waves-light btn" href="#modal1" @click="refreshComponent">
            <i class="material-icons right">credit_card</i>
            {{ localizeFilter('AddNewBill') }}
          </a>

          <div id="modal1" class="modal">
            <BillAdd
              @addBill="addBills"
              :key="refreshToken"
            />
          </div>
        </div>

        <div class="button-lower">
          <a class="modal-trigger waves-effect waves-light btn btn-custom" href="#modal2" @click="refreshComponent" v-tooltip="localizeFilter('ToolTipTopUp')">
            <i class="material-icons">attach_money</i>
          </a>

            <div id="modal2" class="modal">
              <BillReplenish
                :bills="bills"
                :categories="categories"
                :categorySelect="categorySelect"
                :key="refreshToken"
                @updatedAmount="updatedAmount"
              />
            </div>

          <a class="modal-trigger waves-effect waves-light btn btn-custom" href="#modal3" @click="refreshComponent" v-tooltip="localizeFilter('ToolTipTransfer')">
            <i class="material-icons">autorenew</i>
          </a>

          <div id="modal3" class="modal">
            <BillTransfer
              :bills="bills"
              :key="refreshToken"
              @transferSum="transferSum"
            />
          </div>

          <a class="modal-trigger waves-effect waves-light btn btn-custom" href="#modal4" @click="refreshComponent" v-tooltip="localizeFilter('ToolTipEdit')">
            <i class="material-icons">mode_edit</i>
          </a>

          <div id="modal4" class="modal">
            <BillEdit
              :bills="bills"
              :key="refreshToken"
              @editTitle="updatedTitle"
            />
          </div>

          <a class="modal-trigger waves-effect waves-light btn btn-custom" href="#modal5" @click="refreshComponent" v-tooltip="localizeFilter('ToolTipDelete')">
            <i class="material-icons">delete</i>
          </a>

          <div id="modal5" class="modal">
            <BillRemove
              :bills="bills"
              :key="refreshToken"
              @removeBills="removeBills"
            />
          </div>
        </div>
      </div>

      <div class="total-bill">
        <h3 class="title-bill">{{ localizeFilter('Total') }}</h3>

        <Loader v-if="loading" />

        <p v-else-if="!bills.length">{{ localizeFilter('TotalMessage') }}</p>

        <div v-else>
          <p>
            {{ totalBill.toFixed(2) }}
            {{ generatorIconCurrency() }}
          </p>

          <p v-if="usd">{{ usd }} $</p>
          <p v-if="eur">{{ eur }} €</p>
        </div>
      </div>

    </div>
    <div class="col s12 m12 l6 xl8">
      <h5 class="center">{{ localizeFilter('BalanceChart') }}</h5>

      <div class="bill-chart">
        <canvas ref="canvas" :key="bills" />
      </div>
    </div>

  </div>
</template>

<script>
  import M from 'materialize-css'

  import BillEdit from '@/components/app-bill/BillEdit.vue'
  import BillRemove from '@/components/app-bill/BillRemove.vue'
  import BillAdd from '@/components/app-bill/BillAdd.vue'
  import BillTransfer from '@/components/app-bill/BillTransfer.vue'
  import BillReplenish from '@/components/app-bill/BillReplenish.vue'

  import chartColorGeneratorMixin from '@/mixins/chartColorGenerator.mixin'
  import localizeFilterMixin from '@/mixins/localizeFilter.mixin'
  import accountCurrencyMixin from '@/mixins/accountCurrency.mixin'

  import { Pie } from 'vue3-chart-v2'

  import { useMeta } from 'vue-meta'

  export default {
    name: 'bill',

    setup () {
      useMeta({ title: 'Bill' })
    },

    mixins: [
      chartColorGeneratorMixin,
      localizeFilterMixin,
      accountCurrencyMixin,
    ],

    extends: Pie,

    data () {
      return {
        loading: true,

        constModal: null,

        bills: [],
        categories: [],

        refreshToken: 0,
        closeKey: false,

        totalBill: 0,

        categorySelect: '',
      }
    },

    methods: {
      refreshComponent() {
        this.refreshToken++
      },

      addBills(newBill) {
        this.bills.push(newBill)

        this.chart()
      },

      updatedAmount(formData) {
        for (var bill of this.bills) {
          if (bill.id === formData.idBill) {
            this.totalBill += Number(formData.amount) - Number(bill.amount)

            this.totalBillInOtherCurrencies(this.totalBill)

            bill.amount = Number(formData.amount)
          }
        }

        this.chart()
      },

      updatedTitle(formData) {
        for (var bill of this.bills) {
          if (bill.id === formData.idBill) {
            bill.titleBill = formData.titleBill
          }
        }

        this.chart()
      },

      transferSum({formDataOne, formDataTwo}) {
        for (var bill of this.bills) {
          if (bill.id === formDataOne.idBill ) {
            bill.amount = Number(formDataOne.amount)
          }

          if(bill.id === formDataTwo.idBill) {
            bill.amount = Number(formDataTwo.amount)
          }
        }

        this.chart()
      },

      removeBills(idBill) {
        for (var [idx, bill] of this.bills.entries()) {
          if (bill.id === idBill) {
            this.bills.splice(idx, 1)
          }
        }

        this.chart()
      },

      chart() {
        if (this.$data.state.chartObj && this.$data.state.chartObj.destroy) {
          this.$data.state.chartObj.destroy()
        }

        this.color(this.bills)

        this.renderChart({
          labels: this.bills.map(b => b.titleBill),

          datasets: [{
            data: this.bills.map(b => b.amount),

            backgroundColor: this.backgroundColor,

            borderColor: this.borderColor,

            borderWidth: 1
          }]
        })
      },
    },

    async mounted() {
      this.bills = await this.$store.dispatch('fetchBills')

      this.categories = await this.$store.dispatch('fetchCategories', {directory: 'income'})

      for (var bill of this.bills) {
        this.totalBill += Number(bill.amount)
      }

      this.totalBillInOtherCurrencies(this.totalBill)

      for(var category of this.categories) {
        if(category.titleCategory === 'Без категории' || category.titleCategory === 'No category') {
          this.categorySelect = category.id
        }
      }

      this.loading = false

      this.constModal = M.Modal.init(document.querySelectorAll('.modal'), {opacity: 0.4})

      this.chart()
    },

    components: {
      BillEdit,
      BillRemove,
      BillAdd,
      BillTransfer,
      BillReplenish,
    },

    beforeUnmount() {
      if (this.constModal && this.constModal.destroy) {
        this.constModal.destroy()
      }

      if (this.$data.state.chartObj && this.$data.state.chartObj.destroy) {
        this.$data.state.chartObj.destroy()
      }
    },
  }
</script>
