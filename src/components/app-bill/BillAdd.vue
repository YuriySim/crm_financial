<template>
  <form class="form" @submit.prevent="submitHandler">
    <h1 class="bill-title">{{ localizeFilter('AddBill') }}</h1>

    <div class="input-field">
      <input
        id="title"
        type="text"
        class="field"
        autocomplete="off"
        v-model="v$.titleBill.$model"
        :class="{invalid: v$.titleBill.$dirty && v$.titleBill.$errors.length}"
      >
      <label for="title">{{ localizeFilter('TitleBill') }}</label>
      <span
        class="helper-text invalid error-text"
        v-if="v$.titleBill.$dirty && v$.titleBill.$errors.length"
      >
        {{ localizeFilter('AddBillMessage') }}
      </span>
    </div>

    <button
      class="btn waves-effect waves-light"
      type="submit"
      :class="{'modal-close': (v$.titleBill.$dirty && !v$.titleBill.$errors.length)}"
    >
      {{ localizeFilter('Add') }}
      <i class="material-icons right">send</i>
    </button>
  </form>
</template>

<script>

  import useVuelidate from '@vuelidate/core'
  import { required } from '@vuelidate/validators'

  import localizeFilterMixin from '@/mixins/localizeFilter.mixin'

  export default {
    mixins: [localizeFilterMixin],

    setup () {
      return { v$: useVuelidate() }
    },

    data () {
      return {
        titleBill: '',
      }
    },

    validations () {
      return {
        titleBill: { required },
      }
    },

    methods: {
      async submitHandler() {
        if (this.v$.$invalid) {
          this.v$.$touch()
          return
        }

        const bill = {
          titleBill: this.titleBill,
          amount: 0
        }

        try {
          const newBill = await this.$store.dispatch('createBill', bill)
          this.titleBill = ''
          this.$emit('addBill', newBill)

          this.$message('Счет добавлен')

        }catch (error) {''}
      },
    },
  }
</script>

