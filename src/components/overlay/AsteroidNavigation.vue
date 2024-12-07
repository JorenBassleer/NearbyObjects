<template>
  <Html wrapper-class="list">
    <section class="bg-transparent text-white w-64 md:w-72 rounded-lg select-none border border-white md:border-none">
      <div class="flex justify-between items-center border-b">
        <h2 class="text-base md:text-xl px-2 py-1 md:px-4 md:py-2">
          Asteroids
        </h2>

        <div class="flex gap-1 items-center mr-2">
          Distance
          <div class="flex flex-col gap-1">
            <span
              class="material-icons cursor-pointer hover:text-gray-600 transition-colors duration-150 h-5 w-5"
              :class="currentFilterActive === 'asc' ? 'text-gray-600 hover:text-gray-400' : 'hover:text-gray-600'"
              @click="onSort(currentFilterActive ==='asc' ? '' : 'asc')"
            >arrow_drop_up</span>
            <span
              class="material-icons cursor-pointer hover:text-gray-600 transition-colors duration-150 h-5 w-5"
              :class="currentFilterActive === 'desc' ? 'text-gray-600 hover:text-gray-400' : 'hover:text-gray-600'"
              @click="onSort(currentFilterActive ==='desc' ? '' : 'desc')"
            >arrow_drop_down</span>
          </div>
        </div>
      </div>
      <section class="max-h-32 md:max-h-60 overflow-y-scroll overflow-x-hidden rounded-lg">
        <section
          v-if="+currentFocus.id !== 0"
          class="cursor-pointer text-black bg-white hover:bg-black hover:text-white"
          @click="$emit('onFocus', asteroids.find((asteroid) => asteroid.id === currentFocus.id))"
        >
          {{ asteroids.find((asteroid) => asteroid.id === currentFocus.id)?.name }}
          {{ asteroids.find((asteroid) => asteroid.id === currentFocus.id)?.is_potentially_hazardous_asteroid ? '⚠️' : '' }}
        </section>
        <template v-else>
          <div
            v-for="asteroid in asteroids"
            :key="asteroid.id"
            class="cursor-pointer text-sm md:text-base px-2 md:px-4 transition-all duration-300 select-none font-semibold my-1 hover:text-black hover:bg-white"
            @click="$emit('onFocus', asteroid)"
          >
            {{ asteroid.name }} <span v-if="asteroid.is_potentially_hazardous_asteroid ">⚠️</span>
          </div>
        </template>
      </section>
    </section>
  </Html>
</template>
<script setup>
import { defineProps, defineEmits, ref } from 'vue';
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

const emit = defineEmits(['onFocus', 'onSort']);

const currentFilterActive = ref('');

const onSort = (sortInfo) => {
  currentFilterActive.value = sortInfo;
  emit('onSort', currentFilterActive.value);
};
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
  margin: 5.5rem 1rem 1rem 1rem;
}
@media (min-width: 768px) {
  .list {
    margin: 4rem 1rem 1rem 1rem;
  }
}
</style>
