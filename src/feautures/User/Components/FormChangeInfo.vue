<template>
  <div class="p-5 bg-white shadow-lg rounded-2xl w-11/12">
    <h2 class="text-xl font-bold mb-4">Update User Info</h2>

    <form @submit.prevent="submitForm" class="space-y-4">
      <FwbInput label="Full Name" type="text" v-model="fullName" required />

      <CountrySelector v-model:country="country" />

      <FwbButton type="submit" :disabled="isPending">
        {{ isPending ? "Saving..." : "Save" }}
      </FwbButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { FwbButton, FwbInput } from "flowbite-vue";
import CountrySelector from "@components/CountrySelector.vue";
import { UseUpdateUser } from "../Hooks/UseUpdateUserInfo";
import type { updateUserInfo } from "../Interfaces/UserInterfaces";
import { useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import { userStore } from "@UserStore";

const router = useRouter();

const { mutate, isPending } = UseUpdateUser();

const { handleSubmit } = useForm<updateUserInfo>({
  initialValues: {
    fullName: userStore.user?.fullName || "",
    country: userStore.user?.country || "",
  },
});
const { value: fullName } = useField<string>("fullName");
const { value: country } = useField<string>("country");

const submitForm = handleSubmit((values: updateUserInfo) => {
  mutate(values, {
    onSuccess: () => router.back(),
  });
});
</script>
