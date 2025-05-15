<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {
  House,
  ChatDotRound,
  Collection,
  Search,
  Setting,
  Document,
  Fold,
  Expand
} from '@element-plus/icons-vue'

const route = useRoute()
const { t, locale } = useI18n()
const isCollapse = ref(false)

const menuItems = computed(() => [
  {
    path: '/',
    icon: House,
    title: t('menu.home')
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
    path: '/qa',
    icon: ChatDotRound,
    title: t('menu.qa')
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
      <span class="logo-text" v-show="!isCollapse">RAG-Vue</span>
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
      <el-button
        type="text"
        class="collapse-btn"
        @click="isCollapse = !isCollapse"
      >
        <el-icon>
          <component :is="isCollapse ? Expand : Fold" />
        </el-icon>
      </el-button>
      <el-select 
        v-model="currentLocale" 
        @change="handleLocaleChange"
        class="language-select"
        :popper-class="isCollapse ? 'language-select-dropdown-collapsed' : ''"
      >
        <el-option label="中文" value="zh" />
        <el-option label="English" value="en" />
        <el-option label="한국어" value="ko" />
      </el-select>
    </div>
  </el-menu>
</template>

<style scoped>
.sidebar-menu {
  height: 100vh;
  border-right: none;
  background-color: #304156 !important;
  transition: width 0.3s;
}

.logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 20px;
  background-color: #2b3649;
  overflow: hidden;
}

.logo {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.logo-text {
  margin-left: 12px;
  font-size: 18px;
  font-weight: bold;
  color: #bfcbd9;
  white-space: nowrap;
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

.collapse-btn {
  color: #bfcbd9;
  padding: 8px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.collapse-btn:hover {
  color: #409EFF;
  background-color: #263445;
}

.language-select {
  width: 100%;
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

:deep(.el-menu--collapse) {
  width: 64px;
}

:deep(.el-menu:not(.el-menu--collapse)) {
  width: 200px;
}
</style> 