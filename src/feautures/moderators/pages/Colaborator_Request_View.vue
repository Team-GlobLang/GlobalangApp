<template>
  <Lyout>
    <section
      class="flex flex-col gap-6 justify-center items-center bg-[#F6F6F6] p-4 rounded-lg text-sm"
    >
      <Colaborator_Request_View_Card
        v-if="mutation.data.value"
        :name="mutation.data.value.userInfo.fullName"
        :email="mutation.data.value.userInfo.email"
        :message="mutation.data.value.Info_Extra"
        :-languages="mutation.data.value.Languages"
        :title="mutation.data.value.Academic_Title"
        :id_item="props.id"
        @reject="HandleRejected"
        @accept="HandleAccept"
      />
    </section>
  </Lyout>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Lyout from "../../../lyouts/Lyout.vue";
import Colaborator_Request_View_Card from "../components/Colaborator_Request_View_Card.vue";
import { UseGetColabById } from "../hooks/UseGetColabById";
import { Status } from "../Interfaces/ColaboratorRequestInterface";
import type { ColaboratorRequestChangeStatus } from "../Interfaces/ColaboratorRequestChangeStatusInterface";
import { UseChangeRequestStatus } from "../hooks/UseChangeRequest";
import { useRouter } from "vue-router";
const props = defineProps({
  id: {
    type: String,
  },
});

const mutation = UseGetColabById();

const fetchRequest = async () => {
  try {
    if (props.id) {
      await mutation.mutate(props.id);
    }
  } catch (err) {
    console.log("Erro de mutacion");
  }
};

const router = useRouter();

const HandleViewRequest = () => {
  router.push({
    name: "Request_colaborator_Moderator",
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
    await HandleViewRequest();
  } catch (err) {
    console.log("Error al rechazar solicitud");
  }
};

const HandleAccept = async (colaboratorId: string) => {
  const colaboratorRequestChangeStatus: ColaboratorRequestChangeStatus = {
    Id: colaboratorId,
    Status: Status.ACCEPTED,
  };
  try {
    await mutationChangeRequest.mutate(colaboratorRequestChangeStatus);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await HandleViewRequest();
  } catch (err) {
    console.log("Error al rechazar solicitud");
  }
};

onMounted(() => {
  fetchRequest();
});
</script>

<style scoped></style>
