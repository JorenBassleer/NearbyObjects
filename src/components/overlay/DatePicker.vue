<template>
  <Html wrapper-class="rangePicker w-full">
    <VueDatePicker
      v-model="modelValue"
      placeholder="Range of max 7 days"
      class="text-white"
      :enable-time-picker="false"
      :range="{ maxRange: 7 }"
      :clearable="false"
      dark
    />
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
  display: block !important;
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50vw, -50vh) !important;
  z-index: 50 !important;
  margin-left: 1rem;
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
