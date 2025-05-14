<template>
  <div class="settings-page">
    <h1>系统设置</h1>
    
    <el-card class="settings-card">
      <template #header>
        <div class="card-header">
          <span>基本设置</span>
        </div>
      </template>
      
      <el-form :model="settings" label-width="120px">
        <!-- 主题设置 -->
        <el-form-item label="主题模式">
          <el-switch
            v-model="settings.theme"
            active-text="深色"
            inactive-text="浅色"
            @change="handleThemeChange"
          />
        </el-form-item>

        <!-- 语言设置 -->
        <el-form-item label="界面语言">
          <el-select v-model="settings.language" @change="handleLanguageChange">
            <el-option label="中文" value="zh" />
            <el-option label="English" value="en" />
            <el-option label="한국어" value="ko" />
          </el-select>
        </el-form-item>

        <!-- 字体大小设置 -->
        <el-form-item label="字体大小">
          <el-slider
            v-model="settings.fontSize"
            :min="12"
            :max="20"
            :step="1"
            show-input
            @change="handleFontSizeChange"
          />
        </el-form-item>

        <!-- 历史记录设置 -->
        <el-form-item label="历史记录">
          <el-switch
            v-model="settings.history"
            active-text="保存"
            inactive-text="不保存"
          />
        </el-form-item>

        <!-- 自动保存设置 -->
        <el-form-item label="自动保存">
          <el-switch
            v-model="settings.autoSave"
            active-text="开启"
            inactive-text="关闭"
          />
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 高级设置卡片 -->
    <el-card class="settings-card">
      <template #header>
        <div class="card-header">
          <span>高级设置</span>
        </div>
      </template>
      
      <el-form :model="advancedSettings" label-width="120px">
        <!-- API设置 -->
        <el-form-item label="API地址">
          <el-input v-model="advancedSettings.apiUrl" placeholder="请输入API地址" />
        </el-form-item>

        <!-- 超时设置 -->
        <el-form-item label="请求超时">
          <el-input-number 
            v-model="advancedSettings.timeout" 
            :min="1000" 
            :max="30000" 
            :step="1000"
          />
          <span class="unit-text">毫秒</span>
        </el-form-item>

        <!-- 缓存设置 -->
        <el-form-item label="缓存大小">
          <el-input-number 
            v-model="advancedSettings.cacheSize" 
            :min="100" 
            :max="1000" 
            :step="100"
          />
          <span class="unit-text">MB</span>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 保存按钮 -->
    <div class="settings-actions">
      <el-button type="primary" @click="saveSettings">保存设置</el-button>
      <el-button @click="resetSettings">重置默认</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

const { t, locale } = useI18n()

const settings = ref({
  theme: 'light',
  language: 'zh',
  fontSize: 14,
  history: true,
  autoSave: true,
  apiUrl: 'http://localhost:3000',
  timeout: 5000,
  cacheSize: 100
})

const advancedSettings = ref({
  apiUrl: 'http://localhost:3000',
  timeout: 5000,
  cacheSize: 500
})

const handleLanguageChange = (value: string) => {
  locale.value = value
  localStorage.setItem('language', value)
}

const handleThemeChange = (value: string) => {
  settings.value.theme = value
  // 实现主题切换逻辑
}

const handleFontSizeChange = (value: number) => {
  // TODO: 实现字体大小调整逻辑
  console.log('字体大小:', value)
}

const saveSettings = () => {
  // 实现保存设置逻辑
  console.log('保存设置:', settings.value)
  ElMessage.success('设置已保存')
}

const resetSettings = () => {
  settings.value = {
    theme: 'light',
    language: 'zh',
    fontSize: 14,
    history: true,
    autoSave: true,
    apiUrl: 'http://localhost:3000',
    timeout: 5000,
    cacheSize: 100
  }
  
  advancedSettings.value = {
    apiUrl: 'http://localhost:3000',
    timeout: 5000,
    cacheSize: 500
  }
  
  ElMessage.success('设置已重置为默认值')
}
</script>

<style scoped>
.settings-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.settings-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.unit-text {
  margin-left: 10px;
  color: #909399;
}

.settings-actions {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

:deep(.el-form-item) {
  margin-bottom: 22px;
}

:deep(.el-card__header) {
  padding: 15px 20px;
  font-weight: bold;
}
</style> 