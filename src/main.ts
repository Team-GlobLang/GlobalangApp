import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";
import axios from "axios";
import { VueQueryPlugin } from "@tanstack/vue-query";

const userLang = navigator.language || navigator.languages[0] || "en";
const langCode = userLang.split("-")[0]; //=> Agarra el lang ejemplo "es-ES" y lo transforma a es

async function setVeeValidateLocale(locale: string) {
  const parts = locale.split("-");
  const variants = [locale, parts[0], "en"];

  for (const code of variants) {
    try {
      const { data } = await axios.get(`/locales/${code}.json`);
      configure({
        generateMessage: localize(code, data),
      });
      return;
    } catch {
      const { data } = await axios.get(`/locales/en.json`);
      configure({
        generateMessage: localize("en", data),
      });
    }
  }
}

await setVeeValidateLocale(langCode);

createApp(App).use(router).use(VueQueryPlugin).mount("#app");
