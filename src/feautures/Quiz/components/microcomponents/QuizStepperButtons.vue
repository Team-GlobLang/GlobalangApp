<template>
    <div class="mt-4 flex justify-between w-11/12 items-center gap-2">

        <div>
            <FwbButton v-if="props.currentStep > 0" color="alternative" @click="props.prevStep">
                Previous
            </FwbButton>
        </div>

        <div class="flex-1 flex justify-center">
            <FwbButton v-if="props.currentStep > 0" color="blue" @click="props.submitQuiz"
                :disabled="!props.isValid || props.isPending">
                Finish
            </FwbButton>

            <FwbButton v-else-if="props.currentStep === 0" color="blue" @click="props.saveConfig">
                Save Configuration
            </FwbButton>
        </div>

        <div>
            <FwbButton v-if="props.currentStep > 0" color="green" @click="props.nextStep"
                :disabled="!props.isValid || props.isPending">
                Next
            </FwbButton>
        </div>

    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { FwbButton } from 'flowbite-vue';

const props = defineProps<{
    currentStep: number;
    prevStep: () => void;
    saveConfig: () => void;
    nextStep: () => void;
    submitQuiz: () => void;
    isPending: boolean;
    isValid: boolean;
}>();
</script>
