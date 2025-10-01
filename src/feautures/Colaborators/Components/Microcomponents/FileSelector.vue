<template>
    <div>
        <label class="block font-medium mb-2">Your academic titles</label>
        <span>Upload your certificates or university degrees in PDF, PNG, or JPG format(Max 5 files)</span>

        <FwbButton outline :disabled="files.length >= 5" type="button" @click.prevent="fileInput?.click()"
            class="w-full mt-2">
            Upload your titles <i class="pi pi-file-arrow-up"></i>
        </FwbButton>

        <input type="file" ref="fileInput" class="hidden" accept="image/*,.pdf" multiple @change="handleFiles" />

        <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="(item, index) in files" :key="index" class="relative border rounded-lg p-2 bg-gray-50">
                <img v-if="item.file.type.startsWith('image/')" :src="item.url"
                    class="w-full h-32 object-cover rounded" />

                <div v-else-if="item.file.type === 'application/pdf'"
                    class="flex flex-col items-center justify-center h-32 text-gray-600">
                    <span class="text-4xl">📄</span>
                    <span class="text-sm mt-1">PDF file</span>
                </div>

                <p class="text-xs mt-2 truncate">{{ item.file.name }}</p>
                <button type="button" @click="removeFile(index)"
                    class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600">
                    ✕
                </button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type { FilePreview } from '../../Interfaces/files-preview.interface';
import toast from 'vue3-hot-toast';
import { FwbButton } from 'flowbite-vue';


const files = ref<FilePreview[]>([])
const fileInput = ref<HTMLInputElement | null>(null)

const allowedTypes = ["application/pdf", "image/png", "image/jpeg", "audio/mpeg"]
const maxFiles = 5

const emit = defineEmits<{ (e: "update:files", files: File[]): void }>()

const handleFiles = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (!input.files) return

    const selectedFiles = Array.from(input.files)

    const validFiles = selectedFiles.filter((file) =>
        allowedTypes.includes(file.type)
    )

    if (validFiles.length !== selectedFiles.length) {
        toast.error("Only PDF, PNG, or JPG files are allowed.")
    }

    if (files.value.length + validFiles.length > maxFiles) {
        toast.error(`You can upload up to ${maxFiles} files.`)
        input.value = ""
        return
    }

    files.value = [
        ...files.value,
        ...validFiles.map((file: File): FilePreview => ({
            file,
            url: URL.createObjectURL(file),
        })),
    ]
    emit("update:files", files.value.map(f => f.file))

    input.value = ""
}

const removeFile = (index: number) => {
    URL.revokeObjectURL(files.value[index].url)
    files.value.splice(index, 1)
    emit("update:files", files.value.map(f => f.file))

}
</script>
