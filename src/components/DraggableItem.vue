<script setup lang="ts">
  import { onBeforeUnmount, useTemplateRef } from 'vue'

  import type { DragDropContext, ID } from '@vuetify/v0'

  type Kinds = { type: 'item', value: ID }

  const { id, guid, label, dnd } = defineProps<{
    id: ID
    guid: string
    label: string
    dnd: DragDropContext<Kinds>
  }>()

  const el = useTemplateRef<HTMLElement>('el')

  const ticket = dnd.draggables.register({
    el,
    type: 'item',
    value: id,
  })

  const emit = defineEmits(['deleted'])

  onBeforeUnmount(() => ticket.unregister())

  function deleteSelf() {
    emit('deleted', guid);
  }
</script>

<template>
  <li
    ref="el"
    aria-roledescription="draggable"
    class="flex items-center gap-2 rounded border border-divider bg-surface px-3 py-2 cursor-grab select-none touch-none data-[dragging]:cursor-grabbing data-[dragging]:opacity-50"
    data-draggable
    :data-dragging="ticket.isDragging.value || undefined"
    tabindex="0"
  >
    <v-row><v-col><span>{{ label }}</span></v-col><v-btn @click="deleteSelf" color="red">x</v-btn></v-row>
  </li>
</template>