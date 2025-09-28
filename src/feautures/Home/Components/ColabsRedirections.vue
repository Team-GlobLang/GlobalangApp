<template>
    <div class="flex flex-col md:flex-row gap-6 w-full">
        <div class="flex-1 bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-between transition-all">
            <h2 class="text-xl font-bold text-blue-700 mb-2">Become a Globalang Instructor</h2>
            <p class="text-gray-700 mb-4 text-center">Share your knowledge, inspire students worldwide and join our team
                of passionate educators. Help others discover new languages and cultures!</p>
            <router-link to="/coloaborators/join-master">
                <button
                    class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition">Join
                    as Instructor</button>
            </router-link>
        </div>
        <div class="flex-1 bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-between transition-all">
            <h2 class="text-xl font-bold text-green-700 mb-2">Become a Globalang Collaborator</h2>
            <p class="text-gray-700 mb-4 text-center">Contribute casually, share phrases, regionalisms or cultural tips.
                Connect with a global community and help enrich our language resources!</p>
            <router-link to="/coloaborators/join-casual">
                <button
                    class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition">Join
                    as Collaborator</button>
            </router-link>
        </div>
    </div>
</template>
<script setup lang="ts">
</script>
