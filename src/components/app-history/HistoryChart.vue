<template>
  <div class="history-chart">
    <canvas ref="canvas" :key="categories" />
  </div>
</template>

<script>
  import chartColorGeneratorMixin from '@/mixins/chartColorGenerator.mixin'

  import { Pie } from 'vue3-chart-v2'

  export default {
    mixins: [chartColorGeneratorMixin],

    extends: Pie,

    props: {
      records: {
        required: true,
        type: Array,
      },

      categories: {
        required: true,
        type: Array,
      },
    },

    methods: {
      chart(categories, records) {
        if (this.$data.state.chartObj && this.$data.state.chartObj.destroy) {
          this.$data.state.chartObj.destroy()
        }

        this.color(this.categories)

        this.renderChart({
          labels: categories.map(c => c.titleCategory),

          datasets: [{
            data: categories.map(c => {
              return records.reduce((total, r) => {
                if (r.idCategory === c.id) {
                  total += +r.amount
                }
                return total
              }, 0)
            }),

            backgroundColor: this.backgroundColor,

            borderColor: this.borderColor,

            borderWidth: 1
          }]
        })
      },
    },

    mounted() {
      this.chart(this.categories, this.records)
    },
  }
</script>
