<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {
  House,
  ChatDotRound,
  Collection,
  Search,
  QuestionFilled,
  Setting,
  Document,
  Expand,
  Fold
} from '@element-plus/icons-vue'

const props = defineProps<{
  isCollapse: boolean
}>()

const emit = defineEmits<{
  (e: 'update:isCollapse', value: boolean): void
}>()

const route = useRoute()
const { t, locale } = useI18n()

const menuItems = computed(() => [
  {
    path: '/',
    icon: House,
    title: t('menu.home')
  },
  {
    path: '/qa',
    icon: ChatDotRound,
    title: t('menu.qa')
  },
  {
    path: '/knowledge',
    icon: Collection,
    title: t('menu.knowledge')
  },
  {
    path: '/search',
    icon: Search,
    title: t('menu.search')
  },
  {
    path: '/issue',
    icon: Document,
    title: t('menu.issue')
  },
  {
    path: '/help',
    icon: QuestionFilled,
    title: t('menu.help')
  },
  {
    path: '/settings',
    icon: Setting,
    title: t('menu.settings')
  }
])

// 语言切换
const currentLocale = ref(locale.value)
const handleLocaleChange = (value: string) => {
  locale.value = value
  localStorage.setItem('language', value)
}

const toggleCollapse = () => {
  emit('update:isCollapse', !props.isCollapse)
}
</script>

<template>
  <el-menu
    :default-active="route.path"
    class="sidebar-menu"
    :collapse="isCollapse"
    router
    background-color="#304156"
    text-color="#bfcbd9"
    active-text-color="#409EFF"
  >
    <div class="logo-container">
      <img src="../assets/logo.png" alt="Logo" class="logo" />
      <span v-show="!isCollapse" class="logo-text">RAG-Vue</span>
    </div>

    <el-menu-item
      v-for="item in menuItems"
      :key="item.path"
      :index="item.path"
    >
      <el-icon><component :is="item.icon" /></el-icon>
      <template #title>{{ item.title }}</template>
    </el-menu-item>

    <div class="sidebar-footer">
      <el-select 
        v-model="currentLocale" 
        @change="handleLocaleChange"
        class="language-select"
        :class="{ 'is-collapse': isCollapse }"
      >
        <el-option label="中文" value="zh" />
        <el-option label="English" value="en" />
        <el-option label="한국어" value="ko" />
      </el-select>

      <div class="collapse-button" @click="toggleCollapse">
        <el-icon>
          <component :is="isCollapse ? 'Expand' : 'Fold'" />
        </el-icon>
      </div>
    </div>
  </el-menu>
</template>

<style scoped>
.sidebar-menu {
  height: 100vh;
  border-right: none;
  background-color: #304156 !important;
}

.logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 20px;
  background-color: #2b3649;
}

.logo {
  width: 32px;
  height: 32px;
}

.logo-text {
  margin-left: 12px;
  font-size: 18px;
  font-weight: bold;
  color: #bfcbd9;
}

.sidebar-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #2b3649;
  border-top: 1px solid #1f2d3d;
}

.language-select {
  width: 100%;
}

.language-select.is-collapse {
  width: 40px;
}

.collapse-button {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #bfcbd9;
}

.collapse-button:hover {
  background-color: #263445;
}

:deep(.el-select.is-collapse .el-input__wrapper) {
  padding: 0;
  justify-content: center;
  background-color: transparent;
}

:deep(.el-select.is-collapse .el-input__inner) {
  display: none;
}

:deep(.el-menu-item) {
  &:hover {
    background-color: #263445 !important;
  }
  
  &.is-active {
    background-color: #263445 !important;
  }
}

:deep(.el-select-dropdown) {
  background-color: #304156;
  border: 1px solid #1f2d3d;
}

:deep(.el-select-dropdown__item) {
  color: #bfcbd9;
  
  &:hover {
    background-color: #263445;
  }
  
  &.selected {
    color: #409EFF;
  }
}
</style> 