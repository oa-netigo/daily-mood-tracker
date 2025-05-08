<template>
  <AppHeader />
  <section class="bg-white pb-16 antialiased dark:bg-gray-900">
    <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
      <div class="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
        <MoodForm @save-mood="saveMood" />
        <MoodHistory :entries="moodEntries" @delete-entry="deleteEntry" />
      </div>
    </div>
  </section>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import MoodForm from './components/MoodForm.vue'
import MoodHistory from './components/MoodHistory.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    MoodForm,
    MoodHistory
  },
  data() {
    return {
      moodEntries: []
    }
  },
  methods: {
    saveMood(moodData) {
      this.moodEntries.unshift(moodData)
      this.saveToLocalStorage()
    },
    deleteEntry(index) {
      this.moodEntries.splice(index, 1)
      this.saveToLocalStorage()
    },
    saveToLocalStorage() {
      localStorage.setItem('moodEntries', JSON.stringify(this.moodEntries))
    },
    loadFromLocalStorage() {
      const savedEntries = localStorage.getItem('moodEntries')
      if (savedEntries) {
        this.moodEntries = JSON.parse(savedEntries)
      }
    }
  },
  created() {
    this.loadFromLocalStorage()
  }
}
</script>
