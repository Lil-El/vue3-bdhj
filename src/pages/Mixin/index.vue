<template>
  <div>Mixin</div>
</template>

<script setup>
import { defineOptions, getCurrentInstance } from "vue";

defineOptions({
  bgType: "Mino" + Math.round(Math.random() + 1)
})

</script>

<style>
</style>