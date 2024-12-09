<template>
  <Transition
    name="fade"
    @after-leave="hasSeenTitleScreen = true"
  >
    <TitleScreen
      v-show="!hasSeenTitleScreen && !userWantsToEnter"
      @enter="userWantsToEnter = true"
    />
  </Transition>
  <Transition name="fade">
    <div v-show="userWantsToEnter && hasSeenTitleScreen">
      <Suspense>
        <LoaderSlider />
      </Suspense>
      <TresCanvas
        window-size
        shadows
      >
        <MainSpace />
      </TresCanvas>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue';
import { TresCanvas } from '@tresjs/core';

import MainSpace from './components/MainSpace.vue';
import LoaderSlider from './components/overlay/LoaderSlider.vue';
import TitleScreen from './components/TitleScreen.vue';

const hasSeenTitleScreen = ref(false);
const userWantsToEnter = ref(false);
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
