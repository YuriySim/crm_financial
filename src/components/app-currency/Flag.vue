<template>
  <img class='flagImage' :src=Src() />
</template>

<script>
  export default {
    props: {
      idx: {
        required: true,
      }
    },

    data () {
      return {
        countryCode: [
          'au', 'gb', 'hk', 'il', 'ca',
          'cn', 'kr', 'mx', 'nz', 'no',
          'pl', 'ru', 'sg', 'us', 'tr',
          'cz', 'se', 'ch', 'za', 'jp'
        ],
      }
    },

    methods: {
      Src() {
        const src = 'http://www.geonames.org/flags/x/' + this.countryCode[this.idx] + '.gif'

        return src
      }
    },

    mounted() {
      this.Src()
    }
  }
</script>
