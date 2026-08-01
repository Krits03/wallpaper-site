import { ref, computed, watch } from 'vue'

const ITEMS_PER_PAGE = 8

export function useWallpapers() {
  const all = ref([])
  const categories = ref([])
  const loading = ref(true)
  const error = ref('')
  const category = ref('all')
  const query = ref('')
  const page = ref(1)

  fetch('/api/wallpapers')
    .then((res) => {
      if (!res.ok) throw new Error('加载失败')
      return res.json()
    })
    .then((data) => {
      all.value = data.wallpapers || []
      categories.value = data.categories || []
      loading.value = false
    })
    .catch((err) => {
      error.value = err.message
      loading.value = false
    })

  const filtered = computed(() => {
    const q = query.value.trim().toLowerCase()
    return all.value.filter((w) => {
      const matchCat = category.value === 'all' || w.category === category.value
      const matchQ =
        !q ||
        w.title.toLowerCase().includes(q) ||
        (w.tags || []).some((t) => t.toLowerCase().includes(q)) ||
        w.category.toLowerCase().includes(q)
      return matchCat && matchQ
    })
  })

  watch([category, query], () => {
    page.value = 1
  })

  const visible = computed(() => filtered.value.slice(0, page.value * ITEMS_PER_PAGE))
  const hasMore = computed(() => visible.value.length < filtered.value.length)

  const loadMore = () => {
    if (hasMore.value) page.value++
  }

  return {
    categories,
    loading,
    error,
    category,
    query,
    filtered,
    visible,
    hasMore,
    loadMore,
  }
}
