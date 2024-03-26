<template>
  <TresCanvas
    window-size
    shadows
  >
    <Html
      left
      style="left: 0; top: 0;"
      wrapper-class="list"
    >
      <section class="bg-white text-gray-600 w-72 rounded-lg">
        <h2 class="text-xl border-b px-4 py-2 ">
          Astroids
        </h2>
        <section class="max-h-64 p-4 overflow-y-scroll overflow-x-hidden ">
          <div
            v-for="astroid in allAstroids"
            :key="astroid._id"
            class="cursor-pointer hover:text-blue-500 transition-colors duration-150"
            @click="focusAstroid(astroid)"
          >
            {{ astroid.name }}
          </div>
        </section>
      </section>
    </Html>
    <TresPerspectiveCamera
      :position="currentFocus !== null ? [currentFocus.position.x, currentFocus.position.y, currentFocus.position.z] : undefined"
    />
    <CameraControls
      v-bind="controlsState"
      make-default
    />
    <AstroidComponent
      v-for="astroid in allAstroids"
      :key="astroid.id"
      :astroid="astroid"
      :rotation-earth="currentEarthRotation"
      :position-earth="currentEarthPosition"
      @update:component="allAstroidRefs.push($event)"
      @click="setAstroidInfo(astroid)"
    />
    <EarthComponent
      v-model:rotation-earth="currentEarthRotation"
      v-model:position-earth="currentEarthPosition"
      :rotation-sun="currentSunRotation"
      @update:component="earthRef = $event"
    />
    <Suspense>
      <SunComponent v-model:sunRotation="currentSunRotation" />
    </Suspense>
    <Suspense>
      <Stars :rotation="[0, currentSunRotation, 0]" />
    </Suspense>
  </TresCanvas>
</template>

<script setup>
import {
  shallowRef, onMounted,
} from 'vue';
import { TresCanvas } from '@tresjs/core';
// eslint-disable-next-line import/no-unresolved
import { CameraControls, Stars, Html } from '@tresjs/cientos';
import EarthComponent from './components/EarthComponent.vue';
import AstroidComponent from './components/AstroidComponent.vue';
import SunComponent from './components/SunComponent.vue';
import { fetchLast7Days } from './api/asteroid';

const currentSunRotation = shallowRef(0);
const currentEarthRotation = shallowRef(0);
const currentEarthPosition = shallowRef({ x: 0, y: 0, z: 0 });
const allAstroids = shallowRef([]);
const allAstroidRefs = shallowRef([]);
const currentFocus = shallowRef({
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
});

const earthRef = shallowRef();

const setAstroidInfo = (astroid) => {
  console.log('astroid data:', astroid);
};

const focusAstroid = (astroid) => {
  console.log('focus astroid:', astroid);
  currentFocus.value = earthRef.value;
};

const controlsState = shallowRef({
  minDistance: 0,
  maxDistance: 100,
});
onMounted(async () => {
  let fetchedData = await fetchLast7Days();
  fetchedData = Object.values(fetchedData).flat();
  allAstroids.value = fetchedData.slice(0, 10);
});
</script>
<style>
/* Workaround for now */
.list {
  position: fixed !important;
  top: 50% !important; /* Start from the center */
  left: 50% !important;
  transform: translate(-50vw, -50vh) !important;
}
</style>
