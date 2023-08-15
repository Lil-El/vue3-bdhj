<script setup>
import { Edit, Delete } from "@element-plus/icons-vue";
import { computed, reactive, ref } from "vue";
import { ElMessage } from "element-plus";

const formRef = ref("formRef");
const isEditVisible = ref(false); // 控制添加弹窗的显隐

/**
 * options:
 * @type Array
 * @description options是用于动态渲染form的配置集合
 * @example
 *    [
 *      { key: "name", label: "Name", prop: "name", required: true },
 *      { key: "AGE", label: "Age", prop: "AGE", required: false }
 *    ]
 */
let options = reactive([
  { key: "name", label: "姓名", prop: "name", required: true },
  { key: "age", label: "年龄", prop: "age", required: false },
]);
const form = reactive({});

// form rules
const rules = computed(() =>
  options.reduce(
    (p, v) => ({
      ...p,
      [v.prop]: [{ ...v, trigger: "blur", message: "请输入" + v.label }],
    }),
    {}
  )
);

const submitForm = async (ele) => {
  if (!ele) return void 0;
  if (!options.length) return void ElMessage.warning("请先添加字段信息!");

  await ele.validate((valid, fields) => {
    if (valid) {
      console.log("Submit success: ", form);
      ElMessage.success("提交成功!");
    } else {
      // TODO: 校验未通过的字段 fields
    }
  });
};
const resetForm = (ele) => {
  if (!ele) return void 0;
  ele.resetFields();
};

// 编辑
const editFormRef = ref("editFormRef");
const editForm = reactive({
  label: "",
  prop: "",
  required: true,
});
const submitEditForm = async (ele) => {
  if (!ele) return void 0;
  await ele.validate((valid, fields) => {
    if (valid) {
      // 判断添加的字段的属性（prop）是否重复
      const hasProp = options.some((o) => o.prop == editForm.prop);
      if (hasProp) {
        return ElMessage.error("该字段已存在，请重新输入");
      } else {
        options.push({ key: editForm.prop, ...editForm });

        // 重置dialog的form，并关闭dialog
        ele.resetFields();
        isEditVisible.value = false;
      }
    }
  });
};

// 删除
const deleteField = (key) => {
  options.splice(
    options.findIndex((o) => o.prop == key),
    1
  );
  delete form[key];
};
</script>

<template>
  <div>
    <h1>Form</h1>
    <el-row class="button-bar">
      <el-button :icon="Edit" type="primary" @click="isEditVisible = true"
        >添加</el-button
      >
    </el-row>
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :validate-on-rule-change="false"
      label-width="120px"
    >
      <el-form-item
        :label="item.label"
        :prop="item.prop"
        v-for="item in options"
        :key="item.prop"
      >
        <el-input v-model="form[item.prop]" :placeholder="'prop: ' + item.prop"></el-input>
        <el-button
          circle
          :icon="Delete"
          type="danger"
          size="small"
          style="margin-left: 10px"
          @click="deleteField(item.prop)"
        ></el-button>
      </el-form-item>
      <el-form-item v-show="options.length">
        <el-button type="primary" @click="submitForm(formRef)">提交</el-button>
        <el-button @click="resetForm(formRef)">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- dialog: 动态添加表单字段 -->
    <el-dialog title="Edit Form Label:" v-model="isEditVisible">
      <el-form :model="editForm" ref="editFormRef" label-width="100">
        <el-form-item label="字段" prop="label" required>
          <el-input v-model="editForm.label"></el-input>
        </el-form-item>
        <el-form-item label="属性" prop="prop" required>
          <el-input v-model="editForm.prop"></el-input>
        </el-form-item>
        <el-form-item label="必填" prop="required">
          <el-radio-group v-model="editForm.required">
            <el-radio :label="true">Yes</el-radio>
            <el-radio :label="false">No</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="submitEditForm(editFormRef)"
          >提交</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.button-bar {
  margin: 12px auto;
}

:deep(.el-form-item__content) {
  flex-wrap: nowrap;
}
</style>