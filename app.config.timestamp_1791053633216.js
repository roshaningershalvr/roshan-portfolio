// app.config.ts
import { defineConfig } from "@tanstack/react-start/config";
var app_config_default = defineConfig({
  server: {
    preset: "vercel",
    prerender: {
      routes: ["/", "/wos"],
      crawlLinks: true
    }
  }
});
export {
  app_config_default as default
};
