<template>
  <div class="w-full relative" ref="container">
    <FwbInput
      v-model="localCountry"
      type="text"
      label="Specify the country where the content can be used"
      placeholder="e.g., Costa Rica"
      :validation-status="error ? 'error' : undefined"
      @focus="showList = true"
    >
      <template #suffix>
        <span class="pi pi-home"></span>
      </template>
      <template #validationMessage>
        {{ error }}
      </template>
    </FwbInput>

    <ul
      v-if="showList && filteredCountries.length"
      class="absolute z-50 w-full bg-white shadow-md border rounded-md mt-1 max-h-48 overflow-y-auto"
      @mousedown.prevent
    >
      <li
        v-for="c in filteredCountries"
        :key="c.code"
        class="px-3 py-2 cursor-pointer hover:bg-amber-100"
        @click="selectCountry(c.name)"
      >
        {{ c.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { countries } from "@core/CountriesArray";
import { FwbInput } from "flowbite-vue";
import { ref, computed, watch, onMounted, onUnmounted } from "vue";

const props = defineProps<{ country: string; error?: string }>();
const emit = defineEmits<{ (e: "update:country", value: string): void }>();

const localCountry = ref(props.country);
const showList = ref(false);
const container = ref<HTMLElement | null>(null);
const error = ref(props.error);

watch(localCountry, (val) => emit("update:country", val));
watch(() => props.country, (val) => (localCountry.value = val));
watch(() => props.error, (val) => (error.value = val));

const filteredCountries = computed(() => {
  const search = localCountry.value?.toLowerCase() ?? "";
  return countries.filter((c) =>
    c.name.toLowerCase().includes(search)
  );
});

function selectCountry(name: string) {
  localCountry.value = name;
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
