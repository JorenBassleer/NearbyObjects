<template>
  <Html wrapper-class="rangePicker w-full">
    <VueDatePicker
      v-model="modelValue"
      class="text-white"
      :enable-time-picker="false"
      :range="{ maxRange: 7 }"
      dark
    >
      <template #input-icon>
        <div />
      </template>
    </VueDatePicker>
  </Html>
</template>
<script setup>
import { Html } from '@tresjs/cientos';
import VueDatePicker from '@vuepic/vue-datepicker';

const modelValue = defineModel({
  type: Array,
  required: true,
});
</script>

<style>
.rangePicker {
  font-family: "Jaro", sans-serif;
  display: block !important;
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50vw, -50vh) !important;
  z-index: 50 !important;
  margin-left: 0.5rem;
  margin-top: 3.5rem;
}

@media (min-width: 768px) {
  .rangePicker {
    margin-top: 1rem;
    margin-left: 1rem;
  }
}

.dp__input_wrap > input {
  background: transparent;
  border: none;
  color: #fff;
  font-weight: 600;
}

.dp__input_wrap > input::placeholder {
  color: #fff;
  opacity: 1;
}
</style>
