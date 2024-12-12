<template>
  <Suspense>
    <Stars
      :size="starsSize"
      :rotation="[0, yRotation, 0]"
      :radius="400"
      :size-attenuation="true"
    />
  </Suspense>
</template>
<script setup>
import { watch, shallowRef } from 'vue';
import { useWindowSize } from '@vueuse/core';
import { Stars } from '@tresjs/cientos';
import { useRenderLoop } from '@tresjs/core';

const { width } = useWindowSize();
const { onLoop } = useRenderLoop();
const yRotation = shallowRef(0);

const starsSize = shallowRef(width.value <= 768 ? 0.4 : 0.2);

onLoop(({ delta }) => {
  yRotation.value += 0.02 * delta;
});

watch(width, (v) => {
  if (v <= 768) {
    starsSize.value = 0.4;
  } else {
    starsSize.value = 0.2;
  }
});

</script>
