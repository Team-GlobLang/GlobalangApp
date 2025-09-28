<template>
    <div class="w-full rounded-2xl p-4 flex items-center gap-4 bg-white shadow transition-all md:max-w-md md:mx-auto xl:max-w-lg">
        <img :src="'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.fullName) + '&background=0D8ABC&color=fff'"
            alt="User avatar" class="w-16 h-16 rounded-full border-2 border-blue-400 object-cover shadow" />
        <div class="flex flex-col">
            <span class="text-base not-first:font-bold text-blue-700 mb-1">Welcome back, {{ user.fullName }}!</span>
            <span class=" text-sm text-gray-700">We're glad to see you again! We have new resources—don't miss
                out, explore a world of languages.</span>
        </div>
    </div>
</template>
<script setup lang="ts">
import { inject } from 'vue';
import type { User } from '../../../Stores/user';


const user = inject<User>('user')!;

</script>
