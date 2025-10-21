<template>
  <div class="flex flex-col">
    <div
      :class="stickyTopPading"
      class="w-full flex flex-col items-center sticky z-40 bg-[#F1F4FB] pb-3"
    >
      <div class="w-full p-2">
        <BreadCrumb :items="breadCumbs" />
      </div>
      <div class="w-11/12">
        <FwbInput
          v-model="search"
          placeholder="Search quizzes by name or topic…"
        >
          <template #suffix>
            <span class="pi pi-search"></span>
          </template>
        </FwbInput>
      </div>
    </div>

    <div class="w-full relative flex flex-col items-center">
      <div class="w-11/12 flex flex-col gap-3">
        <MyQuizCard
          v-for="quiz in quizzes"
          :quiz="quiz"
          :key="quiz.id"
          @review="reviewQuiz"
          @remove="handleDeleteQuiz"
        />

        <div
          v-if="isPending || isFetchingNextPage"
          class="text-center py-4 text-gray-500"
          role="status"
          aria-live="polite"
        >
          Loading more...
        </div>

        <div v-if="isError" role="alert">
          <div
            class="h-[60vh] flex flex-col items-center justify-center"
            role="status"
            aria-live="polite"
          >
            <div class="shadow-2xl rounded-2xl bg-white">
              <img src="/NoResults.png" alt="No quizzes found" />
            </div>
          </div>
        </div>

        <div
          v-if="
            !isPending &&
            !isFetchingNextPage &&
            quizzes.length === 0 &&
            !isError
          "
        >
          <div
            class="h-[60vh] flex flex-col items-center justify-center"
            role="status"
            aria-live="polite"
          >
            <div class="shadow-2xl rounded-2xl bg-white">
              <img src="/NoResults.png" alt="No quizzes found" />
            </div>
          </div>
        </div>

        <div
          v-if="!hasNextPage && quizzes.length > 0"
          class="text-center py-4 text-gray-500"
          role="status"
          aria-live="polite"
        >
          That’s it for now!
        </div>
      </div>
    </div>
    <GoToStart
      v-show="showScrollTop"
      @click="scrollToTop"
      aria-label="Scroll to top"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useInfiniteQuery } from "@tanstack/vue-query";
import BreadCrumb from "@layouts/BreadCrumb.vue";
import GoToStart from "../components/microcomponents/GoToStart.vue";
import type { QuizData } from "../types/quizTypes";
import { getMyQuizzes} from "../service/QuizService";
import type { PaginatedResponse } from "src/feautures/shared/Interfaces/interfaces";
import { FwbInput } from "flowbite-vue";
import MyQuizCard from "../components/microcomponents/MyQuizCard.vue";
import { Capacitor } from "@capacitor/core";
import { useRouter } from "vue-router";
import { UseDeleteMyQuiz } from "../hooks/UseDeleteMyQuiz";

const breadCumbs = [
  { label: "Home", route: "/home", isHome: true },
  { label: "Quiz Studio", route: "/studio/quiz" },
  { label: "My Quizzes", route: "" },
];

const search = ref("");
const showScrollTop = ref(false);

const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isPending,
  refetch,
  isError,
} = useInfiniteQuery<PaginatedResponse<QuizData>, Error>({
  queryKey: computed(() => ["quizzes", { country: search.value }]),
  queryFn: async ({ pageParam = 1 }) => {
    return await getMyQuizzes({
      page: pageParam,
      limit: 5,
      search: search.value,
    });
  },
  initialPageParam: 1,
  getNextPageParam: (lastPage, allPages) => {
    return lastPage.meta.hasNextPage ? allPages.length + 1 : undefined;
  },
  getPreviousPageParam: (firstPage, allPages) => {
    return firstPage.meta.hasPrevPage ? allPages.length - 1 : undefined;
  },
});

const quizzes = computed(
  () => data.value?.pages.flatMap((page) => page.data) ?? []
);

const onScroll = async () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

  showScrollTop.value = scrollTop > 300;

  if (
    scrollTop + clientHeight >= scrollHeight - 150 &&
    hasNextPage.value &&
    !isFetchingNextPage.value
  ) {
    await fetchNextPage();
  }
};

watch(search, async () => {
  await refetch();
});

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});

const router = useRouter();

const reviewQuiz = (id: string) => {
  console.log(id);
  router.push({ name: "ReviewQuiz", params: { id: id } });
};

const { mutate } = UseDeleteMyQuiz();

function handleDeleteQuiz(id: string) {
  mutate(id, {
    onSuccess: () => refetch(),
  });
}

const isNative = Capacitor.isNativePlatform();

const stickyTopPading = computed(() => (isNative ? "top-[5dvh]" : "top-0"));
</script>
