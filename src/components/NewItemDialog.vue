<script setup lang="ts">
import { Dialog } from '@vuetify/v0';
import { ref, watch } from 'vue'

const emit = defineEmits(['submitted'])
const label = ref('label')
const url = ref('url')
const form = ref()

const labelRules = ref([
    (v: string) => !!v || 'Label is required'
])
function urlValidation(url: string) {
    if (!url) return true;
    try{
        const parsed = new URL(url)
        return true
    } catch {
        return false
    }
}
const urlRules = ref([
    (v: string) => urlValidation(v) || 'Please enter a valid URL'
])

const open = ref(false)
watch(open, (isOpen) => {
    if (isOpen) {
        label.value = ''
        url.value = ''
    }
})

async function validate() {
    const {valid} = await form.value.validate()
    if (valid) {
        emit('submitted', label.value, url.value)
        open.value = false
    }
}

</script>

<template>
    <div class="flex justify-center">
        <Dialog.Root v-model="open">
            <Dialog.Activator class="px-4 py-2 bg-primary text-on-primary rounded-md">
                Add item
                <Dialog.Content class="m-auto rounded-xl bg-surface border border-divider max-w-md w-full">
                    <Dialog.Title>Add new item to list</Dialog.Title>
                    <Dialog.Description>Specify details</Dialog.Description>
                    <v-form ref="form">
                        <v-text-field
                            v-model="label"
                            label="Label"
                            variant="underlined"
                            :rules="labelRules"
                            required
                        />
                        <v-text-field v-model="url" label="Url" variant="underlined" :rules="urlRules"></v-text-field>
                        <v-btn @click="validate">Add</v-btn>
                    </v-form>
                </Dialog.Content>
            </Dialog.Activator>
        </Dialog.Root>
    </div>
</template>