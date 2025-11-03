<template>
    <div class="w-full bg-white rounded-xl shadow-lg p-4 transition-all md:max-w-md md:mx-auto xl:max-w-lg">
         <div ref="boxRef" class="relative w-full">
      <FwbInput
        v-model="local"
        type="text"
        label="Discover local sayings and expressions—choose a country to start exploring!"
        placeholder="E.g.: Costa Rica"
        :validation-status="error ? 'error' : undefined"
        @focus="show = true"
        @input="show = true"
        @keydown.esc="show = false"
      >
        <template #suffix>
          <span class="pi pi-home"></span>
        </template>
        <template #validationMessage>
          <span class="font-medium">{{ error }}</span>
        </template>
      </FwbInput>

      <ul
        v-if="show && filtered.length"
        class="absolute top-full left-0 right-0 z-50 w-full bg-white shadow-md border rounded-md mt-1 max-h-48 overflow-y-auto"
      >
        <li
          v-for="c in filtered"
          :key="c.code"
          class="px-3 py-2 cursor-pointer hover:bg-amber-100"
          @mousedown.prevent="select(c.name)"
        >
          {{ c.name }}
        </li>
      </ul>
    </div>
    </div>
</template>

<script setup lang="ts">
import { FwbInput } from 'flowbite-vue';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { countries } from '../../../../Core/CountriesArray';

const props = defineProps<{ country: string }>();
const emit = defineEmits<{ (e: 'update:country', value: string): void }>();
const local = ref(props.country ?? '')
watch(() => props.country, v => { if (v !== local.value) local.value = v || '' })
watch(local, v => emit('update:country', v))

const show = ref(false)
const error = ref<string>('')

const normalized = (s: string) =>
  (s || '')
    .toLocaleLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')

const filtered = computed(() => {
  const q = normalized(local.value)
  const list = q ? countries.filter(c => normalized(c.name).includes(q)) : countries
  return list.slice(0, 20)
})

function select(name: string) {
  local.value = name
  show.value = false
}

const boxRef = ref<HTMLElement | null>(null)
function handlePointerDown(e: PointerEvent) {
  const root = boxRef.value
  if (!root) return
  if (!root.contains(e.target as Node)) show.value = false
}
onMounted(() => window.addEventListener('pointerdown', handlePointerDown, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('pointerdown', handlePointerDown))
</script>