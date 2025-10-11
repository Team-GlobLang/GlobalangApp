<template>
  <section class="w-full">
    <div class="-mx-2 px-2">
      <div class="flex gap-4 overflow-x-auto overscroll-x-contain snap-x snap-mandatory pb-2 scrollbar-hidden">
        <div
          v-for="card in audios"
          :key="card.id"
          class="min-w-[18rem] snap-start shrink-0"
        >
          <ShortAudioCard
            :item="card"
            :selected="!!selectedMap[card.id]"
            @toggle-select="onToggleSelect"
          />
        </div>
      </div>
    </div>

    <p v-if="isPending && audios.length === 0" class="text-sm text-gray-500 mt-2">Loading…</p>
    <p v-else-if="error" class="text-sm text-rose-600 mt-2">{{ error }}</p>
    <p v-else-if="!isPending && audios.length === 0" class="text-sm text-gray-600 mt-2">No audios found.</p>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import type { FilterShorts, ShortAudio } from '../../Interfaces/file'
import ShortAudioCard from './ShortAudioCard.vue'
import { GetAllAudios } from '../../Services/shortService';

const props = withDefaults(defineProps<{
  country?: string
  pageSize?: number
  selectedIds?: string[]
}>(), {
  pageSize: 24, //El page size jamas puede ser tan grande ademas no concuerda el nombre limit y page por lo cual se hacen asignaciones ignesesarias
  selectedIds: () => [],
})

const emit = defineEmits<{
  (e: 'update:selectedIds', value: string[]): void
}>()

const audios = ref<ShortAudio[]>([])
const isPending = ref(false)
const error = ref<string | null>(null)

const selectedMap = reactive<Record<string, boolean>>({})

watch(() => props.selectedIds, (arr) => {
  const set = new Set(arr || [])
  for (const id of Object.keys(selectedMap)) delete selectedMap[id]
  for (const id of set) selectedMap[id] = true
}, { immediate: true })

function emitSelection() {
  const ids = Object.entries(selectedMap).filter(([, v]) => v).map(([k]) => k)
  emit('update:selectedIds', ids)
}

function onToggleSelect(payload: { id: string; selected: boolean }) {
  selectedMap[payload.id] = payload.selected
  emitSelection()
}

// cambiar luego por lo que hay en Copia

//Esto no es infinite scroll aqui llamas bajo un limite de 24 y hacer chunks para hacer una paginacion falsa
const FORCED_PARAM = 'approved'
const FORCED_VALUE = true  

async function fetchAll() {
  isPending.value = true
  error.value = null
  audios.value = []

  try {
    let page = 1
    const limit = props.pageSize
    const seen = new Set<string>()

    while (true) {
      const base: FilterShorts = { country: props.country || undefined, page, limit }
      const payload = (FORCED_VALUE === undefined)
        ? base
        : { ...base, [FORCED_PARAM]: FORCED_VALUE } as any

      const res = await GetAllAudios(payload)
      const list = Array.isArray(res) ? res : (res?.data ?? [])
      const chunk: ShortAudio[] = list.map((it: any) => ({
        id: it.id,
        text: it.text,
        description: it.description,
        country: it.country,
        fileUrl: it.fileUrl ?? it.url ?? it.audioUrl,
      }))

      for (const it of chunk) {
        if (!seen.has(it.id)) {
          seen.add(it.id)
          audios.value.push(it)
        }
      }

      const total = (res?.total ?? res?.meta?.total) as number | undefined
      if (typeof total === 'number' && audios.value.length >= total) break
      if (chunk.length < limit) break
      page += 1
    }
  } catch (e: any) {
    error.value = e?.message || 'Failed to fetch audios'
    audios.value = []
  } finally {
    isPending.value = false
  }
}

watch(() => props.country, fetchAll, { immediate: true })
</script>

<style scoped>
.scrollbar-hidden { scrollbar-width: none; }
.scrollbar-hidden::-webkit-scrollbar { display: none; }
</style>
