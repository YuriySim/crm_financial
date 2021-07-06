//Mixin generates colors for chart

export default {
  data() {
    return {
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
      ],

      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
    }
  },

  methods: {
    color(array) {
      const bc = this.backgroundColor.length

      if (array.length > bc) {
        for (var i = 0; i < array.length - bc; i++) {
          var genColor = [
            Math.floor(Math.random() * (255 - 200) + 200),
            Math.floor(Math.random() * (199 - 120) + 120),
            Math.floor(Math.random() * (119 - 20) + 20),
          ]

          var color =
            'rgba(' +
            genColor[Math.floor(Math.random() * 3)] +
            ', ' +
            genColor[Math.floor(Math.random() * 3)] +
            ', ' +
            genColor[Math.floor(Math.random() * 3)]

          var colorBackground = color + ', 0.6)'
          var colorBorder = color + ', 1)'

          this.backgroundColor.push(colorBackground)
          this.borderColor.push(colorBorder)
        }
      }
    },
  },
}
