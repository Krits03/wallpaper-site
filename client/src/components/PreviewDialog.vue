<script setup>
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { generatePlaceholder } from '../utils/placeholder.js'

const props = defineProps({
  modelValue: Boolean,
  wallpaper: Object,
})
const emit = defineEmits(['update:modelValue', 'download'])

const fullLoaded = ref(false)
const thumbLoaded = ref(false)

watch(
  () => props.wallpaper,
  () => {
    fullLoaded.value = false
    thumbLoaded.value = false
  }
)

const copyUrl = async () => {
  if (!props.wallpaper) return
  try {
    await navigator.clipboard.writeText(props.wallpaper.url)
    ElMessage.success('链接已复制')
  } catch {
    ElMessage.error('复制失败')
  }
}

const placeholder = () =>
  props.wallpaper?.placeholderColor || generatePlaceholder(props.wallpaper?.id)
</script>

<template>
  <el-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :title="wallpaper?.title || '壁纸预览'"
    width="min(900px, 92vw)"
    align-center
    destroy-on-close
    class="preview-dialog"
  >
    <div v-if="wallpaper" class="preview-body">
      <div class="image-stage" :style="{ background: placeholder() }">
        <div v-if="!fullLoaded" class="skeleton"></div>
        <img
          :src="wallpaper.url"
          :alt="wallpaper.title"
          @load="fullLoaded = true"
          :class="['full-image', { show: fullLoaded }]"
        />
      </div>
      <div class="details">
        <p class="resolution">
          <el-icon><Monitor /></el-icon>
          <span>{{ wallpaper.resolution || '未知分辨率' }}</span>
        </p>
        <p v-if="wallpaper.tags?.length" class="tags">
          <el-tag v-for="tag in wallpaper.tags" :key="tag" size="small" effect="plain">
            {{ tag }}
          </el-tag>
        </p>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="$emit('update:modelValue', false)">关闭</el-button>
        <el-button @click="copyUrl">
          <el-icon class="btn-icon"><Link /></el-icon>复制链接
        </el-button>
        <el-button type="primary" @click="$emit('download', wallpaper)">
          <el-icon class="btn-icon"><Download /></el-icon>下载壁纸
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.preview-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.image-stage {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.skeleton {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
.full-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.4s ease;
}
.full-image.show {
  opacity: 1;
}
.details {
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: var(--on-surface-variant);
}
.resolution {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 0;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
.btn-icon {
  margin-right: 4px;
}
</style>
