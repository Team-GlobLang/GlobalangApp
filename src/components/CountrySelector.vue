<template>
  <FwbInput
    v-model="localCountry"
    list="countries"
    type="text"
    label="Search by country"
    placeholder="E.g.: Costa Rica"
  >
    <template #suffix>
      <span class="pi pi-home"></span>
    </template>
  </FwbInput>

  <datalist id="countries">
    <option
      v-for="countryItem in filteredCountries"
      :key="countryItem.code"
      :value="countryItem.name"
    >
      {{ countryItem.name }}
    </option>
  </datalist>
</template>

<script setup lang="ts">
import { countries } from "@core/CountriesArray";
import { FwbInput } from "flowbite-vue";
import { ref, computed, watch } from "vue";

const props = defineProps<{ country: string }>();
const emit = defineEmits<{ (e: "update:country", value: string): void }>();

const MAX_INITIAL = 10;

const localCountry = ref(props.country);

watch(localCountry, (val) => emit("update:country", val));

const filteredCountries = computed(() => {
  if (!localCountry.value) {
    return countries.slice(0, MAX_INITIAL);
  }

  return countries
    .filter((c) =>
      c.name.toLowerCase().includes(localCountry.value.toLowerCase())
    )
    .slice(0, MAX_INITIAL);
});
</script>
