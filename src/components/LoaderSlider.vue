<template>
  <div>
    {{ progress }}
  </div>
</template>
<script setup>
import { watch } from 'vue';
import { useProgress } from '@tresjs/cientos';

const { progress, hasFinishLoading } = useProgress();

const emit = defineEmits(['hasFinishedLoading']);

watch(progress, (val) => {
  console.log('progress:', val);
});
watch(hasFinishLoading, (val) => {
  if (val) {
    emit('hasFinishedLoading');
  }
});
</script>
