<template>
  <form class="form form-custom" @submit.prevent="submitHandler">
    <div class="input-field">
      <select
        ref="select1"
        v-model="v$.billSelect.$model"
      >

        <option value="" disabled selected>
          {{ localizeFilter('SelectBillDebited') }}
        </option>

        <option
          v-for="bill of bills"
          :key="bill.id"
          :value="bill.id"
        >
          {{ bill.titleBill }} ({{ bill.amount }} ₽)
        </option>
      </select>

      <span
        class="helper-text error-text"
        v-if="v$.billSelect.$dirty && v$.billSelect.$errors.length"
      >
        {{ localizeFilter('SelectBillDebited') }}
      </span>

      <span
        class="helper-text error-text"
        v-else-if="messageKey"
      >
        {{ localizeFilter('NotEnoughMessage') }}
      </span>
    </div>

    <div class="input-field" >
      <select
        ref="select2"
        v-model="v$.categorySelect.$model"
      >
        <option value="" disabled selected>
          {{ localizeFilter('SelectCategory') }}
        </option>

        <option
          v-for="category of categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.titleCategory }}
        </option>
      </select>

      <span
        class="helper-text error-text"
        v-if="v$.billSelect.$dirty && v$.billSelect.$errors.length"
      >
        {{ localizeFilter('SelectCategory') }}
      </span>
    </div>

    <div class="input-field">
      <input
        autocomplete="off"
        id="amount"
        type="number"
        step="0.01"
        v-model="v$.amountField.$model"
        :class="{invalid: v$.amountField.$dirty && v$.amountField.$errors.length}"
      >
      <label for="amount">{{ localizeFilter('Amount') }}</label>
      <span class="helper-text error-text" v-if="v$.amountField.$dirty && v$.amountField.$errors.length">{{ localizeFilter('ExpensesMessage') }}</span>
    </div>

    <div class="input-field">
      <input
        autocomplete = "off"
        id = "description"
        type = "text"
        v-model="descriptionField"
      >
      <label for="description">{{ localizeFilter('Description') }}</label>
    </div>

    <button class="btn waves-effect waves-light" type="submit">
      {{ localizeFilter('Create') }}
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
    },

    setup () {
      return { v$: useVuelidate() }
    },

    data () {
      return {
        selectOne: null,
        selectTwo: null,

        billSelect: '',
        categorySelect: '',
        amountField: '',
        descriptionField: '',

        titleBill: '',
        amountBill: '',
        titleCategory: '',

        messageKey: false,
      }
    },

    validations () {
      return {
        billSelect: { customValid: (value) => value !== '' },
        categorySelect: { customValid: (value) => value !== '' },
        amountField: { required, minValue: minValue(0.01) },
      }
    },

    methods: {
      async submitHandler() {
        if (this.v$.$invalid) {
          this.v$.$touch()
          return
        }

        for (var bill of this.bills) {
          if (bill.id === this.billSelect) {
            if (bill.amount < this.amountField) {
              this.messageKey = true
              return
            } else {
              this.titleBill = bill.titleBill
              this.amountBill = (Number(bill.amount) - Number(this.amountField)).toFixed(2)
            }
          }
        }

        for(var category of this.categories) {
          if(category.id === this.categorySelect) {
            this.titleCategory = category.titleCategory
          }
        }

        const formDataBill = {
          amount: Number(this.amountBill),
          idBill: this.billSelect,
          titleBill: this.titleBill,
        }

        const formData = {
          amount: Number(this.amountField),
          idBill: this.billSelect,
          idCategory: this.categorySelect,
          titleBill: this.titleBill,
          description: this.descriptionField,
          key: false,
          date: new Date().toJSON(),
        }

        try {
          await this.$store.dispatch('updateBills', formDataBill)
          await this.$store.dispatch('createRecord', {formData, directory: 'outcome'})
          this.$emit('updatedBill', formDataBill)

          this.v$.$reset()

          this.$message('Запись выполнена!')

        }catch (error) {''}
      },
    },

    async mounted() {
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
