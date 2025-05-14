<template>
  <div class="issue-analysis">
    <div class="header">
      <h2>{{ t('issue.title') }}</h2>
    </div>

    <div class="content">
      <!-- 左侧输入区域 -->
      <div class="input-section">
        <div class="history-button">
          <el-dropdown @command="handleHistorySelect">
            <el-button type="primary">
              <el-icon><Clock /></el-icon>
              {{ t('issue.historyData') }}
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item 
                  v-for="item in historyData" 
                  :key="item.id"
                  :command="item"
                >
                  {{ item.title }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

        <el-form 
          ref="formRef"
          :model="form"
          :rules="rules"
          label-width="100px"
          class="issue-form"
        >
          <el-form-item :label="t('issue.issueNumber')" prop="issueNumber">
            <el-input v-model="form.issueNumber" :placeholder="t('issue.inputIssueNumber')" />
          </el-form-item>

          <el-form-item :label="t('issue.title')" prop="title">
            <el-input v-model="form.title" :placeholder="t('issue.inputTitle')" />
          </el-form-item>

          <el-form-item :label="t('issue.description')" prop="description">
            <el-input
              v-model="form.description"
              type="textarea"
              :rows="4"
              :placeholder="t('issue.inputDescription')"
            />
          </el-form-item>

          <el-form-item :label="t('issue.system')" prop="system">
            <el-select v-model="form.system" :placeholder="t('issue.selectSystem')">
              <el-option
                v-for="item in systemOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item :label="t('issue.category')" prop="category">
            <el-select v-model="form.category" :placeholder="t('issue.selectCategory')">
              <el-option
                v-for="item in categoryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleAnalyze" :loading="analyzing">
              {{ t('issue.analyze') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 右侧分析结果区域 -->
      <div class="result-section">
        <el-card v-if="analysisResult" class="result-card">
          <template #header>
            <div class="card-header">
              <span>{{ t('issue.analysisResult') }}</span>
            </div>
          </template>

          <el-tabs>
            <el-tab-pane :label="t('issue.translation')">
              <div class="translation-content">
                <div class="language-section">
                  <h4>{{ t('issue.chinese') }}</h4>
                  <p>{{ analysisResult.translation.zh }}</p>
                </div>
                <div class="language-section">
                  <h4>{{ t('issue.english') }}</h4>
                  <p>{{ analysisResult.translation.en }}</p>
                </div>
              </div>
            </el-tab-pane>

            <el-tab-pane :label="t('issue.relatedInfo')">
              <div class="related-info">
                <el-timeline>
                  <el-timeline-item
                    v-for="(item, index) in analysisResult.relatedInfo"
                    :key="index"
                    :timestamp="item.time"
                    placement="top"
                  >
                    <el-card>
                      <h4>{{ item.title }}</h4>
                      <p>{{ item.description }}</p>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>

        <el-empty v-else :description="t('issue.noHistoryData')" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { Clock } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'

const { t } = useI18n()

// 表单数据
const formRef = ref<FormInstance>()
const form = reactive({
  issueNumber: '',
  title: '',
  description: '',
  system: '',
  category: ''
})

// 表单验证规则
const rules = reactive<FormRules>({
  issueNumber: [
    { required: true, message: t('issue.inputIssueNumber'), trigger: 'blur' }
  ],
  title: [
    { required: true, message: t('issue.inputTitle'), trigger: 'blur' }
  ],
  description: [
    { required: true, message: t('issue.inputDescription'), trigger: 'blur' }
  ],
  system: [
    { required: true, message: t('issue.selectSystem'), trigger: 'change' }
  ],
  category: [
    { required: true, message: t('issue.selectCategory'), trigger: 'change' }
  ]
})

// 系统选项
const systemOptions = [
  { value: 'system1', label: '系统一' },
  { value: 'system2', label: '系统二' },
  { value: 'system3', label: '系统三' }
]

// 分类选项
const categoryOptions = [
  { value: 'bug', label: 'Bug' },
  { value: 'feature', label: '新功能' },
  { value: 'improvement', label: '改进' },
  { value: 'question', label: '问题' }
]

// 历史数据
const historyData = [
  {
    id: 1,
    title: '系统登录失败问题',
    issueNumber: 'ISSUE-001',
    description: '用户无法登录系统，显示密码错误',
    system: 'system1',
    category: 'bug'
  },
  {
    id: 2,
    title: '新增数据导出功能',
    issueNumber: 'ISSUE-002',
    description: '需要支持将数据导出为Excel格式',
    system: 'system2',
    category: 'feature'
  }
]

// 分析状态
const analyzing = ref(false)
const analysisResult = ref<any>(null)

// 处理历史数据选择
const handleHistorySelect = (item: any) => {
  form.issueNumber = item.issueNumber
  form.title = item.title
  form.description = item.description
  form.system = item.system
  form.category = item.category
}

// 处理分析
const handleAnalyze = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid) => {
    if (valid) {
      analyzing.value = true
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // 模拟分析结果
        analysisResult.value = {
          translation: {
            zh: form.description,
            en: 'This is English translation of the description'
          },
          relatedInfo: [
            {
              title: '相关Issue-1',
              description: '这是一个相关的Issue描述',
              time: '2024-03-20 10:00:00'
            },
            {
              title: '相关Issue-2',
              description: '这是另一个相关的Issue描述',
              time: '2024-03-19 15:30:00'
            }
          ]
        }
        
        ElMessage.success(t('issue.analyzeSuccess'))
      } catch (error) {
        ElMessage.error(t('issue.analyzeFailed'))
      } finally {
        analyzing.value = false
      }
    }
  })
}
</script>

<style scoped>
.issue-analysis {
  padding: 20px;
  height: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header h2 {
  margin: 0;
  color: var(--el-text-color-primary);
}

.content {
  display: flex;
  gap: 20px;
  height: calc(100% - 60px);
}

.input-section {
  flex: 1;
  padding: 20px;
  background: var(--el-bg-color);
  border-radius: 4px;
  box-shadow: var(--el-box-shadow-light);
}

.history-button {
  margin-bottom: 20px;
}

.issue-form {
  max-width: 600px;
}

.result-section {
  flex: 1;
  padding: 20px;
  background: var(--el-bg-color);
  border-radius: 4px;
  box-shadow: var(--el-box-shadow-light);
}

.result-card {
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.translation-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.language-section {
  padding: 10px;
  background: var(--el-bg-color-page);
  border-radius: 4px;
}

.language-section h4 {
  margin: 0 0 10px 0;
  color: var(--el-text-color-primary);
}

.language-section p {
  margin: 0;
  color: var(--el-text-color-regular);
  line-height: 1.6;
}

.related-info {
  padding: 10px;
}

:deep(.el-timeline-item__content) {
  h4 {
    margin: 0 0 10px 0;
    color: var(--el-text-color-primary);
  }
  
  p {
    margin: 0;
    color: var(--el-text-color-regular);
  }
}
</style> 