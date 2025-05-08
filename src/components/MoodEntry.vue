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
      <p class="mood-date inline-flex items-center text-sm text-gray-900 dark:text-white font-semibold">
        {{ formatDate(entry.date) }}
      </p>
    </div>
    <p class="mood-note text-gray-500 dark:text-gray-400" v-if="entry.note">
      {{ entry.note }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'MoodEntry',
  props: {
    entry: {
      type: Object,
      required: true
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
    }
  }
}
</script>
