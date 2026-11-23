import {defineStore} from 'pinia';

export const useStore = defineStore('main', {
  state: () => {
    return {
      elements: [
        { id: '84ad9d77-e246-4724-a06a-840140e976bc', label: 'Placeholder item - Delete me', url: 'https://example.com'}
      ]
    }
  },
  persist: true,
})