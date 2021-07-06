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

        <small
          class="helper-text error-text"
          v-if="v$.password.$dirty && v$.password.$errors.length"
        >
          {{ message_password }}
        </small>
    </div>

    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          {{ localizeFilterLogAndRegis('Enter', locale) }}

          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center bottom-link">
        {{ localizeFilterLogAndRegis('DonHave', locale) }}

        <router-link
          v-if="locale == 'ru-RU'"
          to="/register?message=ru-RU"
          class="link-color"
        >
          {{ localizeFilterLogAndRegis('Register', locale) }}
        </router-link>

        <router-link
          v-if="locale == 'en-US'"
          to="/register?message=en-US"
          class="link-color"
        >
          {{ localizeFilterLogAndRegis('Register!', locale) }}
        </router-link>
      </p>
    </div>
  </form>
</template>

<script>

  import useVuelidate from '@vuelidate/core'
  import { required, email, minLength } from '@vuelidate/validators'
  import messages from '@/utils/messages'

  import validationMessagesMixin from '@/mixins/validationMessages.mixin'

  import localizeFilterMixin from '@/mixins/localizeFilter.mixin'

  import { useMeta } from 'vue-meta'

  export default {
    name: 'login',

    mixins: [
      validationMessagesMixin,
      localizeFilterMixin,
    ],

    setup () {
      useMeta({ title: 'Login' })
      return { v$: useVuelidate() }
    },

    data () {
      return {
        email: '',
        password: '',
        locale: 'ru-RU',
      }
    },

    validations () {
      return {
        email: { required, email },
        password: { required, minLength: minLength(6) },
      }
    },

    mounted() {
      if (messages[this.$route.query.message]) {
        this.$message(messages[this.$route.query.message])
      }

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
        }

        try {
          await this.$store.dispatch('login', formData)
          this.$router.push('/bill')
        }catch (error) {''}
      },
    },
  }
</script>
