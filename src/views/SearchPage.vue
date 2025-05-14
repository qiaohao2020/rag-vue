<template>
  <div class="search-page">
    <div class="search-header">
      <h2>内容检索</h2>
      <div class="search-box">
        <el-input
          v-model="searchQuery"
          placeholder="请输入关键词搜索..."
          class="search-input"
          clearable
          @keyup.enter="handleSearch"
        >
          <template #prefix>
            <el-icon><search /></el-icon>
          </template>
          <template #append>
            <el-button @click="handleSearch">
              <el-icon><search /></el-icon>
              搜索
            </el-button>
          </template>
        </el-input>
        
        <div class="search-filters">
          <el-select v-model="searchType" placeholder="搜索类型" class="filter-item">
            <el-option label="全部" value="all" />
            <el-option label="标题" value="title" />
            <el-option label="内容" value="content" />
            <el-option label="标签" value="tags" />
          </el-select>
          
          <el-select v-model="timeRange" placeholder="时间范围" class="filter-item">
            <el-option label="全部时间" value="all" />
            <el-option label="最近一周" value="week" />
            <el-option label="最近一月" value="month" />
            <el-option label="最近三月" value="quarter" />
          </el-select>
        </div>
      </div>
    </div>

    <div class="search-results" v-if="searchResults.length > 0">
      <el-card v-for="item in searchResults" 
               :key="item.id" 
               class="result-card"
               shadow="hover">
        <template #header>
          <div class="result-header">
            <h3 class="result-title">{{ item.title }}</h3>
            <div class="result-meta">
              <el-tag size="small" type="info">{{ item.type }}</el-tag>
              <span class="result-time">{{ item.updateTime }}</span>
            </div>
          </div>
        </template>
        
        <div class="result-content">
          <p class="result-excerpt">{{ item.excerpt }}</p>
          <div class="result-tags" v-if="item.tags && item.tags.length">
            <el-tag 
              v-for="tag in item.tags" 
              :key="tag"
              size="small"
              class="tag-item"
            >
              {{ tag }}
            </el-tag>
          </div>
        </div>
        
        <div class="result-footer">
          <el-button type="primary" link @click="viewDetail(item)">
            <el-icon><view /></el-icon>
            查看详情
          </el-button>
          <el-button type="primary" link @click="addToKnowledge(item)">
            <el-icon><plus /></el-icon>
            添加到知识库
          </el-button>
        </div>
      </el-card>
    </div>

    <el-empty v-else-if="hasSearched" description="未找到相关内容" />

    <!-- 分页 -->
    <div class="pagination" v-if="searchResults.length > 0">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  Search, 
  View, 
  Plus 
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// 搜索相关
const searchQuery = ref('')
const searchType = ref('all')
const timeRange = ref('all')
const hasSearched = ref(false)

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 模拟搜索结果数据
const searchResults = ref([
  {
    id: 1,
    title: '产品使用手册',
    type: '文档',
    updateTime: '2024-03-20',
    excerpt: '这是一份详细的产品使用说明文档，包含了产品的所有功能和使用方法...',
    tags: ['使用指南', '产品文档', '手册']
  },
  {
    id: 2,
    title: '技术架构说明',
    type: '技术文档',
    updateTime: '2024-03-19',
    excerpt: '本文档详细说明了系统的技术架构设计，包括前端、后端、数据库等各个部分...',
    tags: ['架构', '技术文档', '设计']
  }
])

// 处理搜索
const handleSearch = () => {
  if (!searchQuery.value.trim()) {
    ElMessage.warning('请输入搜索关键词')
    return
  }
  
  hasSearched.value = true
  // TODO: 实现搜索逻辑
  console.log('搜索条件:', {
    query: searchQuery.value,
    type: searchType.value,
    timeRange: timeRange.value,
    page: currentPage.value,
    pageSize: pageSize.value
  })
}

// 查看详情
const viewDetail = (item: any) => {
  // TODO: 实现查看详情逻辑
  console.log('查看详情:', item)
}

// 添加到知识库
const addToKnowledge = (item: any) => {
  // TODO: 实现添加到知识库逻辑
  ElMessage.success('已添加到知识库')
}

// 处理分页
const handleSizeChange = (val: number) => {
  pageSize.value = val
  handleSearch()
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  handleSearch()
}
</script>

<style scoped>
.search-page {
  padding: 20px;
}

.search-header {
  margin-bottom: 20px;
}

.search-header h2 {
  margin: 0 0 20px 0;
  color: #2c3e50;
}

.search-box {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.search-input {
  width: 100%;
  max-width: 600px;
}

.search-filters {
  display: flex;
  gap: 15px;
}

.filter-item {
  width: 150px;
}

.search-results {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}

.result-card {
  transition: all 0.3s;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.result-title {
  margin: 0;
  font-size: 1.1em;
  color: #2c3e50;
}

.result-meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.result-time {
  color: #909399;
  font-size: 0.9em;
}

.result-content {
  margin: 10px 0;
}

.result-excerpt {
  color: #606266;
  margin: 0 0 10px 0;
  line-height: 1.5;
}

.result-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-item {
  margin-right: 5px;
}

.result-footer {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 10px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style> 