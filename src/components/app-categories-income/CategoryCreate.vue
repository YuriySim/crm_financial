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
            class="helper-text error-text"
            v-if="v$.titleCategory.$dirty && v$.titleCategory.$errors.length"
          >
            {{ localizeFilter('CategoryTitleMessage') }}
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
        titleCategory: '',
      }
    },

    validations () {
      return {
        titleCategory: { required },
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
          limitCategory: 0,
          directory: 'income',
        }

        try {
          const newCategory = await this.$store.dispatch('createCategory', {...formData})
          this.titleCategory = ''
          this.$emit('addCategory', newCategory)
          this.v$.$reset()

          this.$message('Категория добавлена')

        }catch (error) {''}
      },
    },
  }
</script>

