<script setup lang="ts">
import { Dialog } from '@vuetify/v0';

const emit = defineEmits(['submitted'])
const label = defineModel('label')
const url = defineModel('url')

</script>

<template>
    <div class="flex justify-center">
        <Dialog.Root>
            <Dialog.Activator class="px-4 py-2 bg-primary text-on-primary rounded-md">
                <Dialog.Content class="m-auto rounded-xl bg-surface border border-divider max-w-md w-full">
                    <Dialog.Title>Add new item to list</Dialog.Title>
                    <Dialog.Description>Specify details</Dialog.Description>
                    <v-text-field v-model="label" label="Label" variant="underlined"></v-text-field>
                    <v-text-field v-model="url" label="Url" variant="underlined"></v-text-field>
                    <v-btn @click="$emit('submitted', label, url)">Submit</v-btn>
                </Dialog.Content>
            </Dialog.Activator>
        </Dialog.Root>
    </div>
</template>