<template>
  <primitive
    :object="scene"
    :position="[1,5,10]"
    :scale="[10,10,10]"
  />
</template>
<script setup>
import { useGLTF } from '@tresjs/cientos';

const { scene } = await useGLTF('/Earth.glb');
console.log('earthScene', scene);

</script>
