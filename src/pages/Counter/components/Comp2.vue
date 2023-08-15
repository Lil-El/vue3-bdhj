<template>
  <div>
    <span>第二级-值：</span>
    <!-- v-model="props.modelValue" warning: props是readOnly -->
    <el-input-number v-model="data" @change="onChange"></el-input-number>
  </div>
  <!-- 组件传值：使用普通方式 -->
  <comp-3 :data="data" @change="onChange" />
</template>

<script setup>
import { getCurrentInstance, reactive, ref, watch } from "vue";
import Comp3 from "./Comp3.vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

// 在该组件中保存自己的状态
const data = ref();

// 监听props变化，去修改data
watch(
  () => props.modelValue,
  (v) => {
    data.value = v;
  },
  {
    immediate: true,
  }
);

// 修改父级组件的值
const onChange = (val) => {
  emit("update:modelValue", val);
};
</script>