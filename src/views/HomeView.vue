<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="home-container">
    <el-card class="welcome-card">
      <template #header>
        <div class="card-header">
          <h2>{{ t('home.welcome') }}</h2>
        </div>
      </template>
      <div class="project-info">
        <div class="info-section">
          <h3>{{ t('home.projectName') }}</h3>
          <p>RAG-Vue Q&A Knowledge Base</p>
        </div>
        
        <div class="info-section">
          <h3>{{ t('home.projectDescription') }}</h3>
          <p>{{ t('home.description') }}</p>
        </div>

        <div class="info-section">
          <h3>{{ t('home.features') }}</h3>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-card shadow="hover" class="feature-card">
                <el-icon class="feature-icon"><ChatDotRound /></el-icon>
                <h4>{{ t('home.featureQA') }}</h4>
                <p>{{ t('home.featureQADesc') }}</p>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover" class="feature-card">
                <el-icon class="feature-icon"><Collection /></el-icon>
                <h4>{{ t('home.featureKnowledge') }}</h4>
                <p>{{ t('home.featureKnowledgeDesc') }}</p>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover" class="feature-card">
                <el-icon class="feature-icon"><Search /></el-icon>
                <h4>{{ t('home.featureSearch') }}</h4>
                <p>{{ t('home.featureSearchDesc') }}</p>
              </el-card>
            </el-col>
          </el-row>
        </div>

        <div class="info-section">
          <h3>{{ t('home.quickStart') }}</h3>
          <el-steps :active="1" finish-status="success" simple>
            <el-step :title="t('home.step1')" :description="t('home.step1Desc')" />
            <el-step :title="t('home.step2')" :description="t('home.step2Desc')" />
            <el-step :title="t('home.step3')" :description="t('home.step3Desc')" />
          </el-steps>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.home-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-info {
  padding: 20px 0;
}

.info-section {
  margin-bottom: 40px;
}

.info-section h3 {
  color: #409EFF;
  margin-bottom: 20px;
  font-size: 1.5em;
}

.feature-card {
  height: 100%;
  text-align: center;
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 2.5em;
  color: #409EFF;
  margin-bottom: 15px;
}

.feature-card h4 {
  color: #303133;
  margin-bottom: 10px;
}

.feature-card p {
  color: #606266;
  font-size: 0.9em;
}

:deep(.el-steps) {
  margin-top: 20px;
}
</style>
