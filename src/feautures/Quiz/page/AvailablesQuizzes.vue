<template>
    <div class="w-full relative flex flex-col items-center">
        <div class=" w-full p-2">
            <BreadCrumb :items="breadCumbs" />
        </div>
        <div class="w-11/12 flex flex-col gap-3">
            <CountrySearch :country="countrySearch"/>
            <QuizCard v-for="quiz in quizzes" :quiz="quiz" :key="quiz.id" />
            <div v-if="isLoading" class="text-center py-4 text-gray-500">
                Cargando más quizzes...
            </div>
            <div v-if="!hasNextPage && quizzes.length > 0" class="text-center py-4 text-gray-500">
                No hay más quizzes
            </div>
            
        </div>
            <GoToStart />
    </div>
</template>

<script setup lang="ts">

const countrySearch = ref("")
const breadCumbs = [
        { label: "Home", route: "/home", isHome: true },
        { label: "Quiz Studio", route: "/studio/quiz" },
    ];

import { ref, onMounted, onUnmounted } from 'vue';
import QuizCard from '../components/microcomponents/QuizCard.vue';
import GoToStart from '../components/microcomponents/GoToStart.vue';
import BreadCrumb from '@layouts/BreadCrumb.vue';
import CountrySearch from '@components/CountrySearch.vue';

interface Quiz {
    id: string;
    name: string;
    description: string;
    creator: string;
    numberOfQuestions: number;
}

const quizzes = ref<Quiz[]>([]);
const isLoading = ref(false);
const hasNextPage = ref(true);
const page = ref(1);
const limit = 10;

// Mostrar botón ir arriba
const showScrollTop = ref(false);

// Mock generator
const generateMockQuizzes = (page: number, limit: number) => {
    const start = (page - 1) * limit + 1;
    const end = start + limit - 1;
    const mocks: Quiz[] = [];
    for (let i = start; i <= end; i++) {
        mocks.push({
            id: `quiz-${i}`,
            name: `Quiz #${i}`,
            description: `Descripción del quiz número ${i}`,
            creator: `Usuario ${i}`,
            numberOfQuestions: Math.floor(Math.random() * 20) + 1,
        });
    }
    return mocks;
};

const fetchQuizzes = async () => {
    if (isLoading.value || !hasNextPage.value) return;
    isLoading.value = true;

    await new Promise((resolve) => setTimeout(resolve, 500));

    const newQuizzes = generateMockQuizzes(page.value, limit);
    quizzes.value.push(...newQuizzes);

    page.value++;
    hasNextPage.value = page.value <= 5;

    isLoading.value = false;
};

// Scroll infinito + mostrar botón
const onScroll = () => {
    const scrollable = document.documentElement;

    // Scroll infinito
    if (scrollable.scrollTop + window.innerHeight >= scrollable.scrollHeight - 100) {
        fetchQuizzes();
    }

    // Mostrar botón ir arriba si scrolleamos más de 300px
    showScrollTop.value = scrollable.scrollTop > 300;
};

onMounted(() => {
    fetchQuizzes();
    window.addEventListener('scroll', onScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
});


</script>
