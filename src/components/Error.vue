<!--
     Author: fergus@mcdowall.no
     
     Display an error component and report Error to a central system
-->

<script setup>
defineProps({
  err: {
    type: Error,
    required: true
  },
  msg: {
    type: String,
    required: true
  }
})
</script>

<script>
export default {
  mounted() {
    // TODO: in a production system this would send to a log somewhere
    alert(
      '(in the background) code that sends message to Error log:\n' +
        this.err.toString()
    )
  }
}
</script>

<template>
  <span>{{ msg }}</span>
</template>

<style scoped>
span {
  color: red;
}
</style>
