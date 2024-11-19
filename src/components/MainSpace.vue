<template>
  <AsteroidNavigation
    :asteroids="allAsteroids"
    :current-focus="currentFocus"
    @on-focus="toggleFocus($event)"
  />
  <DatePicker
    v-model="selectedDateRange"
    @update:model-value="onUpdateDateRange"
  />
  <TresPerspectiveCamera
    ref="cameraRef"
    :position="[10, 10, 10]"
  />
  <OrbitControls
    ref="orbitControlsRef"
    :target="[currentFocus.position.x, currentFocus.position.y, currentFocus.position.z]"
  />
  <AsteroidComponent
    v-for="asteroid in allAsteroids"
    :key="asteroid.id"
    :asteroid="asteroid"
    :rotation-earth="currentEarthRotation"
    :position-earth="currentEarthPosition"
    :is-focused="currentFocus?.id === asteroid.id"
    @update:component="allAsteroidRefs.push({id: asteroid.id, ...$event})"
    @on-unfocus="toggleFocus(asteroid)"
  />
  <EarthComponent
    v-model:rotation-earth="currentEarthRotation"
    @update:component="earthRef = $event"
  />

  <StarsBackground :current-sun-rotation="currentEarthRotation" />

  <TresAmbientLight :intensity="2.5" />
</template>

<script setup>
import { shallowRef, onMounted, ref } from 'vue';
import { gsap } from 'gsap';

import { OrbitControls } from '@tresjs/cientos';

import EarthComponent from './bodies/EarthComponent.vue';
import AsteroidComponent from './bodies/AsteroidComponent.vue';
// import SunComponent from './bodies/SunComponent.vue';

import AsteroidNavigation from './overlay/AsteroidNavigation.vue';
import DatePicker from './overlay/DatePicker.vue';

import StarsBackground from './StarsBackground.vue';
import { fetchAsteroids } from '../api/asteroid';

const emit = defineEmits(['reRender']);

const orbitControlsRef = shallowRef();
const cameraRef = shallowRef();

const currentEarthRotation = shallowRef(0);

const earthRef = shallowRef();
const currentEarthPosition = shallowRef({ x: 0, y: 0, z: 0 });

const allAsteroids = shallowRef([]);
const allAsteroidRefs = shallowRef([]);

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
  new Date(new Date().setDate(new Date().getDate() + 7)),
]);

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const onUpdateDateRange = async () => {
  const fetchedData = await fetchAsteroids(selectedDateRange.value.map((entry) => formatDate(entry)));
  allAsteroids.value = Object.values(fetchedData).flat();
  emit('reRender');
  // eslint-disable-next-line no-console
  console.log('allAsteroids:', allAsteroids.value.length);
};

const animateCameraPosition = (newPosition, duration = 3.5) => {
  gsap.to(cameraRef.value.position, {
    duration,
    x: newPosition.x + 10,
    y: newPosition.y + 10,
    z: newPosition.z + 10,
    ease: 'power3.inOut',
  });
};

const animateFocusPosition = (newPosition, duration = 1.5) => {
  gsap.to(currentFocus.value.position, {
    duration,
    x: newPosition.x,
    y: newPosition.y,
    z: newPosition.z,
    ease: 'power3.inOut',
  });
};

const toggleFocus = (asteroid) => {
  if (currentFocus.value?.id === asteroid.id) {
    currentFocus.value.id = '0';
    animateCameraPosition({ x: 10, y: 10, z: 10 });
    animateFocusPosition({ x: 0, y: 0, z: 0 });
  } else {
    const foundAsteroid = allAsteroidRefs.value.find((astroidRef) => astroidRef.id === asteroid.id);
    currentFocus.value.id = foundAsteroid.id;
    animateCameraPosition(foundAsteroid.position);
    animateFocusPosition(foundAsteroid.position);
  }
};

onMounted(async () => {
  const fetchedData = await fetchAsteroids(selectedDateRange.value.map((entry) => formatDate(entry)));
  allAsteroids.value = Object.values(fetchedData).flat();
  // eslint-disable-next-line no-console
  console.log('allAsteroids:', allAsteroids.value.length);
});
</script>
