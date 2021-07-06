<template>
  <form class="form" @submit.prevent="submitHandler">
    <h1 class="bill-title">{{ localizeFilter('EditBill') }}</h1>

    <div class="input-field field">
      <select
        ref="select"
        v-model="v$.billSelect.$model"
        >
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
        v-if="v$.billSelect.$dirty && v$.billSelect.$errors.length"
      >
        {{ localizeFilter('SelectBill') }}
      </span>
    </div>


    <div class="input-field">
      <input
        id="title"
        type="text"
        class="field"
        autocomplete="off"
        v-model="v$.title.$model"
        :class="{invalid: v$.title.$dirty && v$.title.$errors.length}"
      >

      <label for="title">{{ localizeFilter('NewTitleBill') }}</label>

      <span
        class="helper-text invalid error-text"
        v-if="v$.title.$dirty && v$.title.$errors.length"
      >
        {{ localizeFilter('AddBillMessage') }}
      </span>
    </div>

    <button
      class="btn waves-effect waves-light"
      type="submit"
      :class="{'modal-close': (v$.billSelect.$dirty && !v$.billSelect.$errors.length && v$.title.$dirty && !v$.title.$errors.length)}"
    >
      {{ localizeFilter('Edit') }}
      <i class="material-icons right">send</i>
    </button>
  </form>
</template>

<script>
  import M from 'materialize-css'

  import useVuelidate from '@vuelidate/core'
  import { required } from '@vuelidate/validators'

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

    data () {
      return {
        selectOne: null,

        amount: '',
        title: '',
        billSelect: '',
      }
    },

    validations () {
      return {
        title: { required },

        billSelect: {
          customValid: (value) => value !== '',
        },
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
            this.amount = Number(bill.amount)
          }
        }

        const formData = {
          amount: this.amount,
          titleBill: this.title,
          idBill: this.billSelect,
        }

        try {
          await this.$store.dispatch('updateBills', formData)
          this.$emit('editTitle', formData)

          this.$message('Счет изменен')

        }catch (error) {''}
      }
    },

    mounted() {
      this.selectOne = M.FormSelect.init(this.$refs.select)
    },

    beforeUnmount() {
      if(this.selectOne && this.selectOne.destroy) {
        this.selectOne.destroy()
      }
    },
  }
</script>
