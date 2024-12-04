<template>
  <Suspense>
    <Stars
      :rotation="[0, currentSunRotation, 0]"
      :size="starsSize"
      :radius="400"
    />
  </Suspense>
</template>
<script setup>
import { watch, defineProps, shallowRef } from 'vue';
import { useWindowSize } from '@vueuse/core';
import { Stars } from '@tresjs/cientos';

defineProps({
  currentSunRotation: {
    type: Number,
    required: true,
  },
});

const { width } = useWindowSize();

const starsSize = shallowRef(width.value <= 768 ? 0.4 : 0.2);

watch(width, (v) => {
  if (v <= 768) {
    starsSize.value = 0.4;
  } else {
    starsSize.value = 0.2;
  }
});
</script>
