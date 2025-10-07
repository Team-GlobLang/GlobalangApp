<template>
    <div class="bg-white shadow p-4 rounded-2xl flex flex-col justify-between h-full transition hover:shadow-lg">
        <div class="flex justify-between items-center mb-2">
            <h3 class="font-semibold text-lg">{{ quiz.name }}</h3>
            <FwbBadge :type="getBadgeType(quiz.isApproved)">
                {{ getApprovalText(quiz.isApproved) }}
            </FwbBadge>
        </div>
        <p class="text-gray-500 text-sm mb-4">{{ quiz.description }}</p>
        <div class=" flex justify-between items-end w-full">
            <div class="flex flex-col text-sm text-gray-700 mb-4">
                <span><strong>By:</strong> {{ quiz.creator }}</span>
                <span><strong>From:</strong> {{ quiz.country }}</span>
                <span><strong>Time limit:</strong> {{ quiz.configuration.timeLimit }}</span>
                <span><strong># Questions:</strong> {{ quiz.numberOfQuestions }}</span>
            </div>
            <FwbButton color="green" @click="onReviewQuiz">
                Review
            </FwbButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FwbBadge, FwbButton } from 'flowbite-vue';
import type { QuizData } from '../../types/quizTypes';

const props = defineProps<{ quiz: QuizData }>();
const emit = defineEmits<{ (e: 'review', quizId: string): void }>();

const onReviewQuiz = () => {
    emit('review', props.quiz.id);
};

const getBadgeType = (isApproved: boolean | null) => {
    if (isApproved === null) return "yellow"; // pending
    if (isApproved === false) return "red";   // rejected
    return "green";                            // approved
};

const getApprovalText = (isApproved: boolean | null) => {
    if (isApproved === null) return "Pending";
    if (isApproved === false) return "Rejected";
    return "Approved";
};
</script>
