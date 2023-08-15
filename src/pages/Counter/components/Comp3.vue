<template>
  <div>
    <span>第三级-值：</span>
    <el-input-number v-model="data" @change="onChange"></el-input-number>
    <el-input class="comp-input" v-model="message"></el-input>
  </div>
</template>

<script setup>
import { inject, reactive, ref, watch } from "vue";

const props = defineProps(["data"]);
const emit = defineEmits(["change"]);

const data = ref();

// 监听props变化，去修改data
watch(
  () => props.data,
  (v) => {
    data.value = v;
  },
  {
    immediate: true,
  }
);

const onChange = (val) => {
  emit("change", val);
};

const message = inject("message");
</script>

<style lang="sass" scoped>
.comp-input
  width: 200px
  margin-left: 20px
</style>