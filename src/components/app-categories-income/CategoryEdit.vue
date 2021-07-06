<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ localizeFilter('Edit') }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field" >
          <select ref="select" v-model="v$.categorySelect.$model">
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
            v-if="v$.categorySelect.$dirty && v$.categorySelect.$errors.length"
          >
            {{ localizeFilter('SelectCategory') }}
          </span>
        </div>

        <div class="input-field">
          <input
            autocomplete="off"
            type="text"
            id="name"
            v-model="v$.titleCategory.$model"
            :class="{invalid: v$.titleCategory.$dirty && v$.titleCategory.$errors.length}"
          >
          <label for="name">
            {{ localizeFilter('NewTitle') }}
          </label>

          <span
            class="helper-text error-text"
            v-if="v$.titleCategory.$dirty && v$.titleCategory.$errors.length"
          >
            {{ localizeFilter('CategoryNewTitleMessage') }}
          </span>
        </div>

        <div class="btn-block">
          <button
            class="btn waves-effect waves-light"
            type="submit"
          >
            {{ localizeFilter('Refresh') }}
            <i class="material-icons right">send</i>
          </button>

          <button
            class="btn waves-effect waves-light btn-delete"
            type="button"
            @click="removeCategory"
          >
            {{ localizeFilter('Delete') }}
            <i class="material-icons right">delete</i>
          </button>
        </div>

        <h6>{{ localizeFilter('Attention') }}</h6>
      </form>
    </div>
  </div>
</template>

<script>
  import M from 'materialize-css'

  import useVuelidate from '@vuelidate/core'
  import { required } from '@vuelidate/validators'

  import localizeFilterMixin from '@/mixins/localizeFilter.mixin'

  export default {
    mixins: [localizeFilterMixin],

    props: {
      categories: {
        required: true,
        type: Array,
      },

      records: {
        required: true,
        type: Array,
      },

      uncategorizedId: {
        required: true,
      }
    },

    setup () {
      return { v$: useVuelidate() }
    },

    data () {
      return {
        select: null,
        categorySelect: '',
        titleCategory: '',
      }
    },

    validations () {
      return {
        categorySelect: { customValid: (value) => value !== '' },
        titleCategory: { required },
      }
    },

    methods: {
      async removeCategory() {
        if (this.v$.categorySelect.$invalid) {
          this.v$.categorySelect.$touch()
          return
        }

        const formDataOne = {
          idCategory: this.categorySelect,
          directory: 'income',
        }

        try {
          await this.$store.dispatch('removeCategory', formDataOne)
          this.$emit('removeCategory', formDataOne)
          this.v$.$reset()

          /*Moving records to the "Uncategorized" category*/
          for (var record of this.records) {
            if (record.idCategory === this.categorySelect) {
              const formDataRec = {
                amount: Number(record.amount),
                idBill: record.idBill,
                idCategory: this.uncategorizedId,
                titleBill: record.titleBill,
                key: true,
                date: record.date,
              }

              await this.$store.dispatch('updateRecord', {formDataRec, idRecord: record.id, directory: 'income'})
            }
          }

          this.$message('Категория удалена')

        }catch (error) {''}
      },

      async submitHandler() {
        if (this.v$.$invalid) {
          this.v$.$touch()
          return
        }

        const formDataTwo = {
          titleCategory: this.titleCategory,
          limitCategory: 0,
          idCategory: this.categorySelect,
          directory: 'income',
        }

        try {
          await this.$store.dispatch('updateCategory', formDataTwo)
          this.titleCategory = ''
          this.$emit('updateCategory', formDataTwo)
          this.v$.$reset()

          this.$message('Категория успешно обновлена')

        }catch (error) {''}
      },
    },

    mounted() {
      this.select = M.FormSelect.init(this.$refs.select)
    },

    beforeUnmount() {
      if (this.select && this.select.destroy) {
        this.select.destroy()
      }
    },
  }
</script>
