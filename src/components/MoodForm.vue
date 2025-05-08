<template>
  <div class="min-w-0 flex-1 space-y-8 sticky top-0 lg:top-4 z-index-1 bg-white">
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
        How are you feeling today?
      </h2>
      <div class="grid grid-cols-1 gap-4">
        <div>
          <div class="mb-2 flex items-center gap-2">
            <label for="mood" class="block text-sm font-medium text-gray-900 dark:text-white">
              Select your mood <span class="text-red-500">*</span>
            </label>
          </div>
          <select
            id="mood"
            v-model="mood"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            :class="{'border-red-500': errors.mood}"
          >
            <option value="">Choose a mood</option>
            <option value="happy">😊 Happy</option>
            <option value="sad">😢 Sad</option>
            <option value="neutral">😐 Neutral</option>
            <option value="excited">🤩 Excited</option>
            <option value="tired">😴 Tired</option>
          </select>
          <p v-if="errors.mood" class="text-red-500 text-xs mt-1">{{ errors.mood }}</p>
        </div>
        <div>
          <label for="note" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
            Add a note (optional)
          </label>
          <textarea
            id="note"
            v-model="note"
            :maxlength="noteMaxLength"
            placeholder="How was your day?"
            rows="6"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            :class="{'border-red-500': errors.note}"
          ></textarea>
          <div class="flex justify-between items-center mt-1">
            <p v-if="errors.note" class="text-red-500 text-xs">{{ errors.note }}</p>
            <span class="text-xs text-gray-400 ml-auto">{{ note.length }}/{{ noteMaxLength }}</span>
          </div>
        </div>
        <button
          @click="onSubmit"
          class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Save mood
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useMoodStore } from '../composables/useMoodStore'

export default {
  name: 'MoodForm',
  setup(_, { emit }) {
    const { addMoodEntry } = useMoodStore()
    const mood = ref('')
    const note = ref('')
    const errors = ref({})
    const noteMaxLength = 200

    const validate = () => {
      errors.value = {}
      if (!mood.value) {
        errors.value.mood = 'Mood is required.'
      }
      if (note.value.length > noteMaxLength) {
        errors.value.note = `Note must be less than ${noteMaxLength} characters.`
      }
      return Object.keys(errors.value).length === 0
    }

    const onSubmit = () => {
      if (validate()) {
        const entry = {
          mood: mood.value,
          note: note.value,
          date: new Date()
        }
        addMoodEntry(entry)
        emit('save-mood', entry)
        mood.value = ''
        note.value = ''
        errors.value = {}
      }
    }

    return {
      mood,
      note,
      errors,
      noteMaxLength,
      onSubmit
    }
  }
}
</script>
