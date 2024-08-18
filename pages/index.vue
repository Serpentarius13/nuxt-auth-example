<script setup lang="ts">
definePageMeta({
  middleware: [
    function ({}) {
      return navigateTo("/auth/login");
    },
  ],
});
</script>

<template></template>
