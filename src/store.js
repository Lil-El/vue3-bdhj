import { defineStore } from "pinia";
import { setStorage, getStorage } from "./utils/storage";

const KEY = "tabs";

export const useStore = defineStore("AMOUNT", {
  state: () => ({
    [KEY]: getStorage(KEY) || {},
  }),
  getters: {
    getAllTab: (state) => state[KEY],
    getTabByKey: (state) => (key) => state[KEY][key],
  },
  actions: {
    setTab(key, value) {
      this[KEY][key] = value;
      setStorage(KEY, this[KEY]);
    },
    removeTab(key) {
      delete this[KEY][key];
      setStorage(KEY, this[KEY]);
    },
  },
});
