<template>
  <Transition
    name="fade-overlay"
    appear
    enter-active-class="opacity-1 transition-opacity duration-1000"
    leave-active-class="opacity-0 transition-opacity duration-1000 delay-1000"
  >
    <div
      v-show="!hasFinishLoading"
      class="fixed bg-[#00040C] inset-0 size-full text-center flex flex-col justify-center items-center z-[80] select-none"
    >
      {{ progress }} %
      <div
        class="max-w-xl w-full overflow-hidden flex items-center justify-start px-2 lg:mx-0"
      >
        <div
          :style="{ width: `${ progress }%`}"
        />
        <img
          class="text-white w-20"
          src="../../assets/comet.svg"
        >
      </div>
    </div>
  </Transition>
</template>
<script setup>
import { useProgress } from '@tresjs/cientos';

const { progress, hasFinishLoading } = await useProgress();

</script>
