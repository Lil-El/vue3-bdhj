<template>
  <el-divider>Amount Total:</el-divider>
  <el-table :data="data" border show-summary style="width: 100%">
    <el-table-column type="index" label="No." width="100" />
    <el-table-column prop="amount1" label="Amount 1" />
    <el-table-column prop="amount2" label="Amount 2" />
    <el-table-column prop="amount3" label="Amount 3" />
    <el-table-column label="Row Total">
      <template #default="scoped">
        {{ calculate(scoped.row) }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { computed, reactive } from "vue";
import { useStore } from "../../../store.js";
import { storeToRefs } from "pinia";

const store = useStore();
const storeRef = storeToRefs(store);

const data = computed(() => {
  let result = [];
  Object.values(storeRef.tabs.value).forEach((arr) => {
    result = [...result, ...arr];
  });
  return result;
});

const calculate = (row) => {
  const key = ["amount1", "amount2", "amount3"];
  return key.reduce((p, k) => p + row[k], 0);
};
</script>

<style>
</style>