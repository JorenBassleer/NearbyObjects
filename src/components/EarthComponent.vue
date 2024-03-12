<template>
  <primitive
    :object="scene"
  />
</template>
<script setup>
import { GLTFModel, useGLTF } from '@tresjs/cientos';

const { scene } = await useGLTF('/Earth.glb');
</script>
