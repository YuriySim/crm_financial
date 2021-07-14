<template>
  <form class="form" @submit.prevent="submitHandler">
    <h1 class="bill-title">{{ localizeFilter('TransferBetween') }}</h1>

     <div class="input-field field">
      <select
        ref="select1"
        v-model="v$.billSelectOne.$model"
      >
        <option value="" disabled selected>{{ localizeFilter('SelectBillDebited') }}</option>

        <option
          v-for="bill of bills"
          :key="bill.id"
          :value="bill.id"
        >
          {{ bill.titleBill }} ({{ bill.amount }} ₽)
        </option>
      </select>

      <span
        class="helper-text invalid error-text"
        v-if="v$.billSelectOne.$dirty && v$.billSelectOne.$errors.length"
      >
        {{ localizeFilter('SelectBillDebited') }}
      </span>

      <span
        class="helper-text invalid error-text"
        v-else-if="keyMessage"
      >
        {{ localizeFilter('NotEnoughMessage') }}
      </span>

    </div>

     <div class="input-field field">
      <select
        ref="select2"
        v-model="v$.billSelectTwo.$model"
      >
        <option value="" disabled selected>{{ localizeFilter('SelectBillCredited') }}</option>

        <option
          v-for="bill of bills"
          :key="bill.id"
          :value="bill.id"
        >
          {{ bill.titleBill }} ({{ bill.amount }} ₽)
        </option>
      </select>

      <span
        class="helper-text invalid error-text"
        v-if="v$.billSelectTwo.$dirty && v$.billSelectTwo.$errors.length"
      >
        {{ localizeFilter('SelectBillCredited') }}
      </span>

      <span
        class="helper-text invalid error-text"
        v-else-if="this.v$.billSelectTwo.$model === this.v$.billSelectOne.$model && this.v$.billSelectTwo.$model !== '' "
      >
        {{ localizeFilter('AnotherBillMessage') }}
      </span>
    </div>

    <div class="input-field">
      <input
        id="amountField"
        type="number"
        class="field"
        autocomplete="off"
        step="0.01"
        v-model="v$.amountField.$model"
        :class="{invalid: v$.amountField.$dirty && v$.amountField.$errors.length}"
      >
      <label for="amountField">{{ localizeFilter('Amount') }}</label>
      <span class="helper-text invalid error-text" v-if="v$.amountField.$dirty && v$.amountField.$errors.length">{{ localizeFilter('TransferBillMessage') }}</span>
    </div>

    <button
      class="btn waves-effect waves-light"
      type = 'submit'
      :class="{'modal-close': (v$.billSelectOne.$dirty && !v$.billSelectOne.$errors.length && v$.billSelectTwo.$dirty && !v$.billSelectTwo.$errors.length && v$.amountField.$dirty && !v$.amountField.$errors.length && !(this.v$.billSelectTwo.$model === this.v$.billSelectOne.$model && this.v$.billSelectTwo.$model !== ''))}"
    >
      {{ localizeFilter('Transfer') }}
      <i class="material-icons right">send</i>
    </button>
  </form>
</template>

<script>
  import M from 'materialize-css'

  import useVuelidate from '@vuelidate/core'
  import { required, minValue } from '@vuelidate/validators'

  import localizeFilterMixin from '@/mixins/localizeFilter.mixin'

  export default {
    mixins: [localizeFilterMixin],

    props: {
      bills: {
        required: true,
        type: Array,
      }
    },

    setup () {
      return { v$: useVuelidate() }
    },

    data: () => ({
      keyMessage: false,

      selectOne: null,
      selectTwo: null,

      amountField: '',

      titleBillOne: '',
      titleBillTwo: '',
      amountOne: '',
      amountTwo: '',
      billSelectOne: '',
      billSelectTwo: '',
    }),

    validations () {
      return {
        amountField: { required, minValue: minValue(0.01) },

        billSelectOne: {
          customValid: (value) => value !== '',
        },

        billSelectTwo: {
          customValid: (value) => value !== '',
        },
      }
    },

    methods: {
      async submitHandler() {
        if (this.v$.$invalid || this.v$.billSelectOne.$model === this.v$.billSelectTwo.$model) {
          this.v$.$touch()
          return
        }

        for (var bill of this.bills) {
          if (bill.id === this.billSelectOne ) {
            if (bill.amount >= this.amountField) {
              this.titleBillOne = bill.titleBill
              this.amountOne = (Number(bill.amount) - Number(this.amountField)).toFixed(2)
            } else {
              this.keyMessage = true
              return
            }
          }

          if(bill.id === this.billSelectTwo) {
            this.titleBillTwo = bill.titleBill
            this.amountTwo = (Number(bill.amount) + Number(this.amountField)).toFixed(2)
          }
        }

        const formDataOne = {
          amount: Number(this.amountOne),
          titleBill: this.titleBillOne,
          idBill: this.billSelectOne,
        }

        const formDataTwo = {
          amount: Number(this.amountTwo),
          titleBill: this.titleBillTwo,
          idBill: this.billSelectTwo,
        }

        try {
          await this.$store.dispatch('updateBills', formDataOne)
          await this.$store.dispatch('updateBills', formDataTwo)
          this.$emit('transferSum', {formDataOne, formDataTwo})

          this.$message(this.localizeFilter('AmountTransferred'))

        }catch (error) {''}
      },
    },

    mounted() {
      this.selectOne = M.FormSelect.init(this.$refs.select1)
      this.selectTwo = M.FormSelect.init(this.$refs.select2)
    },

    beforeUnmount() {
      if(this.selectOne && this.selectOne.destroy) {
        this.selectOne.destroy()
      }

      if(this.selectTwo && this.selectTwo.destroy) {
        this.selectTwo.destroy()
      }
    },
  }
</script>
