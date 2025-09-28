<template>
    <div class=" w-full flex flex-col gap-2 justify-center items-center">
        <div class=" w-full p-2">
            <BreadCrumb :items="breadcrumbItems" />
        </div>
        <div class="w-11/12 bg-white shadow-lg rounded-xl p-6 ">
            <h2 class="text-xl font-bold mb-4">Become an Instructor form</h2>
            <MasterColabForm />
        </div>
    </div>

</template>
<script setup lang="ts">
import BreadCrumb from '../../../lyouts/BreadCrumb.vue';
import MasterColabForm from '../Components/MasterColabForm.vue';


const breadcrumbItems = [
    { label: "Home", route: "/home", isHome: true },
    { label: "Become an instructor" }
];

</script>