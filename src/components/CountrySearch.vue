<template>
  <div class="w-full bg-white rounded-xl p-4 transition-all">
    <div ref="boxRef" class="relative w-full">
      <FwbInput
        v-model="localCountry"
        type="text"
        label="Search by country"
        placeholder="E.g.: Costa Rica"
        @focus="showList = true"
        @input="showList = true"
        @keydown.esc="showList = false"
      >
        <template #suffix>
          <span class="pi pi-home"></span>
        </template>
      </FwbInput>

      <ul
        v-if="showList && filteredCountries.length"
        class="absolute top-full left-0 right-0 z-50 w-full bg-white shadow-md border rounded-md mt-1 max-h-48 overflow-y-auto"
      >
        <li
          v-for="c in filteredCountries"
          :key="c.code"
          class="px-3 py-2 cursor-pointer hover:bg-amber-100"
          @mousedown.prevent="selectCountry(c.name)"
        >
          {{ c.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { countries } from '@core/CountriesArray';
import { FwbInput } from 'flowbite-vue';
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps<{ country: string }>();
const emit = defineEmits<{ (e: 'update:country', value: string): void }>();

const MAX_INITIAL = 5;

const localCountry = ref(props.country);
watch(() => props.country, v => { if (v !== localCountry.value) localCountry.value = v || '' })
watch(localCountry, val => emit('update:country', val));

const showList = ref(false)
const boxRef = ref<HTMLElement | null>(null)

const norm = (s: string) =>
  (s || '')
    .toLocaleLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')

const filteredCountries = computed(() => {
  const q = norm(localCountry.value)
  const list = q ? countries.filter(c => norm(c.name).includes(q)) : countries
  return list.slice(0, MAX_INITIAL)
})

function selectCountry(name: string) {
  localCountry.value = name
  showList.value = false
}

function handlePointerDown(e: PointerEvent) {
  const root = boxRef.value
  if (!root) return
  if (!root.contains(e.target as Node)) showList.value = false
}
onMounted(() => window.addEventListener('pointerdown', handlePointerDown, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('pointerdown', handlePointerDown))
 
</script>
