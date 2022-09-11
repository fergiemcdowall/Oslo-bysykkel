<template>
  <td colspan="3" class="loader">
    <div>
      <div />
    </div>
    <br />
    loading...
  </td>
</template>

<style scoped>
.loader {
  text-align: center;
}

.loader div {
  justify-content: center;
  display: flex;
}

.loader div div {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #555;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
