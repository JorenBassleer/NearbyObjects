<template>
  <Suspense>
    <GLTFModel
      ref="earthRef"
      path="/models/Earth.glb"
      :scale="[10,10,10,10,10,10]"
      draco
    />
  </Suspense>
</template>
<script setup>
import { shallowRef, watch } from 'vue';
import { useTresContext } from '@tresjs/core';
import { GLTFModel } from '@tresjs/cientos';

const earthRef = shallowRef();
const { scene } = useTresContext();

console.log('scene', scene.value);

watch(earthRef, (model) => {
  console.log('model', model.value);
});
</script>
