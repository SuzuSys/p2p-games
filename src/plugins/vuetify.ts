/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com
 */

import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export type ColorType = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'background' | 'surface'

type Colors = Record<ColorType, string>

const themes: Record<string, { colors: Colors }> = {
  light: {
    colors: {
      primary: '#1867C0',
      secondary: '#5CBBF6',
      success: '#4CAF50',
      info: '#2196F3',
      warning: '#FB8C00',
      error: '#FF5252',
      background: '#FFFFFF',
      surface: '#FFFFFF',
    },
  },
  dark: {
    colors: {
      primary: '#2196F3',
      secondary: '#5CBBF6',
      success: '#4CAF50',
      info: '#2196F3',
      warning: '#FB8C00',
      error: '#FF5252',
      background: '#121212',
      surface: '#1E1E1E',
    },
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'system',
    themes,
  },
  display: {
    mobileBreakpoint: 'md',
    thresholds: {
      xs: 0,
      sm: 600,
      md: 840,
      lg: 1145,
      xl: 1545,
      xxl: 2138,
    },
  },
})
