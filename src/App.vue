<template>
  <TresCanvas window-size>
    <TresOrbitControls
      v-if="renderer"
      :args="[camera, renderer?.domElement]"
    />
    <TresMesh>
      <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
      <TresMeshBasicMaterial color="orange" />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>

<script setup>
import { TresCanvas, useTresContext, useTresContextProvider, extend } from '@tresjs/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

extend({ OrbitControls });
const {} = useTresContextProvider();
const { camera, renderer } = useTresContext();
</script>
