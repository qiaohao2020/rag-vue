<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'

const question = ref('')
const chatHistory = ref<Array<{type: 'user' | 'assistant', content: string}>>([])
const activePath = ref('/')

const handleSubmit = () => {
  if (!question.value.trim()) return
  
  chatHistory.value.push({
    type: 'user',
    content: question.value
  })
  
  question.value = ''
}
</script>

<template>
  <div class="app-container">
    <Sidebar v-model:activePath="activePath" />

    <!-- 主内容区 -->
    <div class="main-content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.main-content {
  flex: 1;
  background: #f0f2f5;
  overflow-y: auto;
}
</style>
