<template>
  <div class="flex flex-col">
    <div
      class="w-full flex flex-col items-center sticky top-0 z-40 bg-[#F1F4FB] pb-3"
    >
      <div class="w-full p-2">
        <BreadCrumb :items="breadCumbs" />
      </div>
      <div class="w-11/12">
        <CountrySearch v-model:country="country" />
      </div>
    </div>

    <div class="w-full relative flex flex-col items-center">
      <div class="w-11/12 flex flex-col gap-3">
        <ShortCard
          v-for="short in shorts"
          :key="short.id"
          :country="short.country"
          :description="short.description"
          :create-by="short.createBy"
          :file-url="short.fileUrl"
          :text="short.text"
          :id="short.id"
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
              <img src="/NoResults.png" alt="No shorts found" />
            </div>
          </div>
        </div>

        <div
          v-if="
            !isPending && !isFetchingNextPage && shorts.length === 0 && !isError
          "
        >
          <div
            class="h-[60vh] flex flex-col items-center justify-center"
            role="status"
            aria-live="polite"
          >
            <div class="shadow-2xl rounded-2xl bg-white">
              <img src="/NoResults.png" alt="No shorts found" />
            </div>
          </div>
        </div>

        <div
          v-if="!hasNextPage && shorts.length > 0"
          class="text-center py-4 text-gray-500"
          role="status"
          aria-live="polite"
        >
          No more shorts
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
import CountrySearch from "@components/CountrySearch.vue";
import type { PaginatedResponse } from "src/feautures/shared/Interfaces/interfaces";
import GoToStart from "@components/GoToStart.vue";
import { getShorts } from "../Services/shortService";
import ShortCard from "../Components/Card/ShortCard.vue";
import type { AvailableShortsInterface } from "../Interfaces/Shorts.interface";

const breadCumbs = [
  { label: "Home", route: "/home", isHome: true },
  { label: "Available shorts", route: "/short/availables" },
];

const country = ref("");
const showScrollTop = ref(false);

const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isPending,
  refetch,
  isError,
} = useInfiniteQuery<PaginatedResponse<AvailableShortsInterface>, Error>({
  queryKey: computed(() => ["shorts", { country: country.value }]),
  queryFn: async ({ pageParam = 1 }) => {
    return await getShorts({
      page: pageParam,
      limit: 5,
      approved: true,
      country: country.value,
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

const shorts = computed(
  () => data.value?.pages.flatMap((page) => page.data) ?? []
);

let scrollTimeout: number | null = null;

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

const throttledOnScroll = () => {
  if (scrollTimeout !== null) return;

  scrollTimeout = window.setTimeout(() => {
    onScroll();
    scrollTimeout = null;
  }, 200);
};

watch(country, async () => {
  await refetch();
  window.scrollTo({ top: 0 });
});

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  window.addEventListener("scroll", throttledOnScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", throttledOnScroll);
});
</script>
