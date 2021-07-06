<template>
  <form class="form" @submit.prevent="submitHandler">
    <h1 class="bill-title">{{ localizeFilter('TopUpBill') }}</h1>

    <div class="input-field field">
      <select ref="select1" v-model="v$.billSelect.$model">
        <option value="" disabled selected>{{ localizeFilter('SelectBill') }}</option>
        <option
          v-for="bill of bills"
          :key="bill.id"
          :value="bill.id"
        >
          {{ bill.titleBill }}
        </option>
      </select>
      <span
        class="helper-text invalid error-text"
        v-if="v$.billSelect.$errors.length"
      >
        {{ localizeFilter('SelectBill') }}
      </span>
    </div>

    <div class="input-field field">
      <select ref="select2" v-model="categorySelect">
        <option
          v-for="category of categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.titleCategory }}
        </option>
      </select>
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
      <span class="helper-text invalid error-text" v-if="v$.amountField.$dirty && v$.amountField.$errors.length">{{ localizeFilter('TopUpBillMessage') }}</span>
    </div>

    <button
      class="btn waves-effect waves-light"
      type="submit"
      :class="{'modal-close': (v$.billSelect.$dirty && !v$.billSelect.$errors.length && v$.amountField.$dirty && !v$.amountField.$errors.length)}"
    >
      {{ localizeFilter('TopUp') }}
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
      },

      categories: {
        required: true,
        type: Array,
      },

      categorySelect: {},
    },

    setup () {
      return { v$: useVuelidate() }
    },

    data () {
      return {
        selectOne: null,
        selectTwo: null,

        amountField: '',

        amount: '',
        billSelect: '',
        titleBill: '',
        titleCategory: '',
      }
    },

    validations () {
      return {
        amountField: { required, minValue: minValue(0.01) },
        billSelect: { customValid: (value) => value !== '' },
      }
    },

    methods: {
      async submitHandler() {
        if (this.v$.$invalid) {
          this.v$.$touch()
          return
        }

        for(var bill of this.bills) {
          if(bill.id === this.billSelect) {
            this.titleBill = bill.titleBill
            this.amount = (Number(bill.amount) + Number(this.amountField)).toFixed(2)
          }
        }

        const formDataBill = {
          amount: Number(this.amount),
          titleBill: this.titleBill,
          idBill: this.billSelect,
        }

        const formData = {
          amount: Number(this.amountField),
          idBill: this.billSelect,
          idCategory: this.categorySelect,
          titleBill: this.titleBill,
          key: true,
          date: new Date().toJSON(),
        }

        try {
          await this.$store.dispatch('updateBills', formDataBill)
          this.$emit('updatedAmount', formDataBill)

          await this.$store.dispatch('createRecord', {formData, directory: 'income'})

          this.$message('Счет пополнен!')
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
