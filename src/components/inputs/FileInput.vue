<template>
  <v-file-input
      label="File input"
      outlined
      dense
  ></v-file-input>
</template>
<script>

export default {
  data: () => ({
    files: [],
    text: 'text'
  }),
}
</script>

<style>
.v-file-input {
  width: 100%;
}
</style>