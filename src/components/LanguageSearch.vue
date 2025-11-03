<template>
  <div class="w-full relative bg-white rounded-xl p-4 transition-all">
    <div ref="container" class="relative w-full">
      <FwbInput
        v-model="localLanguage"
        type="text"
        label="Filter by the language in which the content is written"
        placeholder="Ej: Spanish"
        @focus="showList = true"
        @input="showList = true"
        @keydown.esc="showList = false"
      >
        <template #suffix>
          <span class="pi pi-globe"></span>
        </template>
      </FwbInput>

      <ul
        v-if="showList && filteredLanguages.length"
        class="absolute z-50 w-full bg-white shadow-md border rounded-md mt-1 max-h-48 overflow-y-auto"
      >
        <li
          v-for="lang in filteredLanguages"
          :key="lang"
          class="px-3 py-2 cursor-pointer hover:bg-amber-100"
          @click="selectLanguage(lang)"
        >
          {{ lang }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { countries } from "@core/CountriesArray";
import { FwbInput } from "flowbite-vue";
import { ref, computed, watch, onMounted, onUnmounted } from "vue";

const props = defineProps<{ language: string }>();
const emit = defineEmits<{ (e: "update:language", value: string): void }>();

const localLanguage = ref(props.language);
const showList = ref(false);
const container = ref<HTMLElement | null>(null);

watch(localLanguage, (val) => emit("update:language", val));
watch(
  () => props.language,
  (val) => (localLanguage.value = val)
);

const uniqueLanguages = Array.from(
  new Set(countries.flatMap((c) => c.languages))
);

const filteredLanguages = computed(() => {
  const search = localLanguage.value?.toLowerCase() ?? "";
  return uniqueLanguages.filter((lang) => lang.toLowerCase().includes(search));
});

function selectLanguage(lang: string) {
  localLanguage.value = lang;
  showList.value = false;
}

function handleClickOutside(event: MouseEvent) {
  if (container.value && !container.value.contains(event.target as Node)) {
    showList.value = false;
  }
}

onMounted(() => document.addEventListener("click", handleClickOutside));
onUnmounted(() => document.removeEventListener("click", handleClickOutside));
</script>
