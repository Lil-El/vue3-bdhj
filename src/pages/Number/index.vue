<template>
  <div>
    <div v-show="false">Decimal.js</div>
    <span v-show="false">处理js精度，多是在小数上。decimal.js中将数字符号、整数、指数、小数部分分开保存。</span>
    <span v-show="false">但是对于位数交多的数据，仍然无法处理。例如：10....0（100个0）</span>
    <span v-show="false">如果自己实现的话，我会将数字分割用数组保存，对于常规的计算都依据竖式计算来进行计算。</span>
    <span v-show="false">从个位起开始计算，需要进位就给前一位进行相加</span>

    <div v-for="item in record" :key="item.id">{{item.name}}</div>
  </div>
</template>

<script setup>
import { isProxy, reactive, ref } from "vue";
import Decimal from "./decimal.mjs"

const a = new Decimal(1000900000)
console.log(a);
// const b = new Decimal(0.2)
const c = a.add(1)
console.log(c.toString());


const rawData = [{
  id: 1, name: "Mino"
}, {
  id: 2, name: "Mini"
}]
let record = reactive([]);
setTimeout(() => {
  console.log(isProxy(record));
  /**
   * 直接修改record会导致record不再是proxy的代理对象；使用record = reactive(raw)也不可行
   * 1. 使用reactive: state.record = res.data;
   * 2. 使用ref:      record.value = res.data;
   */
  // record = reactive(rawData); // error.
  rawData.forEach(i => record.push(i)); // right
  console.log(isProxy(record));
}, 1000)
</script>

<style>
</style>