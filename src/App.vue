<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera />
    <OrbitControls />
    <TresMesh>
      <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
      <TresMeshBasicMaterial color="orange" />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>

<script setup>
import {
  TresCanvas,
} from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';

</script>
