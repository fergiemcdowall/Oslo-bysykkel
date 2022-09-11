<script setup>
defineProps({
  err: {
    type: Error,
    required: true,
  },
  msg: {
    type: String,
    required: true,
  },
});
</script>

<script>
export default {
  mounted() {
    alert(
      "(in the background) code that sends message to Error log:\n" +
        this.err.toString()
    );
  },
};
</script>

<template>
  <span>{{ msg }}</span>
</template>

<style scoped>
span {
  color: red;
}
</style>
