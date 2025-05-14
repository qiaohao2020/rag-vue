<template>
  <div class="qa-page">
    <h1>问答页面</h1>
    <div class="qa-container">
      <div class="question-input">
        <el-input
          v-model="question"
          type="textarea"
          :rows="3"
          placeholder="请输入您的问题..."
        />
        <el-button type="primary" @click="submitQuestion">
          <el-icon><position /></el-icon>
          提交问题
        </el-button>
      </div>
      
      <!-- 历史记录部分 -->
      <div class="history-section">
        <div class="history-header">
          <h3>历史记录</h3>
          <el-button 
            type="danger" 
            size="small" 
            @click="clearHistory"
            :disabled="!historyList.length"
          >
            <el-icon><delete /></el-icon>
            清空历史
          </el-button>
        </div>
        
        <el-timeline v-if="historyList.length">
          <el-timeline-item
            v-for="(item, index) in historyList"
            :key="index"
            :timestamp="item.timestamp"
            placement="top"
          >
            <el-card class="history-card">
              <div class="history-item">
                <div class="question">
                  <strong>问：</strong>
                  <span>{{ item.question }}</span>
                </div>
                <div class="answer" v-if="item.answer">
                  <strong>答：</strong>
                  <span>{{ item.answer }}</span>
                </div>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
        
        <el-empty v-else description="暂无历史记录" />
      </div>

      <div class="answer-display" v-if="answer">
        <h3>回答：</h3>
        <p>{{ answer }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { 
  Position, 
  Delete 
} from '@element-plus/icons-vue'

interface HistoryItem {
  question: string
  answer: string
  timestamp: string
}

const question = ref('')
const answer = ref('')
const historyList = ref<HistoryItem[]>([])

const formatDate = (date: Date) => {
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

const submitQuestion = () => {
  if (!question.value.trim()) {
    ElMessage.warning('请输入问题')
    return
  }
  
  // TODO: 实现问题提交逻辑
  console.log('提交问题:', question.value)
  
  // 添加到历史记录
  historyList.value.unshift({
    question: question.value,
    answer: '这是模拟的回答...', // 这里替换为实际的回答
    timestamp: formatDate(new Date())
  })
  
  // 清空当前问题
  question.value = ''
}

const clearHistory = () => {
  ElMessageBox.confirm(
    '确定要清空所有历史记录吗？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    historyList.value = []
    ElMessage.success('历史记录已清空')
  }).catch(() => {})
}
</script>

<style scoped>
.qa-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.qa-container {
  margin-top: 20px;
}

.question-input {
  margin-bottom: 20px;
}

.question-input .el-button {
  margin-top: 10px;
}

.answer-display {
  background-color: #f5f7fa;
  padding: 20px;
  border-radius: 4px;
  margin-top: 20px;
}

.history-section {
  margin-top: 30px;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.history-header h3 {
  margin: 0;
}

.history-card {
  margin-bottom: 10px;
}

.history-item {
  .question {
    margin-bottom: 10px;
    color: #303133;
  }
  
  .answer {
    color: #606266;
  }
  
  strong {
    color: #409EFF;
  }
}
</style> 