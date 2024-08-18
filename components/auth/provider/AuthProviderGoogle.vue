<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <Button variant="outline" class="w-full" as-child>
    <a class="flex items-center" href="/auth/google">
      <Icon name="logos:google-fit" class="mr-2" /> {{ title }}
    </a>
  </Button>
</template>
