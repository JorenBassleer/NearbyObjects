<template>
  <TresCanvas
    window-size
    shadows
  >
    <Html>
      <section class="bg-white text-gray-600 w-72 rounded-lg">
        <h2 class="text-xl border-b px-4 py-2">
          Astroids
        </h2>
        <section class="max-h-64 p-4 overflow-y-scroll overflow-x-hidden ">
          <div
            v-for="astroid in allAstroids"
            :key="astroid._id"
            :position="[]"
            class="cursor-pointer hover:text-blue-500 transition-colors duration-150"
            @click="focusAstroid(astroid)"
          >
            {{ astroid.name }}
          </div>
        </section>
      </section>
    </Html>
    <TresPerspectiveCamera :position="35" />
    <CameraControls
      v-bind="controlsState"
      make-default
    />
    <AstroidComponent
      v-for="astroid in allAstroids"
      :key="astroid.id"
      :ref="collectAstroidRefs"
      :astroid="astroid"
      :rotation-earth="currentEarthRotation"
      :position-earth="currentEarthPosition"
      @click="setAstroidInfo(astroid)"
    />
    <EarthComponent
      ref="earthRef"
      v-model:rotation-earth="currentEarthRotation"
      v-model:position-earth="currentEarthPosition"
      :rotation-sun="currentSunRotation"
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
const allAstroidComponents = shallowRef([]);

const collectAstroidRefs = (el) => {
  if (el) {
    allAstroidComponents.value.push(el);
  }
};
const earthRef = shallowRef();

const setAstroidInfo = (astroid) => {
  console.log('astroid data:', astroid);
};

const focusAstroid = (astroid) => {
  console.log('focus astroid:', astroid);
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
