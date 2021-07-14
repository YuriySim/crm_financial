<template>
  <form class="form" @submit.prevent="submitHandler">
    <h1 class="bill-title">{{ localizeFilter('DeleteBill') }}</h1>

    <div class="input-field field">
      <select
        ref="select"
        v-model="v$.billSelect.$model"
        @change="keySubmit"
        >
        <option value="" disabled selected>{{ localizeFilter('SelectBill') }}</option>
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
        v-if="v$.billSelect.$dirty && v$.billSelect.$errors.length"
      >
        {{ localizeFilter('SelectBill') }}
      </span>
    </div>


    <h2 class="bill-text-remove" v-if="!keyMessage">
      {{ localizeFilter('DeleteMessage') }}
    </h2>

    <button
      class="btn waves-effect waves-light"
      type="submit"
      :class="{'modal-close': (v$.billSelect.$dirty && !v$.billSelect.$errors.length && keyMessage)}"
    >
      {{ localizeFilter('Delete') }}
      <i class="material-icons right">delete</i>
    </button>
  </form>
</template>

<script>

  import useVuelidate from '@vuelidate/core'

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
        billSelect: '',
        key: false,
        keyMessage: false,
      }
    },

    validations () {
      return {
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

        for (var bill of this.bills) {
          if (bill.id === this.billSelect && bill.amount !== 0) {
            return
          }
        }

        const idBill = this.billSelect

        try {
          await this.$store.dispatch('removeBills', idBill)
          this.$emit('removeBills', idBill)

          this.$message(this.localizeFilter('BillDeleted'))

        }catch (error) {''}
      },

      keySubmit() {
        for (var bill of this.bills) {
          if (bill.id === this.billSelect && bill.amount === 0) {
            this.keyMessage = true
          }else this.keyMessage = false
        }
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
