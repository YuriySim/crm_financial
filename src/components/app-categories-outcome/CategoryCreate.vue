<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ localizeFilter('Create') }}</h4>
      </div>

      <form class="form-cat" @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            autocomplete="off"
            id="name"
            type="text"
            v-model="v$.titleCategory.$model"
            :class="{invalid: v$.titleCategory.$dirty && v$.titleCategory.$errors.length}"
          >

          <label for="name">{{ localizeFilter('Title') }}</label>

          <span
            class="helper-text invalid error-text"
            v-if="v$.titleCategory.$dirty && v$.titleCategory.$errors.length"
          >
            {{ localizeFilter('CategoryTitleMessage') }}
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            class="autocomplete"
            v-model="v$.limitCategory.$model"
            :class="{invalid: v$.limitCategory.$dirty && v$.limitCategory.$errors.length}"
          >
          <label for="limit" class="active">
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

        <button class="btn waves-effect waves-light" type="submit">
          {{ localizeFilter('Create') }}
          <i class="material-icons right">send</i>
        </button>
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

    setup () {
      return { v$: useVuelidate() }
    },

    data () {
      return {
        titleCategory: '',
        limitCategory: 100,
      }
    },

    validations () {
      return {
        titleCategory: { required },
        limitCategory: { minValue: minValue(100) },
      }
    },

    methods: {
      async submitHandler() {
        if (this.v$.$invalid) {
          this.v$.$touch()
          return
        }

        const formData = {
          titleCategory: this.titleCategory,
          limitCategory: Number(this.limitCategory),
          directory: 'outcome',
        }

        try {
          const newCategory = await this.$store.dispatch('createCategory', formData)
          this.titleCategory = ''
          this.limitCategory = 100
          this.$emit('addCategory', newCategory)
          this.v$.$reset()

          this.$message('Категория добавлена')

        }catch (error) {''}
      },

      mounted() {
        M.updateTextFields()
      },

    },
  }
</script>

