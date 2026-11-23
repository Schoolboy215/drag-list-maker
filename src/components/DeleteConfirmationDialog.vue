<script setup lang="ts">
  import { AlertDialog } from '@vuetify/v0'
  import type { AlertDialogActionEvent } from '@vuetify/v0'

  const emit = defineEmits(['deleted'])
  defineProps(['detailText'])

  async function onAction (e: AlertDialogActionEvent) {
    e.wait()
    emit('deleted')
    e.close()
  }
</script>

<template>
  <AlertDialog.Root>
    <AlertDialog.Activator class="px-4 py-2 bg-secondary text-on-error rounded-md text-md font-medium">
      <slot></slot>
    </AlertDialog.Activator>

    <AlertDialog.Content class="m-auto rounded-xl bg-surface border border-divider max-w-md w-full">
      <div class="px-4 py-2 border-b border-divider">
        <AlertDialog.Title as="h3" class="text-lg font-semibold text-on-surface">
          Are you sure?
        </AlertDialog.Title>

        <AlertDialog.Description class="text-sm text-on-surface-variant">
          This action cannot be undone.
        </AlertDialog.Description>
      </div>

      <div v-if="detailText" class="p-4 space-y-4">
        <p class="text-sm text-on-surface leading-relaxed">
          {{detailText}}
        </p>
      </div>

      <div class="flex gap-3 justify-end p-4 pt-0">
        <AlertDialog.Cancel class="px-4 py-2 text-md font-medium rounded-md bg-secondary border border-divider hover:bg-surface-tint">
          Cancel
        </AlertDialog.Cancel>

        <AlertDialog.Action class="px-4 py-2 text-md font-medium rounded-md bg-error text-on-error" @action="onAction">
          Yes
        </AlertDialog.Action>
      </div>
    </AlertDialog.Content>
  </AlertDialog.Root>
</template>