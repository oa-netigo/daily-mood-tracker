<template>
  <div class="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
      Your mood history:
    </h2>
    <div v-if="entries.length > 0" class="flex flex-col gap-4">
      <MoodEntry
        v-for="(entry, index) in entries"
        :key="index"
        :entry="entry"
        :index="index"
        @delete-entry="deleteEntry"
        ref="moodEntries"
      />
    </div>
    <div v-else class="no-entries">
      <p>No mood entries yet. Start tracking your mood!</p>
    </div>
  </div>
</template>

<script>
import MoodEntry from './MoodEntry.vue'

export default {
  name: 'MoodHistory',
  components: {
    MoodEntry
  },
  props: {
    entries: {
      type: Array,
      required: true
    }
  },
  methods: {
    deleteEntry(index) {
      this.$emit('delete-entry', index)
    },
    reinitializeDropdowns() {
      this.$nextTick(() => {
        if (this.$refs.moodEntries) {
          this.$refs.moodEntries.forEach(entry => {
            entry.initDropdown()
          })
        }
      })
    }
  },
  watch: {
    entries: {
      handler() {
        this.reinitializeDropdowns()
      },
      deep: true
    }
  }
}
</script>
