<template>
  <Suspense>
    <GLTFModel
      ref="astroidRef"
      path="/models/Itokawa.glb"
      cast-shadow
      receive-shadow
      :scale="0.001"
      draco
    />
  </Suspense>
  <InformationPanel
    v-if="isFocused"
    :position="showMoreInfo ?
      [asteroidLocation.x, asteroidLocation.y + 8, asteroidLocation.z + 3] : [asteroidLocation.x, asteroidLocation.y + 5, asteroidLocation.z + 3]"
  >
    <div class="flex justify-between items-center">
      <h1 class="font-bold">
        ☄️ {{ asteroid.name }}
      </h1>
      <span
        class="font-semibold cursor-pointer p-2 hover:text-blue-500"
        @click="$emit('onUnfocus')"
      >X</span>
    </div>
    <small
      class="text-blue-500 cursor-pointer hover:text-blue-400 select-none"
      @click="showMoreInfo = !showMoreInfo"
    >
      Show more info
    </small>
    <AsteroidExtraInfo
      v-show="showMoreInfo"
      :asteroid="asteroid"
    />
  </InformationPanel>
</template>
<script setup>
import {
  defineProps, shallowRef, ref, watch, defineEmits,
} from 'vue';
import { useRenderLoop } from '@tresjs/core';
// eslint-disable-next-line import/no-unresolved
import { GLTFModel } from '@tresjs/cientos';
import InformationPanel from '../overlay/InformationPanel.vue';
import AsteroidExtraInfo from '../overlay/AsteroidExtraInfo.vue';

const props = defineProps({
  asteroid: {
    type: Object,
    required: true,
  },
  rotationEarth: {
    type: Number,
    required: true,
  },
  positionEarth: {
    type: Object,
    default: () => ({
      x: 0, y: 0, z: 0,
    }),
  },
  isFocused: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:component', 'onUnfocus']);

const { onLoop } = useRenderLoop();

const astroidRef = shallowRef(null);
const asteroidLocation = ref({
  x: 0,
  y: 0,
  z: 0,
});
const showMoreInfo = shallowRef(false);
const pauseStartTime = ref(0);
const totalPausedDuration = ref(0);

watch(astroidRef, (model) => {
  emit('update:component', model.value);
  onLoop(({ delta, elapsed }) => {
    if (props.isFocused || !model.value) {
      return;
    }

    const effectiveElapsed = elapsed - totalPausedDuration.value / 1000;

    const orbitSpeed = props.asteroid.close_approach_data[0].relative_velocity.kilometers_per_second / 10;
    const angle = (props.rotationEarth + effectiveElapsed) * orbitSpeed;

    /* eslint-disable no-param-reassign */
    model.value.rotation.y += Math.sin(delta * orbitSpeed);
    model.value.rotation.z += Math.sin(delta * orbitSpeed);
    model.value.position.x = props.positionEarth.x + props.asteroid.close_approach_data[0].miss_distance.lunar * Math.sin(angle);
    model.value.position.z = props.positionEarth.z + props.asteroid.close_approach_data[0].miss_distance.lunar * Math.cos(angle);
    asteroidLocation.value = JSON.parse(JSON.stringify(model.value.position));
    /* eslint-enable no-param-reassign */
  });
});

watch(() => props.isFocused, (newVal) => {
  if (newVal) {
    pauseStartTime.value = performance.now();
  } else if (pauseStartTime.value !== 0) {
    totalPausedDuration.value += performance.now() - pauseStartTime.value;
    pauseStartTime.value = 0;
  }
});

</script>
