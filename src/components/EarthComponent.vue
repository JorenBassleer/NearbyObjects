<template>
  <GLTFModel
    ref="earthRef"
    :scale="[20,20,20]"
    path="/models/Earth.glb"
    :position="[5,5,5]"
  />
</template>
<script setup>
import { shallowRef, watch } from 'vue';
import { GLTFModel } from '@tresjs/cientos';

const earthRef = shallowRef();

watch(earthRef, (model) => {
  console.log('model', model.value);
});
</script>
