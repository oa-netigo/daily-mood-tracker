<template>
  <div class="app">
    <h1>Daily Mood Tracker</h1>

    <!-- Mood Entry Form -->
    <div>
      <h2>How are you feeling today?</h2>
      <div>
        <label for="mood">Select your mood:</label>
        <select id="mood" v-model="newMood.mood">
          <option value="">Choose a mood</option>
          <option value="happy">😊 Happy</option>
          <option value="sad">😢 Sad</option>
          <option value="neutral">😐 Neutral</option>
          <option value="excited">🤩 Excited</option>
          <option value="tired">😴 Tired</option>
        </select>
      </div>

      <div>
        <label for="note">Add a note (optional):</label>
        <textarea id="note" v-model="newMood.note" placeholder="How was your day?"></textarea>
      </div>

      <button @click="saveMood" :disabled="!newMood.mood">Save Mood</button>
    </div>

    <!-- Mood History -->
    <div class="mood-history" v-if="moodEntries.length > 0">
      <h2>Your Mood History</h2>
      <div class="mood-list">
        <div v-for="(entry, index) in moodEntries" :key="index" class="mood-entry">
          <div class="mood-date">{{ formatDate(entry.date) }}</div>
          <div class="mood-emoji">
            {{ getMoodEmoji(entry.mood) }}
          </div>
          <div class="mood-note" v-if="entry.note">{{ entry.note }}</div>
        </div>
      </div>
    </div>

    <div v-else class="no-entries">
      <p>No mood entries yet. Start tracking your mood!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      newMood: {
        mood: '',
        note: '',
        date: new Date(),
      },
      moodEntries: [],
    }
  },
  methods: {
    saveMood() {
      if (this.newMood.mood) {
        this.moodEntries.unshift({
          ...this.newMood,
          date: new Date(),
        })
        this.newMood = {
          mood: '',
          note: '',
          date: new Date(),
        }
      }
    },
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
  },
}
</script>

<style></style>
