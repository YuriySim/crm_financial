//Mixin responsible for text localization

import ru from '@/locales/ru.json'
import en from '@/locales/en.json'

const locales = {
  'ru-RU': ru,
  'en-US': en,
}

export default {
  methods: {
    localizeFilter(key) {
      const locale = this.localeInfo || 'ru-RU'
      return locales[locale][key] || `[Localize error]: key ${key} not found.`
    },

    localizeFilterLogAndRegis(key, locale) {
      return locales[locale][key] || `[Localize error]: key ${key} not found.`
    },
  },

  computed: {
    localeInfo() {
      return this.$store.getters.info.locale
    },
  },
}
