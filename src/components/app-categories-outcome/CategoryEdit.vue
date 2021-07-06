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
            class="helper-text invalid error-text"
            v-if="v$.categorySelect.$dirty && v$.categorySelect.$errors.length"
          >
            {{ localizeFilter('SelectCategory') }}
          </span>
        </div>

        <div class="input-field flat">
          <input
            autocomplete="off"
            type="text"
            id="name"
            v-model="v$.titleCategory.$model"
            :class="{invalid: v$.titleCategory.$dirty && v$.titleCategory.$errors.length}"
          >
          <label for="name" :class="{active: keyField}">
            {{ localizeFilter('NewTitle') }}
          </label>

          <span
            class="helper-text invalid error-text"
            v-if="v$.titleCategory.$dirty && v$.titleCategory.$errors.length"
          >
            {{ localizeFilter('CategoryNewTitleMessage') }}
          </span>
        </div>

        <div class="input-field">
          <input
            id = 'limit'
            type="number"
            v-model="v$.limitCategory.$model"
            :class="{invalid: v$.limitCategory.$dirty && v$.limitCategory.$errors.length}"
          >

          <label for="limit" :class="{active: keyField}">
            {{ localizeFilter('Limit') }}
          </label>

          <span
            class="helper-text invalid error-text"
            v-if="v$.limitCategory.$dirty && v$.limitCategory.$errors.length"
          >
            {{ localizeFilter('MinimumValue') }}
            {{ v$.limitCategory.minValue.$params.min }}
          </span>
        </div>

        <div class="btn-block">
          <button class="btn waves-effect waves-light" type="submit">
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
  import { required, minValue } from '@vuelidate/validators'

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
        keyField: false,
        select: null,

        categorySelect: '',
        titleCategory: '',
        limitCategory: '',
      }
    },

    validations () {
      return {
        categorySelect: { customValid: (value) => value !== '' },
        titleCategory: { required },
        limitCategory: { minValue: minValue(100) },
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
          directory: 'outcome',
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
                description: record.description,
                key: false,
                date: record.date,
              }

              await this.$store.dispatch('updateRecord', {formDataRec, idRecord: record.id, directory: 'outcome'})
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
          limitCategory: this.limitCategory,
          idCategory: this.categorySelect,
          directory: 'outcome',
        }

        try {
          await this.$store.dispatch('updateCategory', formDataTwo)
          this.$emit('updateCategory', formDataTwo)

          this.v$.$reset()

          this.$message('Категория успешно обновлена')

        }catch (error) {''}
      },
    },

    watch: {
      categorySelect() {
        const {titleCategory, limitCategory} = this.categories.find(c => c.id === this.categorySelect)
        this.titleCategory = titleCategory
        this.limitCategory = limitCategory
        this.keyField = true
      }
    },

    mounted() {
      this.select = M.FormSelect.init(this.$refs.select)

      M.updateTextFields()
    },

    beforeUnmount() {
      if (this.select && this.select.destroy) {
        this.select.destroy()
      }
    },
  }
</script>

