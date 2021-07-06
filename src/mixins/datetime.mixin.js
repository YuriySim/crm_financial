//Mixin generates time, formats it and updates every second

//keytime is used to be able to use the mixin as a date/time format filter (without load on the system)

export default {
  data() {
    return {
      date: new Date(),
      interval: null,
      keytime: false,
    }
  },

  methods: {
    dateFilter(value, local = 'ru-RU', format = 'datetime') {
      const options = {}

      if (format.includes('date')) {
        options.day = '2-digit'
        options.month = 'long'
        options.year = 'numeric'
      }

      if (format.includes('time')) {
        options.hour = '2-digit'
        options.minute = '2-digit'
        options.second = '2-digit'
      }

      return new Intl.DateTimeFormat(local, options).format(new Date(value))
    },
  },

  mounted() {
    if (this.keytime) {
      this.interval = setInterval(() => {
        this.date = new Date()
      }, 1000)
    }
  },

  beforeUnmount() {
    clearInterval(this.interval)
  },
}
