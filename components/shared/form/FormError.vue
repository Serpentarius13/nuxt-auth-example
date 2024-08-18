<script setup lang="ts">
defineProps<{
  error: string | undefined | null;
}>();
</script>

<template>
  <div class="flex items-center gap-2" v-if="error">
    <Icon name="material-symbols:error-outline" />
    <span class="text-red-500">{{ error }}</span>
  </div>
</template>
