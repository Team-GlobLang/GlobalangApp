<template>
  <form>
    <FwbInput
      v-model="title"
      type="text"
      label="Titulo"
      placeholder="Palabra en el audio"
      :maxlength="TITLE_MAX"
      @blur="titleTouched = true"
      :validation-status="titleError ? 'error' : undefined"
    >
      <template #validationMessage>
        <span class="font-medium">{{ titleError }}</span>
      </template>
    </FwbInput>

    <FwbInput
      list="languages"
      v-model="language"
      type="text"
      :maxlength="LANGUAGE_MAX"
      :validation-status="languageError ? 'error' : undefined"
      label="Language"
      placeholder="Ej: Español"
      @blur="languageBlur"
    >
      <template #validationMessage>
        <span class="font-medium">{{ languageError }}</span>
      </template>
    </FwbInput>

    <datalist id="languages">
      <option
        v-for="item in filteredLanguages"
        :key="item.key"
        :value="item.language"
      >
        {{ item.language }} - {{ item.country }}
      </option>
    </datalist>

    <div>
      <label class="block mb-1 text-sm font-medium text-gray-700">
        Significado/Casos de uso
      </label>

      <textarea
        ref="meaningRef"
        v-model="meaning"
        rows="3"
        :maxlength="MEANING_MAX"
        @input="autoResize"
        class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2
               text-gray-900 placeholder-gray-400 shadow-sm
               focus:border-blue-500 focus:ring-2 focus:ring-blue-200
               resize-none overflow-hidden whitespace-pre-wrap"
        placeholder="Qué significa la frase en tu país"
        @blur="meaningTouched = true"
      ></textarea>

      <div class="flex items-center justify-between mt-1">
        <span class="text-xs text-red-500" v-if="meaningError">{{ meaningError }}</span>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { FwbInput } from 'flowbite-vue'
import { countries } from '../../../../Core/CountriesArray'

const props = withDefaults(defineProps<{
  modelValue?: { title?: string; language?: string; meaning?: string }
}>(), { modelValue: () => ({}) })

const emit = defineEmits<{ (e:'update:modelValue', v:{title:string;language:string;meaning:string}): void }>()

const TITLE_MAX = 60
const LANGUAGE_MAX = 50
const MEANING_MAX = 500

const title    = ref(props.modelValue.title    ?? '')
const language = ref(props.modelValue.language ?? '')
const meaning  = ref(props.modelValue.meaning  ?? '')

const titleTouched   = ref(false)
const languageTouched = ref(false)
const meaningTouched = ref(false)

const titleError = computed(() => {
  if (!titleTouched.value) return ''
  if (!title.value.trim()) return 'El título es requerido'
  if (title.value.length > TITLE_MAX) return `Máximo ${TITLE_MAX} caracteres`
  return ''
})

const norm = (s: string) =>
  s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

const languagePairs = computed(() => {
  const out: { language: string; country: string; key: string }[] = []
  for (const c of countries) {
    const langs: string[] = Array.isArray(c.languages) ? c.languages : []
    for (const raw of langs) {
      const lang = String(raw).trim()
      if (!lang || /^none$/i.test(lang)) continue
      out.push({
        language: lang,
        country: c.name,
        key: `${lang}::${c.code || c.name}`,
      })
    }
  }
  return out
})

const filteredLanguages = computed(() => {
  const q = norm(language.value || '')
  if (!q) return languagePairs.value.slice(0, 50)
  return languagePairs.value
    .filter(lp => norm(lp.language).includes(q) || norm(lp.country).includes(q))
    .slice(0, 50)
})

const languageError = computed(() => {
  if (!languageTouched.value) return ''
  if (!language.value) return 'El idioma es requerido'
  if (language.value.length > LANGUAGE_MAX) return `Máximo ${LANGUAGE_MAX} caracteres`
  const exists = languagePairs.value.some(
    lp => lp.language.toLowerCase() === language.value.toLowerCase()
  )
  return exists ? '' : 'Selecciona un idioma válido de la lista'
})
function languageBlur() { languageTouched.value = true }

const meaningRef = ref<HTMLTextAreaElement | null>(null)

const meaningError = computed(() => {
  if (!meaningTouched.value) return ''
  if (!meaning.value.trim()) return 'El significado es requerido'
  if (meaning.value.length > MEANING_MAX) return `Máximo ${MEANING_MAX} caracteres`
  return ''
})

function autoResize(e?: Event) {
  const el = (e?.target as HTMLTextAreaElement) ?? meaningRef.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
}

onMounted(() => nextTick(() => autoResize()))
watch(() => meaning.value, () => nextTick(() => autoResize()))

watch([title, language, meaning], () => {
  if (title.value.length   > TITLE_MAX)    title.value    = title.value.slice(0, TITLE_MAX)
  if (language.value.length> LANGUAGE_MAX) language.value = language.value.slice(0, LANGUAGE_MAX)
  if (meaning.value.length > MEANING_MAX)  meaning.value  = meaning.value.slice(0, MEANING_MAX)

  emit('update:modelValue', {
    title: title.value,
    language: language.value,
    meaning: meaning.value,
  })
})
</script>
