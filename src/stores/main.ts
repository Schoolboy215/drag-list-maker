import {defineStore} from 'pinia';
import {ref} from 'vue';

// export const useListStore = defineStore('lists', {
//     state: () => {
//         return {
//             items: [
//                 { id: 'a', label: 'Cut alpha' },
//                 { id: 'b', label: 'Ship the docs' }
//             ]
//         }
//     }
// },
//     {
//         persist: true
//     },
// );

export const useStore = defineStore('main', {
  state: () => {
    return {
      elements: [
        { id: '84ad9d77-e246-4724-a06a-840140e976bc', label: 'List item', url: 'https://wikipedia.org'}
      ]
    }
  },
  persist: true,
})

// export const useListStore = defineStore(
//   'lists',
//   () => {
//     const someState = ref('draggable-lists')
//     return { someState }
//   },
//   {
//     persist: true,
//   },
// )