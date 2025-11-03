<template>
    <div v-if="fullName" @click="goTo"
        class="w-full rounded-2xl p-4 flex items-center gap-4 bg-white shadow transition-all">
        <img :src="'https://ui-avatars.com/api/?name=' + encodeURIComponent(fullName) + '&background=0D8ABC&color=fff'"
            alt="User avatar" class="w-16 h-16 rounded-full border-2 border-blue-400 object-cover shadow" />
        <div class="flex flex-col">
            <span class="text-base not-first:font-bold text-blue-700 mb-1">Welcome back, {{ fullName }}!</span>
            <span class=" text-sm text-gray-700">We're glad to see you again! We've added new resources—don't miss out. Explore a world of languages.</span>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { userStore } from '../../../Stores/user';
import { useRouter } from 'vue-router';

const fullName = computed(() => userStore.user?.fullName)
const router = useRouter()
const goTo=()=>{
 router.push({name:'User'})
}

</script>
