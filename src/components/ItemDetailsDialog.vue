<script setup lang="ts">
import { Dialog } from '@vuetify/v0';
import { type Item } from '@/interfaces/Item';
import DeleteConfirmationDialog from "./DeleteConfirmationDialog.vue"

const props = defineProps<{ item?: Item }>()
const open = defineModel<boolean>('open')
const emit = defineEmits(['deleted'])

function deleteSelf()
{
    emit('deleted', props.item?.id)
}

</script>

<template>
    <Dialog.Root v-model="open">
        <Dialog.Content class="m-auto rounded-xl bg-surface border border-divider max-w-md w-full">
            <Dialog.Title>{{ item?.label }}</Dialog.Title>
            <Dialog.Description><a v-bind:href=item?.url target="_blank">{{item?.url}}</a></Dialog.Description>
            <DeleteConfirmationDialog @deleted="deleteSelf">Delete</DeleteConfirmationDialog>
        </Dialog.Content>
    </Dialog.Root>
</template>