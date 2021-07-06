<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">FinanceControl</span>

      <h6>{{ localizeFilterLogAndRegis('YourHome', locale) }}</h6>

      <div class="input-field">
        <input
        id="email"
        type="text"
        autocomplete="off"
        v-model.trim="v$.email.$model"
        :class="{invalid: v$.email.$dirty && v$.email.$errors.length}"
        >

        <label for="email">
          Email
        </label>

        <small
          class="helper-text error-text"
          v-if="v$.email.$dirty && v$.email.$errors.length"
        >
          {{ message_email }}
        </small>
      </div>

      <div class="input-field">
        <input
        id="password"
        type="password"
        autocomplete="off"
        v-model.trim="v$.password.$model"
        :class="{invalid: v$.password.$dirty && v$.password.$errors.length}"
        >

        <label for="password">
          {{ localizeFilterLogAndRegis('Password', locale) }}
        </label>

        <small class="helper-text error-text" v-if="v$.password.$dirty && v$.password.$errors.length">
          {{ message_password }}
        </small>
      </div>

      <div class="input-field">
        <input
        id="name"
        type="text"
        autocomplete="off"
        v-model="v$.name.$model"
        :class="{invalid: v$.name.$dirty && v$.name.$errors.length}"
        >

        <label for="name">
          {{ localizeFilterLogAndRegis('Name', locale) }}
        </label>

        <small
          class="helper-text error-text"
          v-if="v$.name.$dirty && v$.name.$errors.length"
        >
          {{ message_name }}
        </small>
      </div>

      <p>
        <label>
        <input type="checkbox" v-model="v$.agree.$model"/>

        <span>{{ localizeFilterLogAndRegis('AgreeRules', locale) }}</span>
        </label>
      </p>
    </div>

    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          {{ localizeFilterLogAndRegis('Register', locale) }}

          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center bottom-link">
        {{ localizeFilterLogAndRegis('HaveAccount', locale) }}

        <router-link
          v-if="locale == 'ru-RU'"
          to="/login?message=ru-RU"
          class="link-color"
        >
          {{ localizeFilterLogAndRegis('Enter!', locale) }}
        </router-link>

        <router-link
          v-if="locale == 'en-US'"
          to="/login?message=en-US"
          class="link-color"
        >
          {{ localizeFilterLogAndRegis('Enter!', locale) }}
        </router-link>
      </p>
    </div>
  </form>
</template>

<script>
  import useVuelidate from '@vuelidate/core'
  import { required, email, minLength } from '@vuelidate/validators'

  import localizeFilterMixin from '@/mixins/localizeFilter.mixin'
  import validationMessagesMixin from '@/mixins/validationMessages.mixin'

  import { useMeta } from 'vue-meta'

  export default {
    name: 'register',

    mixins: [
      validationMessagesMixin,
      localizeFilterMixin,
    ],

    setup () {
      useMeta({ title: 'Register' })
      return { v$: useVuelidate() }
    },

    data () {
      return {
        email: '',
        password: '',
        name: '',
        agree: false,

        locale: 'ru-RU',
        titleCategory: 'Без категории'
      }
    },

    validations () {
      return {
        email: { required, email },
        password: { required, minLength: minLength(6) },
        name: { required },
        agree: { customValid: (value) => value === true },
      }
    },

    mounted() {
      if (this.$route.query.message === 'ru-RU') {
        this.locale = 'ru-RU'
      }

      if (this.$route.query.message === 'en-US') {
        this.locale = 'en-US'
      }
    },

    methods: {
      async submitHandler() {
        if (this.v$.$invalid) {
          this.validationMessages()
          this.v$.$touch()
          return
        }

        const formData = {
          email: this.email,
          password: this.password,
          name: this.name,
        }

        if (this.locale === 'en-US') {
          this.titleCategory = "No category"
        }

        try{
          await this.$store.dispatch('register', formData)

          await this.$store.dispatch('createStartCategories', {
            titleCategory: this.titleCategory,
            directory: 'income'})

          await this.$store.dispatch('createStartCategories', {
            titleCategory: this.titleCategory,
            directory: 'outcome'})

          this.$router.push('/profile')
        } catch(error) {''}
      },
    },
  }
</script>
