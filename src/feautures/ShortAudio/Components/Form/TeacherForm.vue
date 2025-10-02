<template>
  <form class="space-y-4">
    <FwbInput
      list="languages"
      v-model="language"
      type="text"
      :maxlength="LANGUAGE_MAX"
      :validation-status="languageError ? 'error' : undefined"
      label="Language"
      placeholder="E.g.: Spanish"
      @blur="languageTouched = true"
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
        {{ item.language }} — {{ item.country }}
      </option>
    </datalist>

    <FwbInput
      list="levels"
      v-model="level"
      type="text"
      :maxlength="LEVEL_MAX"
      :validation-status="levelError ? 'error' : undefined"
      label="Level"
      placeholder="E.g.: B2 or Intermediate"
      @blur="levelTouched = true"
    >
      <template #validationMessage>
        <span class="font-medium">{{ levelError }}</span>
      </template>
    </FwbInput>

    <datalist id="levels">
      <option v-for="l in levelOptions" :key="l" :value="l">{{ l }}</option>
    </datalist>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { FwbInput } from 'flowbite-vue'
import { countries } from '../../../../Core/CountriesArray'

const props = withDefaults(defineProps<{
  modelValue?: { language?: string; level?: string }
}>(), { modelValue: () => ({}) })

const emit = defineEmits<{
  (e: 'update:modelValue', v: { language: string; level: string }): void
}>()

const LANGUAGE_MAX = 50
const LEVEL_MAX    = 20

const language = ref(props.modelValue.language ?? '')
const level    = ref(props.modelValue.level ?? '')

const languageTouched = ref(false)
const levelTouched    = ref(false)

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

const levelOptions = [
  'A1','A2','B1','B2','C1','C2',
  'Beginner','Elementary','Pre-Intermediate','Intermediate','Upper-Intermediate','Advanced',
  'Basic','Intermediate','Advanced'
] as const

const languageError = computed(() => {
  if (!languageTouched.value) return ''
  if (!language.value.trim()) return 'Language is required'
  if (language.value.length > LANGUAGE_MAX) return `Maximum ${LANGUAGE_MAX} characters`
  const exists = languagePairs.value.some(
    lp => lp.language.toLowerCase() === language.value.toLowerCase()
  )
  return exists ? '' : 'Select a valid language from the list'
})

const levelError = computed(() => {
  if (!levelTouched.value) return ''
  if (!level.value.trim()) return 'Level is required'
  if (level.value.length > LEVEL_MAX) return `Maximum ${LEVEL_MAX} characters`
  const ok = levelOptions.map(v => v.toLowerCase()).includes(level.value.toLowerCase())
  return ok ? '' : 'Use levels such as A1–C2 or (Basic/Intermediate/Advanced)'
})

watch([language, level], () => {
  if (language.value.length > LANGUAGE_MAX) language.value = language.value.slice(0, LANGUAGE_MAX)
  if (level.value.length > LEVEL_MAX) level.value = level.value.slice(0, LEVEL_MAX)

  emit('update:modelValue', {
    language: language.value,
    level: level.value,
  })
})
</script>

<style scoped>
</style>
