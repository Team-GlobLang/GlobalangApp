<template>
    <div class="w-full relative flex flex-col items-center">

        <div class="w-full p-2">
            <BreadCrumb :items="breadCumbs" />
        </div>

        <div class="w-11/12 flex flex-col gap-3">

            <FwbInput v-model="search" placeholder="Search quizzes by name or topic…">
                <template #suffix>
                    <span class="pi pi-search"></span>
                </template>
            </FwbInput>

            <MyQuizCard v-for="quiz in quizzes" :quiz="quiz" :key="quiz.id" @attempt="attemptQuiz" />

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
import GoToStart from '../components/microcomponents/GoToStart.vue'
import type { QuizData } from '../types/quizTypes'
import { getMyQuizzes } from '../service/QuizService'
import type { PaginatedResponse } from 'src/feautures/shared/Interfaces/interfaces'
import { FwbInput } from 'flowbite-vue'
import MyQuizCard from '../components/microcomponents/MyQuizCard.vue'

const breadCumbs = [
    { label: 'Home', route: '/home', isHome: true },
    { label: 'Quiz Studio', route: '/studio/quiz' },
    { label: 'My Quizzes', route: '/studio/my-quiz' },
]

const search = ref('')
const showScrollTop = ref(false)

const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    refetch,
} = useInfiniteQuery<PaginatedResponse<QuizData>, Error>({
    queryKey: computed(() => ['quizzes', { country: search.value }]),
    queryFn: async ({ pageParam = 1 }) => {
        return await getMyQuizzes({
            page: pageParam,
            limit: 5,
            search: search.value,
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

watch(search, async () => {
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
