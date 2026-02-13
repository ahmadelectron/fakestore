// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
///////////////////////////////////

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // این بخش به طور کامل هشدارهای مربوط به @import را خفه می‌کند
        quietDeps: true,
        logger: {
          warn: (message, options) => {
            // اگر پیام شامل کلمه import بود، آن را چاپ نکن
            if (options.deprecation && message.includes("import")) return;
            console.warn(message);
          },
        },
      },
    },
  },
});
