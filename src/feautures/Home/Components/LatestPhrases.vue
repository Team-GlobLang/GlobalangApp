<template>
    <div class="w-full flex justify-center">
        <div v-if="isPending">
            <div class="animate-pulse p-4  rounded-md mb-4 bg-white">
                <div class="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div class="h-3 bg-gray-300 rounded w-1/2 mb-1"></div>
                <div class="h-20 bg-gray-300 rounded"></div>
            </div>
        </div>

        <div class=" bg-white shadow rounded-2xl w-full py-2" v-if="!isLoading && data && data.meta.total > 0">
            <span class="text-lg font-bold text-blue-600 flex items-center px-3">
                🎵 {{ props.country ? `Listen to Audios from ${props.country}` : 'Listen to some recent audios' }}
            </span>

            <ShortsCarrousel :data="data.data" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { getShorts } from '../../shared/services/service';
import ShortsCarrousel from './microcomponents/ShortsCarrousel.vue';
import { watch } from 'vue';

const props = defineProps<{
    country: string
}>();

const { isLoading, isPending, data, refetch } = useQuery({
    queryKey: ['shorts', { page: 1, limit: 4, approved: true, country: props.country }],
    queryFn: () => getShorts({ page: 1, limit: 4, approved: true, country: props.country }),
})


watch(() => props.country, (newCountry) => {
    if (newCountry) {
        refetch()
    }
})

</script>
