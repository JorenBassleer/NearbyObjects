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
        <section class="max-h-60 overflow-y-scroll overflow-x-hidden ">
          <div
            v-for="astroid in allAstroids"
            :key="astroid._id"
            class="cursor-pointer px-4 transition-all duration-300"
            :class="currentFocus?.id === astroid.id ? 'text-white bg-blue-500 hover:bg-blue-100 hover:text-blue-500' : 'hover:text-white hover:bg-blue-500'"
            @click="focusAstroid(astroid)"
          >
            {{ astroid.name }}
          </div>
        </section>
      </section>
    </Html>
    <TresPerspectiveCamera
      :position="35"
      :look-at="!currentFocus ? 0 : [currentFocus.position.x, currentFocus.position.y, currentFocus.position.z]"
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
      :is-focused="currentFocus?.id === astroid.id"
      @update:component="allAstroidRefs.push({id: astroid.id, ...$event})"
      @click="focusAstroid(astroid)"
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
const currentFocus = shallowRef(null);

const earthRef = shallowRef();

const focusAstroid = (astroid) => {
  if (currentFocus.value?.id === astroid.id) currentFocus.value = null;
  else currentFocus.value = allAstroidRefs.value.find((astroidRef) => astroidRef.id === astroid.id);
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
  display: block !important;
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50vw, -50vh) !important;
}
</style>
