<template>
  <AsteroidNavigation
    :asteroids="sortedAsteroids"
    :current-focus="currentFocus"
    @on-sort="currentFilter = $event"
    @on-focus="toggleFocus($event)"
  />
  <DatePicker
    v-model="selectedDateRange"
    @update:model-value="onUpdateDateRange"
  />
  <TresPerspectiveCamera
    ref="cameraRef"
    :position="[20, 20, 20]"
  />
  <OrbitControls
    ref="orbitControlsRef"
    :target="[currentFocus.position.x, currentFocus.position.y, currentFocus.position.z]"
    :max-distance="400"
  />
  <AsteroidComponent
    v-for="asteroid in allAsteroids"
    :key="asteroid.id"
    :asteroid="asteroid"
    :rotation-earth="currentEarthRotation"
    :position-earth="currentEarthPosition"
    :earth-radius="earthRadius"
    :is-focused="currentFocus?.id === asteroid.id"
    @update:component="allAsteroidRefs.push({id: asteroid.id, ...$event})"
    @on-unfocus="toggleFocus(asteroid)"
  />
  <EarthComponent
    v-model:rotation-earth="currentEarthRotation"
    @earth-radius="earthRadius = $event"
    @update:component="earthRef = $event"
  />

  <StarsBackground />

  <TresAmbientLight :intensity="2.5" />
</template>

<script setup>
import {
  shallowRef, onBeforeMount, ref, computed,
} from 'vue';
import { gsap } from 'gsap';

import { useTresContext } from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';

import EarthComponent from './bodies/EarthComponent.vue';
import AsteroidComponent from './bodies/AsteroidComponent.vue';

import AsteroidNavigation from './overlay/AsteroidNavigation.vue';
import DatePicker from './overlay/DatePicker.vue';

import StarsBackground from './StarsBackground.vue';
import { fetchAsteroids } from '../api/asteroid';

const { scene } = useTresContext();

const orbitControlsRef = shallowRef();
const cameraRef = shallowRef();

const earthRef = shallowRef();
const currentEarthPosition = shallowRef({ x: 0, y: 0, z: 0 });
const currentEarthRotation = shallowRef(0);
const earthRadius = shallowRef(0);

const allAsteroids = shallowRef([]);
const allAsteroidRefs = shallowRef([]);
const currentFilter = ref('');

const sortedAsteroids = computed(() => {
  if (!allAsteroids.value) return [];
  if (currentFilter.value === '') return allAsteroids.value;
  return [...allAsteroids.value].sort((a, b) => {
    const distanceA = Number(a.close_approach_data[0].miss_distance.kilometers);
    const distanceB = Number(b.close_approach_data[0].miss_distance.kilometers);
    if (currentFilter.value === 'asc') {
      return distanceA - distanceB;
    } return distanceB - distanceA;
  });
});

const currentFocus = ref({
  id: '0',
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
});

const selectedDateRange = ref([
  new Date(),
  new Date(new Date().setDate(new Date().getDate() + 2)),
]);

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const deleteOldAsteroidsFromScene = () => {
  const totalAmountOfAsteroids = allAsteroids.value.length;
  if (totalAmountOfAsteroids > 0) scene.value.children.splice(-totalAmountOfAsteroids, totalAmountOfAsteroids);
};

const onUpdateDateRange = async () => {
  deleteOldAsteroidsFromScene();
  const fetchedData = await fetchAsteroids(selectedDateRange.value.map((entry) => formatDate(entry)));
  allAsteroids.value = Object.values(fetchedData)
    .flat()
    .sort((a, b) => {
      const distanceA = Number(a.close_approach_data[0].miss_distance.kilometers);
      const distanceB = Number(b.close_approach_data[0].miss_distance.kilometers);
      return distanceA - distanceB;
    });
};

const animateCameraPosition = (newPosition, duration = 3.5) => {
  gsap.to(cameraRef.value.position, {
    duration,
    x: newPosition.x + 1,
    y: newPosition.y + 1,
    z: newPosition.z + 1,
    ease: 'power3.inOut',
  });
};

const animateZoom = () => {
  gsap.to(orbitControlsRef.value.value, {
    maxDistance: 1,
    minDistance: 1,
    duration: 1,
    ease: 'power2.inOut',
  });
};

const animateFocusPosition = (newPosition, duration = 1.5) => {
  gsap.to(currentFocus.value.position, {
    duration,
    x: newPosition.x,
    y: newPosition.y,
    z: newPosition.z,
    ease: 'power3.inOut',
    onComplete: () => {
      if (currentFocus.value.id === '0') orbitControlsRef.value.value.maxDistance = 400;
      else animateZoom();
    },
  });
};

const toggleFocus = (asteroid) => {
  if (currentFocus.value?.id === asteroid.id) {
    currentFocus.value.id = '0';
    animateCameraPosition({ x: 20, y: 20, z: 20 });
    animateFocusPosition({ x: 0, y: 0, z: 0 });
  } else {
    const foundAsteroid = allAsteroidRefs.value.find((astroidRef) => astroidRef.id === asteroid.id);
    currentFocus.value.id = foundAsteroid.id;
    animateCameraPosition(foundAsteroid.position);
    animateFocusPosition(foundAsteroid.position);
  }
};

onBeforeMount(async () => {
  const fetchedData = await fetchAsteroids(selectedDateRange.value.map((entry) => formatDate(entry)));
  allAsteroids.value = Object.values(fetchedData).flat();
});
</script>
