<template>
    <div class="bg-white shadow p-4 rounded-2xl flex flex-col justify-between h-full transition hover:shadow-lg">
        <div class="flex justify-between items-center mb-2">
            <h3 class="font-semibold text-lg">{{ quiz.name }}</h3>
            <FwbBadge :type="getBadgeType(quiz.isApproved)">
                {{ getApprovalText(quiz.isApproved) }}
            </FwbBadge>
        </div>
        <p class="text-gray-500 line-clamp-2 text-sm mb-4">{{ quiz.description }}</p>
        <div class=" flex justify-between items-end w-full">
            <div class="flex flex-col text-sm text-gray-700 mb-4">
                <span><strong>From:</strong> {{ quiz.country }}</span>
                <span><strong># Questions:</strong> {{ quiz.numberOfQuestions }}</span>
                <span><strong>Time limit:</strong> {{ formatTimeLimit(quiz.configuration.timeLimit) }}</span>
            </div>
            <div class=" flex gap-3">
                <FwbButton outline color="red" @click="onReviewQuiz">
                    Delete
                </FwbButton>
                <FwbButton color="green" @click="onReviewQuiz">
                    Review
                </FwbButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FwbBadge, FwbButton } from 'flowbite-vue';
import type { QuizData } from '../../types/quizTypes';

const props = defineProps<{ quiz: QuizData }>();
const emit = defineEmits<{ (e: 'review', quizId: string): void }>();

const onReviewQuiz = () => {
    console.log('Emit')
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

const formatTimeLimit = (time: string) => {
    if (!time) return "";
    const value = parseInt(time.slice(0, -1));
    const unit = time.slice(-1).toUpperCase();
    if (unit === "M") return `${value} minute${value > 1 ? "s" : ""}`;
    if (unit === "H") return `${value} hour${value > 1 ? "s" : ""}`;
    return time;
};
</script>
