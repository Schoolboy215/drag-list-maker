/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Composables
import { createVuetify } from 'vuetify'
// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'system',
    themes: {
      light: {
        colors: {
          primary: '#23AEFF',
          secondary: '#625B71',
          error: '#FF3A6F'
          // background, surface, error, info, success, warning...
        },
      },
      dark: {
        colors: {
          primary: '#87cef7',
          secondary: '#CCC2DC',
          error: '#FF82B6'
        },
      },
    },
  },
})
