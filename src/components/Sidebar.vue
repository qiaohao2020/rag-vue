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
  Setting
} from '@element-plus/icons-vue'

const props = defineProps<{
  isCollapse: boolean
}>()

const emit = defineEmits<{
  (e: 'update:isCollapse', value: boolean): void
}>()

const route = useRoute()
const { t } = useI18n()

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

    <div class="collapse-button" @click="toggleCollapse">
      <el-icon>
        <component :is="isCollapse ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
  </el-menu>
</template>

<style scoped>
.sidebar-menu {
  height: 100vh;
  border-right: none;
}

.logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 20px;
}

.logo {
  width: 32px;
  height: 32px;
}

.logo-text {
  margin-left: 12px;
  font-size: 18px;
  font-weight: bold;
  color: var(--el-menu-text-color);
}

.collapse-button {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--el-menu-text-color);
}

.collapse-button:hover {
  background-color: var(--el-menu-hover-bg-color);
}
</style> 