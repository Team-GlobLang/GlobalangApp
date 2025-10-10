<template>
  <div>
    <FwbInput
      list="countries"
      v-model="country"
      type="text"
      :validation-status="countryError ? 'error' : undefined"
      @blur="handleBlur"
      label="Choose a country"
      placeholder="e.g., Costa Rica"
    >
      <template #suffix>
        <span class="pi pi-globe"></span>
      </template>
      <template #validationMessage>
        <span class="font-medium">{{ countryError }}</span>
      </template>
    </FwbInput>

    <datalist id="countries">
      <option
        v-for="name in filteredCountries"
        :key="name"
        :value="name"
      >
        {{ name }}
      </option>
    </datalist>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, onBeforeUnmount } from 'vue'
import { useField } from 'vee-validate'
import { FwbInput } from 'flowbite-vue'
import { countries } from '../../../Core/CountriesArray'

// ===== v-model:country =====
const props = defineProps<{
  country?: string
}>()

const emit = defineEmits<{
  (e: 'update:country', value: string): void
  (e: 'filterchange', value: string): void
}>()

const MAX_INITIAL = 10
const DEBOUNCE_MS = 400

const allCountryNames = computed(() => {
  const names = new Set<string>()
  countries.forEach(c => names.add(c.name))
  return Array.from(names).sort((a, b) => a.localeCompare(b))
})

// Inicia el campo con el valor del prop
const {
  value: country,
  errorMessage: countryError,
  handleBlur: countryBlur,
  // @ts-ignore: setValue existe en vee-validate
  setValue
} = useField<string>('country', undefined, { initialValue: props.country ?? '' })

// Si el prop cambia desde el padre, sincroniza el campo
watch(() => props.country, (v) => {
  if ((v ?? '') !== (country.value ?? '')) {
    setValue?.(v ?? '')
  }
})

// Lista filtrada
const filteredCountries = computed(() => {
  const q = (country.value || '').toLowerCase().trim()
  if (!q) return allCountryNames.value.slice(0, MAX_INITIAL)
  return allCountryNames.value.filter(name => name.toLowerCase().includes(q))
})

// Emisión: update inmediato para v-model, filterchange con debounce
let debounceId: number | undefined
let firstRun = true

watch(country, (newVal) => {
  const v = (newVal || '').trim()

  // Mantén sincronizado el v-model inmediatamente
  emit('update:country', v)

  // Primera emisión de filtro sin esperar
  if (firstRun) {
    firstRun = false
    emit('filterchange', v)
    return
  }

  // Debounce para cambios por tecleo
  if (debounceId) window.clearTimeout(debounceId)
  debounceId = window.setTimeout(() => {
    emit('filterchange', v)
  }, DEBOUNCE_MS)
})

// Blur: valida y emite filtro inmediato (sin debounce)
function handleBlur(e: FocusEvent) {
  countryBlur(e)
  if (debounceId) window.clearTimeout(debounceId)
  emit('filterchange', (country.value || '').trim())
}

onBeforeUnmount(() => {
  if (debounceId) window.clearTimeout(debounceId)
})
</script>

<style scoped></style>
