<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { 
  UploadFilled, 
  Plus, 
  Edit, 
  Delete 
} from '@element-plus/icons-vue'

const knowledgeList = ref([
  {
    id: 1,
    title: '产品使用手册',
    description: '详细的产品使用说明和功能介绍',
    updateTime: '2024-03-20'
  },
  {
    id: 2,
    title: '常见问题解答',
    description: '用户常见问题的解决方案',
    updateTime: '2024-03-19'
  },
  {
    id: 3,
    title: '技术文档',
    description: '技术架构和开发文档',
    updateTime: '2024-03-18'
  }
])

// 导入对话框相关
const importDialogVisible = ref(false)
const activeImportTab = ref('file')

// 数据库导入表单
const dbImportForm = ref({
  dbType: 'mysql',
  host: 'localhost',
  port: 3306,
  database: '',
  username: '',
  password: '',
  table: ''
})

// 显示导入对话框
const showImportDialog = () => {
  importDialogVisible.value = true
}

// 文件上传前的验证
const beforeFileUpload = (file: File) => {
  const isValidType = ['.txt', '.md', '.doc', '.docx'].some(ext => 
    file.name.toLowerCase().endsWith(ext)
  )
  if (!isValidType) {
    ElMessage.error('只能上传 txt、md、doc、docx 格式的文件！')
    return false
  }
  return true
}

// 文件上传成功处理
const handleFileSuccess = (response: any) => {
  ElMessage.success('文件上传成功')
  // TODO: 处理上传成功后的逻辑
}

// 文件上传失败处理
const handleFileError = () => {
  ElMessage.error('文件上传失败')
}

// 处理导入
const handleImport = async () => {
  if (activeImportTab.value === 'file') {
    // 文件导入逻辑已在 el-upload 组件中处理
    return
  }
  
  // 数据库导入
  try {
    // TODO: 实现数据库导入逻辑
    ElMessage.success('数据库导入成功')
    importDialogVisible.value = false
  } catch (error) {
    ElMessage.error('数据库导入失败')
  }
}
</script>

<template>
  <div class="knowledge-container">
    <div class="header">
      <h2>知识库管理</h2>
      <div class="header-actions">
        <el-button type="primary" @click="showImportDialog">
          <el-icon><upload-filled /></el-icon>
          导入知识库
        </el-button>
        <el-button type="primary">
          <el-icon><plus /></el-icon>
          添加文档
        </el-button>
      </div>
    </div>

    <div class="content">
      <el-card v-for="item in knowledgeList" 
               :key="item.id" 
               class="knowledge-card">
        <template #header>
          <div class="card-header">
            <span>{{ item.title }}</span>
            <div class="operations">
              <el-button type="primary" link>
                <el-icon><edit /></el-icon>
                编辑
              </el-button>
              <el-button type="danger" link>
                <el-icon><delete /></el-icon>
                删除
              </el-button>
            </div>
          </div>
        </template>
        <div class="card-content">
          <p class="description">{{ item.description }}</p>
          <p class="update-time">更新时间：{{ item.updateTime }}</p>
        </div>
      </el-card>
    </div>

    <!-- 导入对话框 -->
    <el-dialog
      v-model="importDialogVisible"
      title="导入知识库"
      width="500px"
    >
      <el-tabs v-model="activeImportTab">
        <el-tab-pane label="从文本文件导入" name="file">
          <el-upload
            class="upload-demo"
            drag
            action="/api/knowledge/import/file"
            :on-success="handleFileSuccess"
            :on-error="handleFileError"
            :before-upload="beforeFileUpload"
            accept=".txt,.md,.doc,.docx"
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                支持 .txt、.md、.doc、.docx 格式文件
              </div>
            </template>
          </el-upload>
        </el-tab-pane>
        
        <el-tab-pane label="从数据库导入" name="database">
          <el-form :model="dbImportForm" label-width="100px">
            <el-form-item label="数据库类型">
              <el-select v-model="dbImportForm.dbType" placeholder="请选择数据库类型">
                <el-option label="MySQL" value="mysql" />
                <el-option label="PostgreSQL" value="postgresql" />
                <el-option label="SQLite" value="sqlite" />
              </el-select>
            </el-form-item>
            
            <el-form-item label="主机地址">
              <el-input v-model="dbImportForm.host" placeholder="请输入数据库主机地址" />
            </el-form-item>
            
            <el-form-item label="端口">
              <el-input-number v-model="dbImportForm.port" :min="1" :max="65535" />
            </el-form-item>
            
            <el-form-item label="数据库名">
              <el-input v-model="dbImportForm.database" placeholder="请输入数据库名称" />
            </el-form-item>
            
            <el-form-item label="用户名">
              <el-input v-model="dbImportForm.username" placeholder="请输入用户名" />
            </el-form-item>
            
            <el-form-item label="密码">
              <el-input v-model="dbImportForm.password" type="password" placeholder="请输入密码" />
            </el-form-item>
            
            <el-form-item label="表名">
              <el-input v-model="dbImportForm.table" placeholder="请输入要导入的表名" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="importDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleImport">
            开始导入
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.knowledge-container {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.header h2 {
  margin: 0;
  color: #2c3e50;
}

.content {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.knowledge-card {
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.operations {
  display: flex;
  gap: 10px;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.description {
  color: #666;
  margin: 0;
}

.update-time {
  color: #999;
  font-size: 0.9em;
  margin: 0;
}

.upload-demo {
  width: 100%;
}

.el-upload__tip {
  margin-top: 10px;
  color: #909399;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style> 