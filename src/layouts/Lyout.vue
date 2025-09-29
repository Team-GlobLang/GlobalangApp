<template>
  <header class="bg-[#00A1FF] p-6 top-0 fixed w-full"></header>
  <main class="py-20 px-4">
    <slot></slot>
  </main>
  <footer class="bg-[#00A1FF] p-4 bottom-0 fixed w-full flex justify-between">
    <i class="pi pi-user" style="font-size: 3rem"> </i>
    <i class="pi pi-address-book" style="font-size: 3rem"></i>
    <i class="pi pi-home" style="font-size: 3rem"></i>
    <i class="pi pi-microphone" style="font-size: 3rem"></i>
    <i class="pi pi-file-check" style="font-size: 3rem"></i>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped></style>
