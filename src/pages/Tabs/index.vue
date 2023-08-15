<script setup>
import { Edit, Delete, Check } from "@element-plus/icons-vue";
import { computed, reactive, ref } from "vue";
import AmountTotal from "./components/AmountTotal.vue";

import { useStore } from "../../store.js";
const store = useStore();

// store tabs
const activeName = ref(Object.keys(store.$state.tabs)?.[0]);
const tabs = reactive({
  ...store.$state.tabs,
});

// tabs第一项name
const firstName = computed(() => Object.keys(tabs)?.[0]);

// 表单
const form = reactive({
  amount1: 0,
  amount2: 0,
  amount3: 0,
});

// 添加、删除tab
const onTabsEdit = (targetName, action) => {
  if (action == "add") {
    activeName.value = `${Date.now()}`;
    tabs[activeName.value] = [];
  } else if (action == "remove") {
    delete tabs[targetName];
    activeName.value =
      activeName.value == targetName ? firstName.value : activeName.value;
    store.removeTab(targetName);
  }
};

// 添加表格row
const onAdd = (data) => {
  resetTableEdit(data);
  data.push({
    isEdit: true,
    amount1: 0,
    amount2: 0,
    amount3: 0,
  });
};

// 编辑表格row
const onEdit = (data, row, name) => {
  // 编辑
  if (!row.isEdit) {
    // 将其他的edit状态都改为false; 避免因edit状态冲突，导致form数据错误
    resetTableEdit(data);
    // 将row数据赋值给form，并展示input
    for (const key in form) {
      form[key] = ~~row[key];
    }
    row.isEdit = true;
  } else {
    // 确认
    for (const key in form) {
      row[key] = ~~form[key];
    }
    row.isEdit = false;
    resetForm();

    // 操作成功后，将当前表格数据和tabs信息在pinia中存储
    onTabChange(name, data);
  }
};

// 删除表格row
const onDelete = (data, index, name) => {
  data.splice(index, 1);
  onTabChange(name, data);
};

// 重置form
const resetForm = () => {
  for (const key in form) {
    form[key] = 0;
  }
};

// 重置table的edit状态
const resetTableEdit = (data) => {
  data.forEach((item) => {
    item.isEdit = false;
  });
};

// store中的tab修改
const onTabChange = (name, data) => {
  store.setTab(name, data);
};
</script>

<template>
  <div>
    <el-tabs v-model="activeName" editable @edit="onTabsEdit">
      <el-tab-pane
        v-for="(data, name) in tabs"
        :key="name"
        :label="'表格' + name"
        :name="name"
      >
        <el-button
          type="primary"
          :icon="Edit"
          style="margin-bottom: 10px"
          @click="onAdd(data)"
          >添加</el-button
        >
        <el-table :data="data" border show-summary style="width: 100%">
          <el-table-column type="index" label="No." width="100" />
          <el-table-column prop="amount1" label="Amount 1">
            <template #default="scoped">
              <el-input-number
                v-if="scoped.row.isEdit"
                v-model="form.amount1"
              ></el-input-number>
              <span v-else>{{ scoped.row.amount1 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="amount2" label="Amount 2">
            <template #default="scoped">
              <el-input-number
                v-if="scoped.row.isEdit"
                v-model="form.amount2"
              ></el-input-number>
              <span v-else>{{ scoped.row.amount2 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="amount3" label="Amount 3">
            <template #default="scoped">
              <el-input-number
                v-if="scoped.row.isEdit"
                v-model="form.amount3"
              ></el-input-number>
              <span v-else>{{ scoped.row.amount3 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Operate">
            <template #default="scoped">
              <el-button
                :icon="scoped.row.isEdit ? Check : Edit"
                circle
                :type="scoped.row.isEdit ? 'success' : 'primary'"
                @click="onEdit(data, scoped.row, name)"
              ></el-button>
              <el-button
                :icon="Delete"
                circle
                type="danger"
                @click="onDelete(data, scoped.$index, name)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 统计表格 -->
    <amount-total></amount-total>
  </div>
</template>

<style lang="scss" scoped>
</style>
