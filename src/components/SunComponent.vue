<template>
  <Suspense>
    <GLTFModel
      ref="sunRef"
      path="/models/Sun.glb"
      :scale="0.005"
      draco
    />
  </Suspense>
  <TresPointLight
    :args="['#fee21f', 500, 100]"
    :position="[0,0,0]"
    cast-shadow
  />
</template>
<script setup>
import {
  shallowRef, defineProps, defineEmits, watch,
} from 'vue';
import { useRenderLoop } from '@tresjs/core';
import { GLTFModel } from '@tresjs/cientos';

defineProps({
  sunRotation: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['update:sunRotation']);

const { onLoop } = useRenderLoop();

const sunRef = shallowRef();

watch(sunRef, (model) => {
  onLoop(({ delta }) => {
    if (model.value) {
      // eslint-disable-next-line no-param-reassign
      model.value.rotation.y += (delta / 100);

      emit('update:sunRotation', model.value.rotation.y);
    }
  });
});

</script>
