<template>
  <Transition
    name="fade-overlay"
    appear
    enter-active-class="opacity-1 transition-opacity duration-1000"
    leave-active-class="opacity-0 transition-opacity duration-1000 delay-1000"
  >
    <div
      v-show="!hasFinishLoading"
      class="fixed bg-[#00040C] inset-0 size-full text-center flex flex-col justify-center items-center z-[80]"
    >
      {{ progress }} %
      <div
        class="max-w-xl"
      />
    </div>
  </Transition>
</template>
<script setup>
import { watch } from 'vue';
import { useProgress } from '@tresjs/cientos';

const { progress, hasFinishLoading } = await useProgress();

const emit = defineEmits(['hasFinishedLoading']);

watch(hasFinishLoading, (val) => {
  if (val) {
    emit('hasFinishedLoading');
  }
});
</script>
