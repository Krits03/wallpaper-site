<script setup>
import { ref, onMounted } from 'vue'
import { useWallpapers } from './composables/useWallpapers.js'
import WallpaperCard from './components/WallpaperCard.vue'
import PreviewDialog from './components/PreviewDialog.vue'

const { categories, loading, error, category, query, visible, hasMore, loadMore } = useWallpapers()

const selectedWallpaper = ref(null)
const dialogVisible = ref(false)

const openPreview = (wallpaper) => {
  selectedWallpaper.value = wallpaper
  dialogVisible.value = true
}

const downloadWallpaper = (wallpaper) => {
  const a = document.createElement('a')
  a.href = wallpaper.url
  a.download = `${wallpaper.title}.jpg`
  a.target = '_blank'
  document.body.appendChild(a)
  a.click()
  a.remove()
}

// 访问统计：Vue 渲染完成后刷新不蒜子统计数值
onMounted(() => {
  if (window.busuanzi) {
    window.busuanzi.fetch()
  }
})
</script>

<template>
  <div class="page">
    <header class="app-header">
      <div class="brand">
        <el-icon :size="28" color="var(--primary)"><Picture /></el-icon>
        <h1>壁纸墙</h1>
      </div>
      <p class="subtitle">Ech678精选壁纸</p>
    </header>

    <main class="app-main">
      <div class="toolbar">
        <el-input
          v-model="query"
          placeholder="搜索壁纸..."
          clearable
          class="search-input"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-segmented
          v-model="category"
          :options="[{ label: '全部', value: 'all' }, ...categories.map(c => ({ label: c.label, value: c.id }))]"
          class="category-filter"
        />
      </div>

      <div v-if="loading" class="skeleton-grid">
        <el-skeleton v-for="n in 8" :key="n" animated>
          <template #template>
            <el-skeleton-item variant="image" style="width: 100%; height: 180px; border-radius: 20px;" />
            <div style="padding: 14px 0 8px;">
              <el-skeleton-item variant="text" style="width: 60%;" />
            </div>
          </template>
        </el-skeleton>
      </div>

      <el-alert
        v-else-if="error"
        :title="error"
        type="error"
        show-icon
        :closable="false"
      />

      <el-empty
        v-else-if="!visible.length"
        description="没有找到相关壁纸"
        :image-size="120"
      />

      <TransitionGroup v-else name="list" tag="div" class="wallpaper-grid">
        <WallpaperCard
          v-for="wallpaper in visible"
          :key="wallpaper.id"
          :wallpaper="wallpaper"
          @preview="openPreview"
          @download="downloadWallpaper"
        />
      </TransitionGroup>

      <div v-if="!loading && hasMore" class="load-more">
        <el-button type="primary" size="large" @click="loadMore">
          加载更多
        </el-button>
      </div>
    </main>

    <footer class="app-footer">
      <a
        class="footer-link"
        href="https://github.com/Krits03/wallpaper-site"
        target="_blank"
        rel="noopener noreferrer"
      >
        <el-icon><Link /></el-icon>
        <span>GitHub</span>
      </a>
      <p class="footer-stats">
        <span id="busuanzi_container_site_pv">本站总访问量 <span id="busuanzi_value_site_pv"></span> 次</span>
        <span class="stats-divider">·</span>
        <span id="busuanzi_container_site_uv">本站访客数 <span id="busuanzi_value_site_uv"></span> 人</span>
      </p>
      <p class="footer-stack">
        开发技术栈：Vue 3 · Vite · Element Plus · Node.js / Express
      </p>
    </footer>

    <PreviewDialog
      v-model="dialogVisible"
      :wallpaper="selectedWallpaper"
      @download="downloadWallpaper"
    />
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #f5f5f5;
}
.app-header {
  text-align: center;
  padding: 48px 20px 32px;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
}
.brand h1 {
  margin: 0;
  font-size: 2.25rem;
  font-weight: 500;
  color: var(--on-surface);
}
.subtitle {
  margin: 8px 0 0;
  color: var(--on-surface-variant);
  font-size: 1rem;
}
.app-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 64px;
}
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
}
.search-input {
  width: 280px;
}
.category-filter {
  background: var(--surface);
}
.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
.wallpaper-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
.load-more {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.35s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.list-leave-active {
  position: absolute;
}
.app-footer {
  text-align: center;
  padding: 32px 20px 40px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}
.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--primary);
  text-decoration: none;
  font-size: 0.95rem;
  transition: opacity 0.2s;
}
.footer-link:hover {
  opacity: 0.8;
  text-decoration: underline;
}
.footer-stats {
  margin: 12px 0 0;
  color: var(--on-surface-variant);
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}
.stats-divider {
  opacity: 0.5;
}
.footer-stack {
  margin: 8px 0 0;
  color: var(--on-surface-variant);
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .search-input {
    width: 100%;
  }
  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }
  .category-filter {
    justify-content: center;
  }
  .wallpaper-grid,
  .skeleton-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
  }
}
</style>
