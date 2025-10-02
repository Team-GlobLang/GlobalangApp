<template>
  <form>
  
    <FwbInput
      v-model="text"
      type="text"
      label="Leva text (title)"
      placeholder="Phrase or word you heard"
      :maxlength="TITLE_MAX"
      @blur="textTouched = true"
      :validation-status="textError ? 'error' : undefined"
    >
      <template #validationMessage>
        <span class="font-medium">{{ textError }}</span>
      </template>
    </FwbInput>

    
    <FwbInput  list="countries" v-model="country" type="text" label="Country (origin)" placeholder="e.g., Costa Rica"
      :maxlength="COUNTRY_MAX" @blur="onCountryBlur" :validation-status="countryError ? 'error' : undefined"
      class="mt-3"
    >
      <template #validationMessage>
        <span class="font-medium">{{ countryError }}</span>
      </template>
    </FwbInput>

    <datalist id="countries">
            <option v-for="countryItem in filteredCountries" :key="countryItem.code" :value="countryItem.name">
                {{ countryItem.name }}
            </option>
    </datalist>

   
    <div class="mt-3">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Description (meaning)
      </label>

      <textarea
        ref="taRef"
        v-model="description"
        rows="3"
        class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2
               text-gray-900 placeholder-gray-400 shadow-sm
               focus:border-blue-500 focus:ring-2 focus:ring-blue-200
               resize-none overflow-hidden whitespace-pre-wrap"
        :maxlength="DESC_MAX"
        placeholder="What does the phrase mean?"
        @blur="descriptionTouched = true"
        @input="autoResize"
      ></textarea>

      <div class="flex items-center justify-between mt-1">
        <span class="text-xs text-red-500" v-if="descriptionError">{{ descriptionError }}</span>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { FwbInput } from 'flowbite-vue'
import { countries } from '../../../../Core/CountriesArray'

type FormValue = { text?: string; country?: string; description?: string }

const props = withDefaults(defineProps<{ modelValue?: FormValue }>(), {
  modelValue: () => ({})
})
const emit = defineEmits<{ (e:'update:modelValue', v: Required<FormValue>): void }>()


const TITLE_MAX = 80
const COUNTRY_MAX = 50
const DESC_MAX = 300


const text = ref(props.modelValue.text ?? '')
const country = ref(props.modelValue.country ?? '')
const description = ref(props.modelValue.description ?? '')


const textTouched = ref(false)
const countryTouched = ref(false)
const descriptionTouched = ref(false)

const norm = (s: string) =>
  s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()


type CountryItem = { name: string; code: string; key: string }
const countryItems = computed<CountryItem[]>(() => {
  return (countries ?? []).map((c: any) => {
    const name = String(c.name ?? '').trim()
    const code = String(c.code ?? '').trim()
    return { name, code, key: `${name}::${code || name}` }
  }).filter(c => c.name)
})


const filteredCountries = computed<CountryItem[]>(() => {
  const q = norm(country.value || '')
  if (!q) return countryItems.value.slice(0, 50)
  return countryItems.value
    .filter(ci => norm(ci.name).includes(q) || norm(ci.code).includes(q))
    .slice(0, 50)
})


const textError = computed(() => {
  if (!textTouched.value) return ''
  if (!text.value.trim()) return 'Required'
  if (text.value.length > TITLE_MAX) return `Max ${TITLE_MAX} characters`
  return ''
})

const countryError = computed(() => {
  if (!countryTouched.value) return ''
  const val = country.value.trim()
  if (!val) return 'Required'
  if (val.length > COUNTRY_MAX) return `Max ${COUNTRY_MAX} characters`
  const exists = countryItems.value.some(ci => ci.name.toLowerCase() === val.toLowerCase())
  return exists ? '' : 'Choose a valid country from the list'
})
function onCountryBlur() { countryTouched.value = true }

const descriptionError = computed(() => {
  if (!descriptionTouched.value) return ''
  if (!description.value.trim()) return 'Required'
  if (description.value.length > DESC_MAX) return `Max ${DESC_MAX} characters`
  return ''
})


const taRef = ref<HTMLTextAreaElement | null>(null)
function autoResize(e?: Event) {
  const el = (e?.target as HTMLTextAreaElement) ?? taRef.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight}px`
}
onMounted(() => nextTick(autoResize))
watch(() => description.value, () => nextTick(autoResize))


watch([text, country, description], () => {
  if (text.value.length > TITLE_MAX) text.value = text.value.slice(0, TITLE_MAX)
  if (country.value.length > COUNTRY_MAX) country.value = country.value.slice(0, COUNTRY_MAX)
  if (description.value.length > DESC_MAX) description.value = description.value.slice(0, DESC_MAX)

  emit('update:modelValue', {
    text: text.value,
    country: country.value,
    description: description.value
  })
})
</script>
