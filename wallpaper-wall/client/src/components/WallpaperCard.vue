<script setup>
import { ref, computed } from 'vue'
import { generatePlaceholder } from '../utils/placeholder.js'

const props = defineProps({ wallpaper: Object })
const emit = defineEmits(['preview', 'download'])

const loaded = ref(false)
const placeholder = computed(
  () => props.wallpaper.placeholderColor || generatePlaceholder(props.wallpaper.id)
)
</script>

<template>
  <div class="card" @click="$emit('preview', wallpaper)">
    <div class="image-wrap" :style="{ background: placeholder }">
      <div v-if="!loaded" class="skeleton"></div>
      <img
        :src="wallpaper.thumbnail"
        :alt="wallpaper.title"
        loading="lazy"
        @load="loaded = true"
        :class="['thumb', { show: loaded }]"
      />
      <div class="overlay">
        <button class="icon-btn" @click.stop="$emit('preview', wallpaper)" title="预览">
          <el-icon :size="18"><View /></el-icon>
        </button>
        <button class="icon-btn" @click.stop="$emit('download', wallpaper)" title="下载">
          <el-icon :size="18"><Download /></el-icon>
        </button>
      </div>
    </div>
    <div class="info">
      <h3 class="title">{{ wallpaper.title }}</h3>
      <span class="meta">{{ wallpaper.resolution || '未知分辨率' }}</span>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: var(--surface);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow-1);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-3);
}
.image-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.skeleton {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
.thumb {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.35s ease, transform 0.4s ease;
}
.thumb.show {
  opacity: 1;
}
.card:hover .thumb {
  transform: scale(1.05);
}
.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.25s ease;
  display: flex;
  align-items: flex-end;
  padding: 12px;
  gap: 8px;
}
.card:hover .overlay {
  opacity: 1;
}
.icon-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.9);
  color: #1d1b20;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.15s ease;
}
.icon-btn:hover {
  transform: scale(1.1);
}
.info {
  padding: 14px 16px 16px;
}
.title {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  color: var(--on-surface);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.meta {
  font-size: 0.8rem;
  color: var(--on-surface-variant);
}
</style>
