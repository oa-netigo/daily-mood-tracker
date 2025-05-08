<template>
  <div class="flex flex-col gap-4 p-6 text-base bg-gray-100 rounded-lg dark:bg-gray-900">
    <div class="flex items-center justify-between">
      <p class="inline-flex gap-1 items-center text-sm text-gray-900 dark:text-white font-semibold">
        <span class="mood-emoji text-3xl">
          {{ getMoodEmoji(entry.mood) }}
        </span>
        <span class="mood-label">
          {{ entry.mood }}
        </span>
      </p>
      <div class="flex gap-4">
        <p class="mood-date inline-flex items-center text-sm text-gray-900 dark:text-white font-semibold">
          {{ formatDate(entry.date) }}
        </p>
        <button :id="`dropdownMood${index}Button`" :data-dropdown-toggle="`dropdownMood${index}`" class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
          <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"></path>
          </svg>
          <span class="sr-only">Mood settings</span>
        </button>
        <!-- Dropdown menu -->
        <div :id="`dropdownMood${index}`"
                class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                    :aria-labelledby="`dropdownMood${index}Button`">
                    <li>
                        <a href="#"
                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                    </li>
                    <li>
                        <a href="#"
                            @click.prevent="deleteEntry"
                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-red-600 dark:text-red-400">Remove</a>
                    </li>
                </ul>
            </div>
      </div>
    </div>
    <p class="mood-note text-gray-500 dark:text-gray-400 break-words" v-if="entry.note">
      {{ entry.note }}
    </p>
  </div>
</template>

<script>
import { Dropdown } from 'flowbite'

export default {
  name: 'MoodEntry',
  props: {
    entry: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      dropdownInstance: null
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
    getMoodEmoji(mood) {
      const emojis = {
        happy: '😊',
        sad: '😢',
        neutral: '😐',
        excited: '🤩',
        tired: '😴',
      }
      return emojis[mood] || ''
    },
    deleteEntry() {
      if (this.dropdownInstance) {
        this.dropdownInstance.hide()
      }
      this.$emit('delete-entry', this.index)
    },
    initDropdown() {
      const button = document.getElementById(`dropdownMood${this.index}Button`)
      const dropdown = document.getElementById(`dropdownMood${this.index}`)
      if (button && dropdown) {
        this.dropdownInstance = new Dropdown(dropdown, button)
      }
    }
  },
  mounted() {
    this.initDropdown()
  }
}
</script>
