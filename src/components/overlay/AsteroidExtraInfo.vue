<template>
  <section>
    <div class="flex flex-col gap-2 p-2">
      <div>
        Diameter of
        <span class="font-semibold">
          {{ asteroid.estimated_diameter.meters.estimated_diameter_min.toFixed(2) }}m
        </span> -
        <span class="font-semibold">
          {{ asteroid.estimated_diameter.meters.estimated_diameter_max.toFixed(2) }}m
        </span>
      </div>
      <div>
        Will miss earth by <span class="font-semibold">{{ parseFloat(asteroid.close_approach_data[0].miss_distance.kilometers).toFixed(2) }}km</span>
      </div>
      <div>
        Travelling at a speed of <span class="font-semibold">{{ parseFloat(asteroid.close_approach_data[0].relative_velocity.kilometers_per_second).toFixed(2) }}km/s</span>
      </div>
      <div
        class="text-white w-max p-1 rounded border"
        :class="asteroid.is_potentially_hazardous_asteroid ? 'bg-red-500 border-red-200' : 'bg-emerald-500 border-emerald-200'"
      >
        Is {{ asteroid.is_potentially_hazardous_asteroid ? 'potentially' : 'not' }} dangerous
      </div>
    </div>
  </section>
</template>
<script setup>
import { defineProps } from 'vue';

defineProps({
  asteroid: {
    type: Object,
    required: true,
  },
});
</script>
