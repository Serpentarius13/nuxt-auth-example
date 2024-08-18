<script setup lang="ts">
useUserSession();

const { data, status } = await useFetch("/api/app/hello-world", {
  method: "GET",
});
</script>

<template>
  <p>
    {{ status }}
  </p>
</template>
