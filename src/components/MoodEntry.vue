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
                            @click.prevent="openEditModal"
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

    <!-- Edit Modal -->
    <div :id="`edit-modal-${index}`" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Edit Mood Entry
            </h3>
            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" :data-modal-hide="`edit-modal-${index}`" @click="closeEditModal">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <form @submit.prevent="saveEdit">
            <div class="p-4 md:p-5 space-y-4">
              <div>
                <label for="edit-mood" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Mood</label>
                <select id="edit-mood" v-model="editMood" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                  <option value="happy">😊 Happy</option>
                  <option value="sad">😢 Sad</option>
                  <option value="neutral">😐 Neutral</option>
                  <option value="excited">🤩 Excited</option>
                  <option value="tired">😴 Tired</option>
                </select>
              </div>
              <div>
                <label for="edit-note" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Note</label>
                <textarea id="edit-note" v-model="editNote" maxlength="200" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"></textarea>
                <span class="text-xs text-gray-400 ml-auto block text-right">{{ editNote.length }}/200</span>
              </div>
            </div>
            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
              <button type="button" @click="closeEditModal" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useDateFormatter } from '../composables/useDateFormatter'
import { useModal } from '../composables/useModal'
import { useDropdown } from '../composables/useDropdown'
import { useMoodStore } from '../composables/useMoodStore'

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
  setup(props, { emit }) {
    const { formatDate } = useDateFormatter()
    const { showModal, hideModal } = useModal(`edit-modal-${props.index}`)
    const { hideDropdown } = useDropdown(
      `dropdownMood${props.index}Button`,
      `dropdownMood${props.index}`
    )
    const { getMoodEmoji } = useMoodStore()

    const editMood = ref(props.entry.mood)
    const editNote = ref(props.entry.note || '')

    const deleteEntry = () => {
      hideDropdown()
      emit('delete-entry', props.index)
    }

    const openEditModal = () => {
      editMood.value = props.entry.mood
      editNote.value = props.entry.note || ''
      showModal()
      hideDropdown()
    }

    const saveEdit = () => {
      emit('edit-entry', {
        index: props.index,
        mood: editMood.value,
        note: editNote.value
      })
      hideModal()
    }

    return {
      formatDate,
      getMoodEmoji,
      editMood,
      editNote,
      deleteEntry,
      openEditModal,
      closeEditModal: hideModal,
      saveEdit
    }
  }
}
</script>
