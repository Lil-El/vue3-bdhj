export default {
  mounted() {
    if (this.$options?.bgType) {
      this.$el.setAttribute("data-bg", this.$options.bgType);
    }
  },
};
