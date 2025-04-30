<template>
  <div class="app">
    <h1>Daily Mood Tracker</h1>

    <!-- Mood Entry Form -->
    <div class="mood-form">
      <h2>How are you feeling today?</h2>
      <div class="form-group">
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

      <div class="form-group">
        <label for="note">Add a note (optional):</label>
        <textarea id="note" v-model="newMood.note" placeholder="How was your day?"></textarea>
      </div>

      <button @click="saveMood" :disabled="!newMood.mood" class="save-button">Save Mood</button>
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

<style>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #2c3e50;
}

.mood-form {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

select,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

.save-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
}

.save-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.mood-history {
  margin-top: 2rem;
}

.mood-list {
  display: grid;
  gap: 1rem;
}

.mood-entry {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #42b983;
}

.mood-date {
  font-weight: bold;
  color: #2c3e50;
}

.mood-emoji {
  font-size: 2rem;
  margin: 0.5rem 0;
}

.mood-note {
  color: #666;
  margin-top: 0.5rem;
}

.no-entries {
  text-align: center;
  color: #666;
  margin-top: 2rem;
}
</style>
