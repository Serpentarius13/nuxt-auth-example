<script setup lang="ts">
interface Props {
  loading?: boolean;
}

defineProps<Props>();
</script>

<template>
  <Button class="w-full" v-bind="$attrs" :disabled="loading">
    <div class="flex items-center gap-3">
      <SharedLoadingButtonLoader v-if="loading" :size="20" />
      <slot />
    </div>
  </Button>
</template>
