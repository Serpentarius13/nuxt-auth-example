<script setup lang="ts">
import type { NuxtLink } from "#build/components";

defineProps<{
  link?: InstanceType<typeof NuxtLink>["href"];
}>();
</script>

<template>
  <Card class="mx-auto max-w-sm">
    <CardHeader>
      <CardTitle class="text-2xl">
        <slot name="title" />
      </CardTitle>
      <CardDescription>
        <slot name="description" />
      </CardDescription>
    </CardHeader>
    <CardContent>
      <slot />
      <div
        class="mt-3 text-center text-sm"
        v-if="$slots.footer || $slots.footerLink"
      >
        <slot name="footer" />

        <NuxtLink
          :href="link"
          class="underline"
          v-if="$slots['footer-link'] && link"
        >
          <slot name="footer-link" />
        </NuxtLink>
      </div>
    </CardContent>
  </Card>
</template>
