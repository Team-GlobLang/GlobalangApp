<template>
  <Lyout>
    <BreadCrumb :items="breadCrumbItems" />
    <section class="justify-center bg-[#F6F6F6] p-2 rounded-lg">
      <FwbInput
        list="languages"
        v-model="language"
        type="text"
        :validation-status="languageError ? 'error' : undefined"
        @blur="languageBlur"
        label="Language"
        placeholder="Ej: Spanish, English"
      >
        <template #suffix>
          <span class="pi pi-language"></span>
        </template>
        <template #validationMessage>
          <span class="font-medium">{{ languageError }} </span>
        </template>
      </FwbInput>

      <datalist id="languages">
        <option v-for="lang in filteredLanguages" :key="lang" :value="lang">
          {{ lang }}
        </option>
      </datalist>

      <Request_Colaborator_Card
        v-if="mutation.data.value && mutation.data.value.length > 0"
        v-for="item in mutation.data.value"
        :key="item.Colaborator_Id"
        :id_item="item.Colaborator_Id"
        :user="item.userinfo.fullName"
        :language="item.Languages"
        :title="item.Academic_Title"
        :category="item.Category"
        @accept="HandleViewRequest"
        @reject="HandleRejected"
      />

      <div
        v-if="mutation.data.value && mutation.data.value.length === 0"
        class="text-center mt-10 p-10 bg-white"
      >
        No se encontraron colaboradores con los filtros seleccionados
      </div>
    </section>
  </Lyout>
</template>

<script setup lang="ts">
import Lyout from "../../../lyouts/Lyout.vue";
import Request_Colaborator_Card from "../components/Request_Colaborator_Card.vue";
import { computed, onMounted, watch } from "vue";
import { FwbInput } from "flowbite-vue";
import { UseGetColabsRequests } from "../hooks/UseGetColabsRequests";
import { Status } from "../Interfaces/ColaboratorRequestInterface";
import type { ColaboratorRequestFilters } from "../Interfaces/ColaboratorRequestFiltersInterface";
import { useField } from "vee-validate";
import { countries } from "../../../Core/CountriesArray";
import { useRouter } from "vue-router";
import { UseChangeRequestStatus } from "../hooks/UseChangeRequest";
import type { ColaboratorRequestChangeStatus } from "../Interfaces/ColaboratorRequestChangeStatusInterface";
import BreadCrumb from "../../../lyouts/BreadCrumb.vue";

const breadCrumbItems = [
  {
    label: "Home",
    route: "/home/moderator",
    isHome: true,
  },
  {
    label: "Solicitudes colaboradores",
  },
];

const mutation = UseGetColabsRequests();

const colaboratorRequestFilters: ColaboratorRequestFilters = {
  Status: Status.PENDING,
  Languages: "",
};

const fetchRequest = async () => {
  try {
    await mutation.mutate(colaboratorRequestFilters);
  } catch (err) {
    console.log("Erro de mutacion");
  }
};

const MAX_INITIAL = 10;

const allLanguages = computed(() => {
  const languagesSet = new Set<string>();
  countries.forEach((country) => {
    country.languages.forEach((lang) => {
      languagesSet.add(lang);
    });
  });
  return Array.from(languagesSet).sort();
});

const filteredLanguages = computed(() => {
  if (!language.value) {
    return allLanguages.value.slice(0, MAX_INITIAL);
  }
  return allLanguages.value.filter((lang) =>
    lang.toLowerCase().includes(language.value.toLowerCase())
  );
});

const {
  value: language,
  errorMessage: languageError,
  handleBlur: languageBlur,
} = useField<string>("language");

watch(language, (newValue) => {
  colaboratorRequestFilters.Languages = newValue || "";
  fetchRequest();
});

const router = useRouter();

const HandleViewRequest = (colaboratorId: string) => {
  router.push({
    name: "Request_colaborator_View_Moderator",
    params: { id: colaboratorId },
  });
};

const mutationChangeRequest = UseChangeRequestStatus();

const HandleRejected = async (colaboratorId: string) => {
  const colaboratorRequestChangeStatus: ColaboratorRequestChangeStatus = {
    Id: colaboratorId,
    Status: Status.REJECTED,
  };
  try {
    await mutationChangeRequest.mutate(colaboratorRequestChangeStatus);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await fetchRequest();
    console.log("paso de fetch");
  } catch (err) {
    console.log("Error al rechazar solicitud");
  }
};

onMounted(() => {
  fetchRequest();
});
</script>

<style scoped></style>
