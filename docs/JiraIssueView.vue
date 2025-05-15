<template>
  <div class="jira-issue-container">
    <!-- 左侧Jira Issue列表 -->
    <div class="left-panel">
      <div class="search-box">
        <el-input
          v-model="searchQuery"
          placeholder="搜索Jira Issue"
          clearable
          @clear="handleSearch"
          @input="handleSearch"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>
      <el-scrollbar height="calc(100vh - 60px)">
        <el-table
          :data="filteredIssues"
          style="width: 100%"
          @row-click="handleIssueSelect"
          highlight-current-row
        >
          <el-table-column prop="key" label="Key" width="100" />
          <el-table-column prop="summary" label="Summary" />
        </el-table>
      </el-scrollbar>
    </div>

    <!-- 中间Issue详情 -->
    <div class="middle-panel">
      <div v-if="selectedIssue" class="issue-details">
        <h2>{{ selectedIssue.key }} - {{ selectedIssue.summary }}</h2>
        <el-descriptions :column="1" border>
          <el-descriptions-item label="状态">{{ selectedIssue.status }}</el-descriptions-item>
          <el-descriptions-item label="优先级">{{ selectedIssue.priority }}</el-descriptions-item>
          <el-descriptions-item label="描述">{{ selectedIssue.description }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <div v-else class="no-selection">
        <el-empty description="请选择一个Jira Issue" />
      </div>
    </div>

    <!-- 右侧操作区域 -->
    <div class="right-panel">
      <el-card class="operation-card">
        <template #header>
          <div class="card-header">
            <span>操作面板</span>
          </div>
        </template>
        <el-button type="primary" @click="getReleaseList" :disabled="!selectedIssue">
          获取Release列表
        </el-button>
        <el-button type="success" @click="getScreenshots" :disabled="!selectedIssue">
          获取截图
        </el-button>
        <el-button type="warning" @click="generateTestCases" :disabled="!selectedIssue">
          生成测试用例
        </el-button>
        <el-button type="info" @click="generateExcelReport" :disabled="!selectedIssue">
          生成Excel报告
        </el-button>
      </el-card>

      <!-- 操作结果展示区域 -->
      <el-card class="result-card">
        <template #header>
          <div class="card-header">
            <span>操作结果</span>
          </div>
        </template>
        <div v-if="operationResult" class="result-content">
          <pre>{{ operationResult }}</pre>
        </div>
        <div v-else class="no-result">
          <el-empty description="暂无操作结果" />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const searchQuery = ref('')
const issues = ref([])
const selectedIssue = ref(null)
const operationResult = ref('')

// 模拟数据
const mockIssues = [
  {
    key: 'PROJ-123',
    summary: '实现用户登录功能',
    status: '进行中',
    priority: '高',
    description: '需要实现用户登录功能，包括用户名密码验证和JWT token生成'
  },
  {
    key: 'PROJ-124',
    summary: '优化数据库查询性能',
    status: '待处理',
    priority: '中',
    description: '需要优化现有数据库查询，提高响应速度'
  }
]

issues.value = mockIssues

const filteredIssues = computed(() => {
  if (!searchQuery.value) return issues.value
  return issues.value.filter(issue => 
    issue.key.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    issue.summary.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const handleSearch = () => {
  // 实际项目中这里应该调用API进行搜索
  console.log('Searching for:', searchQuery.value)
}

const handleIssueSelect = (row) => {
  selectedIssue.value = row
}

const getReleaseList = async () => {
  try {
    // 调用API获取Release列表
    operationResult.value = '正在获取Release列表...'
    ElMessage.success('Release列表获取成功')
  } catch (error) {
    ElMessage.error('获取Release列表失败')
  }
}

const getScreenshots = async () => {
  try {
    // 调用API获取截图
    operationResult.value = '正在获取截图...'
    ElMessage.success('截图获取成功')
  } catch (error) {
    ElMessage.error('获取截图失败')
  }
}

const generateTestCases = async () => {
  try {
    // 调用API生成测试用例
    operationResult.value = '正在生成测试用例...'
    ElMessage.success('测试用例生成成功')
  } catch (error) {
    ElMessage.error('生成测试用例失败')
  }
}

const generateExcelReport = async () => {
  try {
    // 调用API生成Excel报告
    operationResult.value = '正在生成Excel报告...'
    ElMessage.success('Excel报告生成成功')
  } catch (error) {
    ElMessage.error('生成Excel报告失败')
  }
}
</script>

<style scoped>
.jira-issue-container {
  display: flex;
  height: 100vh;
  padding: 20px;
  gap: 20px;
}

.left-panel {
  width: 300px;
  border-right: 1px solid #dcdfe6;
}

.middle-panel {
  flex: 1;
  padding: 0 20px;
}

.right-panel {
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.search-box {
  margin-bottom: 20px;
}

.issue-details {
  padding: 20px;
}

.operation-card {
  margin-bottom: 20px;
}

.operation-card .el-button {
  width: 100%;
  margin-bottom: 10px;
}

.result-card {
  flex: 1;
}

.result-content {
  max-height: 300px;
  overflow-y: auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.no-selection, .no-result {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style> 