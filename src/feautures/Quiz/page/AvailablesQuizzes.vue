<template>
    <div class="w-full relative flex flex-col items-center">

        <div class="w-full p-2">
            <BreadCrumb :items="breadCumbs" />
        </div>

        <div class="w-11/12 flex flex-col gap-3">

            <CountrySearch v-model:country="country" />

            <QuizCard v-for="quiz in quizzes" :quiz="quiz" :key="quiz.id" @attempt="attemptQuiz" />

            <div v-if="isPending || isFetchingNextPage" class="text-center py-4 text-gray-500">
                Loading more...
            </div>

            <div v-if="!hasNextPage && quizzes.length > 0" class="text-center py-4 text-gray-500">
                No more quizzes
            </div>
        </div>

        <GoToStart v-show="showScrollTop" @click="scrollToTop" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useInfiniteQuery } from '@tanstack/vue-query'
import BreadCrumb from '@layouts/BreadCrumb.vue'
import CountrySearch from '@components/CountrySearch.vue'
import QuizCard from '../components/microcomponents/QuizCard.vue'
import GoToStart from '../components/microcomponents/GoToStart.vue'
import type { QuizData } from '../types/quizTypes'
import { getQuizzes } from '../service/QuizService'
import type { PaginatedResponse } from 'src/feautures/shared/Interfaces/interfaces'

const breadCumbs = [
    { label: 'Home', route: '/home', isHome: true },
    { label: 'Available Quizzes', route: '/quiz/availables' },
]

const country = ref('')
const showScrollTop = ref(false)

const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    refetch,
} = useInfiniteQuery<PaginatedResponse<QuizData>, Error>({
    queryKey: computed(() => ['quizzes', { country: country.value }]),
    queryFn: async ({ pageParam = 1 }) => {
        return await getQuizzes({
            page: pageParam,
            limit: 5,
            isApproved: null,
            country: country.value,
        })
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
        return lastPage.meta.hasNextPage ? allPages.length + 1 : undefined
    },
    getPreviousPageParam: (firstPage, allPages) => {
        return firstPage.meta.hasPrevPage ? allPages.length - 1 : undefined
    },
})

const quizzes = computed(() =>
    data.value?.pages.flatMap((page) => page.data) ?? []
)

const onScroll = async () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement

    showScrollTop.value = scrollTop > 300

    if (scrollTop + clientHeight >= scrollHeight - 150 && hasNextPage.value && !isFetchingNextPage.value) {
        await fetchNextPage()
    }
}

watch(country, async () => {
    await refetch() 
})

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
    window.addEventListener('scroll', onScroll)
})
onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
})

const attemptQuiz = (id: string) => {
    console.log('Attempt quiz with id:', id)
}
</script>
