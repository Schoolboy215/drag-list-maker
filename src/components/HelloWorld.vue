<script setup lang="ts">
  import { createSortable, useDragDrop, useProxyRegistry } from '@vuetify/v0'
  import { computed, onBeforeUnmount, toRef, useTemplateRef } from 'vue'

  import type { ID, SortableTicketInput } from '@vuetify/v0'

  import DraggableItem from './DraggableItem.vue'
  import NewItemDialog from './NewItemDialog.vue'

  import { type Item } from '../interfaces/Item.ts'
  import { useStore } from '@/stores/main.ts'

  interface ItemTicket extends SortableTicketInput {
    value: Item
  }

  type Kinds = { type: 'item', value: ID }

  const dnd = useDragDrop<Kinds>()
  const sortable = createSortable<ItemTicket>()
  const mainStore = useStore()

  sortable.onboard(mainStore.elements.map(value => ({ value })))

  const proxy = useProxyRegistry(sortable)
  const container = useTemplateRef<HTMLElement>('container')
  const outer = useTemplateRef<HTMLElement>('outer')

  const zone = dnd.zones.register({
    el: container,
    accept: ['item'],
    orientation: 'vertical',
    onDrop: (drag, position) => {
      const from = sortable.get(drag.value)?.index
      if (from === undefined) return
      const to = position.index ?? 0
      // `position.index` is computed against the pre-move list; removing the
      // source first means dragging downward needs a -1 adjustment.
      const target = to > from ? to - 1 : to

      // Mirror the move in the store so its order matches what's on screen.
      const [moved] = mainStore.elements.splice(from, 1)
      mainStore.elements.splice(target, 0, moved!)
      sortable.move(drag.value, target)
    },
  })

  onBeforeUnmount(() => zone.unregister())

  const indicatorIndex = computed(() => zone.indicator.value?.index ?? null)

  const indicatorStyle = toRef(() => {
    const index = indicatorIndex.value
    const wrapEl = outer.value
    const ulEl = container.value
    if (index === null || !wrapEl || !ulEl) return null
    const ind = { index }

    const wrap = wrapEl.getBoundingClientRect()
    const kids = [...ulEl.children]
    if (kids.length === 0) return null

    let top
    if (ind.index <= 0) {
      top = kids[0]!.getBoundingClientRect().top
    } else if (ind.index >= kids.length) {
      top = kids.at(-1)!.getBoundingClientRect().bottom
    } else {
      const above = kids[ind.index - 1]!.getBoundingClientRect().bottom
      const below = kids[ind.index]!.getBoundingClientRect().top
      top = (above + below) / 2
    }

    const ref = kids[Math.min(ind.index, kids.length - 1)]!.getBoundingClientRect()

    return {
      top: `${top - wrap.top}px`,
      left: `${ref.left - wrap.left}px`,
      width: `${ref.width}px`,
      transform: 'translateY(-50%)',
    }
  })
  function addItem(label: string, url: string){
    const newItem = {id: crypto.randomUUID(), label:label, url:url}
    mainStore.elements.push(newItem)
    sortable.register({value: newItem})
  }
  function clearList(){
    sortable.clear()
    mainStore.$reset()
    sortable.onboard(mainStore.elements.map(value => ({ value })))
  }

</script>

<template>
  <v-container class="fill-height d-flex flex-column justify-center" max-width="1100">
    <div ref="outer" class="relative">
    <ul
      ref="container"
      class="flex flex-col gap-1 data-[dragging]:cursor-grabbing"
      :data-dragging="dnd.isDragging.value || undefined"
    >
      <TransitionGroup name="list">
        <DraggableItem
          v-for="ticket in proxy.values"
          :id="ticket.id"
          :key="ticket.id"
          :dnd
          :label="ticket.value!.label"
        />
      </TransitionGroup>
    </ul>

    <div
      v-if="indicatorIndex !== null"
      aria-hidden="true"
      class="indicator pointer-events-none absolute z-10 h-0.5 rounded-full bg-primary"
      :style="indicatorStyle"
    />
  </div>
  <v-container>
    <v-row>
    <NewItemDialog @submitted="addItem"/>
    <v-btn @click="clearList">Reset</v-btn>
    </v-row>
  </v-container>
  </v-container>
</template>

<style scoped>
.list-move {
  transition: transform 0.25s ease-out;
}
.list-move[data-dragging] {
  transition: none;
}
.indicator {
  transition: top 0.12s ease-out, left 0.12s ease-out, width 0.12s ease-out;
}
</style>
