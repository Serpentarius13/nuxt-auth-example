<script setup lang="ts">
interface Props {
  size?: number;
}

const props = withDefaults(defineProps<Props>(), {
  size: 16,
});

const borderSize = useState("loader-size", () => (props.size / 9).toFixed(0));
</script>

<template>
  <span class="loader border-white border-b-blue-500"></span>
</template>

<style scoped>
.loader {
  border-width: calc(v-bind(borderSize) * 1px);
  width: calc(v-bind(size) * 1px);

  aspect-ratio: 1;

  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
