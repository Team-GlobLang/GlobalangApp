<template>
  <div class="w-full flex flex-col items-center">
    <div class="p-1 w-full">
      <BreadCrumb :items="breadcrumbItems" class="w-11/12 mb-4" />
    </div>
    <div
      class="w-11/12 bg-white py-3 shadow rounded-2xl flex flex-col items-center"
    >
      <div class="w-full" v-if="currentStep === 0">
        <CreateQuizConfigurationFom ref="configRef" v-model="quizData.quiz" />
      </div>
      <div class="w-full" v-else>
        <CreateQuestionForm
          v-if="questions[currentStep - 1]"
          ref="questionRef"
          :current-step="currentStep"
          v-model:question="questions[currentStep - 1]"
          @delete-question="deleteCurrentQuestion"
        />
      </div>

      <QuizStepperButtons
        :currentStep="currentStep"
        :prevStep="prevStep"
        :saveConfig="saveConfig"
        :next-step="nextStep"
        :submitQuiz="submitQuiz"
        :isPending="isPending"
        :isValid="isCurrentQuestionValid"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { QuizPayload } from "../types/quizTypes";
import CreateQuizConfigurationFom from "../components/CreateQuizConfigurationFom.vue";
import BreadCrumb from "@layouts/BreadCrumb.vue";
import QuizStepperButtons from "../components/microcomponents/QuizStepperButtons.vue";
import CreateQuestionForm from "../components/CreateQuestionForm.vue";
import toast from "vue3-hot-toast";

const configRef = ref();
const questionRef = ref();

const isCurrentQuestionValid = computed(() => {
  if (currentStep.value === 0) {
    const configComp = configRef.value;
    if (!configComp) return false;
    const { valid } = configComp.validateConfig();
    return valid;
  } else {
    const questionComp = questionRef.value;
    if (!questionComp) return false;
    const { valid } = questionComp.validateQuestion();
    return valid;
  }
});

const quizData = ref<QuizPayload>({
  quiz: {
    name: "",
    description: "",
    configuration: { timeLimit: "5M", shuffleQuestions: true },
    country: "",
    writtenIn: "",
  },
  questions: [],
});

const currentStep = ref(0);
const questions = quizData.value.questions;

const prevStep = () => {
  if (currentStep.value > 0) currentStep.value--;
};

const nextStep = () => {
  if (currentStep.value === 0) {
    currentStep.value++;
    return;
  }

  const questionComp = questionRef.value;
  if (questionComp) {
    const { valid, errors } = questionComp.validateQuestion();
    if (!valid && errors.length > 0) {
      toast.error(errors[0]);
      return;
    }
  }

  const questionIndex = currentStep.value - 1;
  if (!questions[questionIndex + 1]) {
    questions.push({
      questionText: "",
      questionType: "single_selection",
      explanation: "",
      file: null,
      options: [
        { text: "", isCorrect: true, order: 0 },
        { text: "", isCorrect: false, order: 1 },
      ],
      order: questionIndex + 1,
    });
  }

  currentStep.value++;
};

const saveConfig = () => {
  const configComp = configRef.value;
  if (configComp) {
    const { valid, errors } = configComp.validateConfig();
    if (!valid && errors.length > 0) {
      return;
    }
  }

  if (!questions[0]) {
    questions.push({
      questionText: "",
      questionType: "single_selection",
      explanation: "",
      file: null,
      options: [
        { text: "", isCorrect: true, order: 0 },
        { text: "", isCorrect: false, order: 1 },
      ],
      order: 0,
    });
  }

  currentStep.value++;
};

import { UseSenQuiz } from "../hooks/UseSendQuiz";
import { useRouter } from "vue-router";

const { mutate, isPending } = UseSenQuiz();
const router = useRouter();
const submitQuiz = async () => {
  mutate(quizData.value, {
    onSuccess: () => {
      router.push({ name: "QuizStudio" });
    },
  });
};

const breadcrumbItems = computed(() => {
  const items = [
    { label: "Home", route: "/home", isHome: true },
    { label: "Quiz Studio", route: "/studio/quiz" },
  ];
  if (currentStep.value === 0) {
    items.push({ label: "Configuration", route: "create-quiz" });
  } else {
    items.push({
      label: `Question #${currentStep.value}`,
      route: "create-quiz",
    });
  }
  return items;
});

const deleteCurrentQuestion = () => {
  const index = currentStep.value - 1;
  questions.splice(index, 1);

  if (questions.length === 0) {
    questions.push({
      questionText: "",
      questionType: "single_selection",
      explanation: "",
      file: null,
      options: [
        { text: "", isCorrect: true, order: 0 },
        { text: "", isCorrect: false, order: 1 },
      ],
      order: 1,
    });
    currentStep.value = 1;
  } else if (currentStep.value > questions.length) {
    currentStep.value = questions.length;
  }
};
</script>
