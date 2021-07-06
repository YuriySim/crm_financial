<template>
  <div class="page-title">
    <h3>{{ localizeFilter('Profile') }}</h3>
  </div>

  <form class="form" @submit.prevent="submitHandler">
    <h3 class="title-bill">
      {{ localizeFilter('ChangeProfileName') }}
    </h3>

    <div class="input-field">
      <input
        id="name"
        type="text"
        autocomplete="off"
        v-model="name"
      >
      <label for="name">{{ localizeFilter('NewName') }}</label>
    </div>

    <h3 class="title-bill">
      {{ localizeFilter('AccountCurrency') }}
    </h3>

    <div class="input-currency" :class="{disabled: totalBill}">
      <p v-if="totalBill">
        {{ localizeFilter('AttentionAccountCurrency') }}
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="group1"
            type="radio"
            :checked="currencyInfo == 'RUB'"
            @click="currencyChose('RUB')"
          />
          <span>RUB</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="group1"
            type="radio"
            :checked="currencyInfo == 'USD'"
            @click="currencyChose('USD')"
          />
          <span>USD</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="group1"
            type="radio"
            :checked="currencyInfo == 'EUR'"
            @click="currencyChose('EUR')"
          />
          <span>EUR</span>
        </label>
      </p>
    </div>

    <h3 class="title-bill">{{ localizeFilter('Language') }}</h3>

    <div class="input-currency">
      <div class="switch switch-custom">
        <label>
          Русский
          <input type="checkbox" v-model="isRuLocale">
          <span class="lever"></span>
          English
        </label>
      </div>
    </div>

    <button class="btn waves-effect waves-light" type="submit">
      {{ localizeFilter('Refresh') }}
      <i class="material-icons right">send</i>
    </button>
  </form>
</template>

<script>
  import localizeFilterMixin from '@/mixins/localizeFilter.mixin'

  import { useMeta } from 'vue-meta'

  export default {
    name: 'profile',

    setup () {
      useMeta({ title: 'Profile' })
    },

    mixins: [localizeFilterMixin],

    data () {
      return {
        select: null,

        name: '',
        isRuLocale: '',
        currency: '',

        bills: [],
        totalBill: 0,
      }
    },

    methods: {
      async submitHandler() {
        try {
          const name = this.name || this.nameInfo
          const locale = this.isRuLocale ? 'en-US' : 'ru-RU'
          const currency = this.currency || this.currencyInfo

          if (name !== this.nameInfo ||
            locale !== this.localeInfo ||
            currency !== this.currencyInfo) {
            await this.$store.dispatch('updateInfo', {name, locale, currency})

            this.$message(this.localizeFilter('Message_profile'))
          }
        }catch (error) {''}
      },

      currencyChose(currency) {
        this.currency = currency
      },
    },

    async mounted() {
      this.bills = await this.$store.dispatch('fetchBills') || 0

      if (this.bills) {
        for (var bill of this.bills) {
          this.totalBill += Number(bill.amount)
        }
      }
    },

    computed: {
      nameInfo() {
        return this.$store.getters.info.name
      },

      localeInfo() {
        const locale = this.$store.getters.info.locale
        if (locale === 'ru-RU') {
          this.isRuLocale = false
        } else {
          this.isRuLocale = true
        }

        return locale
      },

      currencyInfo() {
        return this.$store.getters.info.currency
      },
    },
  }
</script>
