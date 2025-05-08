import { ref, computed } from 'vue'

export function useMoodStore() {
  const moodEntries = ref([])

  const getMoodEmoji = (mood) => {
    const emojis = {
      happy: '😊',
      sad: '😢',
      neutral: '😐',
      excited: '🤩',
      tired: '😴',
    }
    return emojis[mood] || ''
  }

  const addMoodEntry = (entry) => {
    moodEntries.value.unshift({
      ...entry,
      date: new Date().toISOString()
    })
  }

  const editMoodEntry = (index, updatedEntry) => {
    if (index >= 0 && index < moodEntries.value.length) {
      moodEntries.value[index] = {
        ...moodEntries.value[index],
        ...updatedEntry
      }
    }
  }

  const deleteMoodEntry = (index) => {
    if (index >= 0 && index < moodEntries.value.length) {
      moodEntries.value.splice(index, 1)
    }
  }

  const sortedEntries = computed(() => {
    return [...moodEntries.value].sort((a, b) =>
      new Date(b.date) - new Date(a.date)
    )
  })

  return {
    moodEntries,
    sortedEntries,
    getMoodEmoji,
    addMoodEntry,
    editMoodEntry,
    deleteMoodEntry
  }
}
