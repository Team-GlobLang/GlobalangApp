<template>
    <div class="review-quiz">
        <h2>Quiz Preview</h2>
        <div>
            <h3>Configuration</h3>
            <p>Name: {{ props.quiz.name }}</p>
            <p>Description: {{ props.quiz.description }}</p>
            <p>Time Limit: {{ props.quiz.configuration.timeLimit }}</p>
            <p>Shuffle Questions: {{ props.quiz.configuration.shuffleQuestions }}</p>
        </div>

        <div v-for="(q, index) in props.questions" :key="index">
            <h4>Question #{{ index + 1 }}</h4>
            <p>{{ q.questionText }}</p>
            <p>Type: {{ q.questionType }}</p>
            <p>Explanation: {{ q.explanation }}</p>

            <div v-if="q.file">
                <audio v-if="q.file" :src="getFileUrl(q.file)" controls></audio>
            </div>

            <ul>
                <li v-for="opt in q.options" :key="opt.order">
                    {{ opt.text }} {{ opt.isCorrect ? '(Correct)' : '' }}
                </li>
            </ul>
        </div>

        <button @click="$emit('submit')">Finish & Submit</button>
    </div>
</template>

<script setup lang="ts">
import type { QuizPayload } from '../types/quizTypes';
const props = defineProps<{ quiz: QuizPayload['quiz']; questions: QuizPayload['questions'] }>();

const getFileUrl = (file: File | null): string | undefined => {
    if (!file) return undefined;
    return URL.createObjectURL(file);
};

</script>
