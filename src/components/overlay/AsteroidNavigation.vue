<template>
  <Html wrapper-class="list">
    <section class="bg-transparent text-white w-64 md:w-72 rounded-lg select-none">
      <h2 class="text-base md:text-xl border-b px-2 py-1 md:px-4 md:py-2">
        Asteroids
      </h2>
      <section
        class="max-h-60 overflow-y-scroll overflow-x-hidden"
      >
        <section
          v-if="+currentFocus.id !== 0"
          class="cursor-pointer text-black bg-white hover:bg-black hover:text-white"
          @click="$emit('onFocus', asteroids.find((asteroid) => asteroid.id === currentFocus.id))"
        >
          {{ asteroids.find((asteroid) => asteroid.id === currentFocus.id)?.name }}
        </section>
        <template v-else>
          <div
            v-for="asteroid in asteroids"
            :key="asteroid.id"
            class="cursor-pointer text-sm md:text-base px-2 md:px-4 transition-all duration-300 select-none font-semibold my-1 hover:text-black hover:bg-white"
            @click="$emit('onFocus', asteroid)"
          >
            {{ asteroid.name }}
          </div>
        </template>
      </section>
    </section>
  </Html>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';
import { Html } from '@tresjs/cientos';

defineProps({
  asteroids: {
    type: Array,
    required: true,
  },
  currentFocus: {
    type: Object,
    default: null,
  },
});

defineEmits(['onFocus']);

</script>
<style>
/* Workaround for now */
.list {
  display: block !important;
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50vw, -50vh) !important;
  z-index: 50 !important;
  margin: 1rem;
}
</style>
