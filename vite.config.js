import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://world.openfoodfacts.org',
        changeOrigin: true,
        headers: {
          'User-Agent': 'FoodFactsPremium - Web - Version 1.0 - https://github.com/Saai-Prithiiv07/food-nutrition-app'
        }
      },
      '/cgi': {
        target: 'https://world.openfoodfacts.org',
        changeOrigin: true,
        headers: {
          'User-Agent': 'FoodFactsPremium - Web - Version 1.0 - https://github.com/Saai-Prithiiv07/food-nutrition-app'
        }
      }
    }
  }

})

