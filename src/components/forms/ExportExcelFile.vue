<template>
  <div class="export-wrapper">
    <h2>Export excel file</h2>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
      <v-text-field
          label="File name"
          type="text"
          v-model="file"
          outlined
          dense
      />
      <v-btn
          color="primary"
          elevation="4"
          height="40px"
      >
        Save file
      </v-btn>
    </v-form>
  </div>
</template>

<script>

export default {
  data: () => ({
    valid: true,
    file: 'Книга облику',
  }),
};
</script>

<style lang="scss" scoped>
.v-file-input {
  width: 100%;
}

.v-form {
  width: 100%;
  display: flex;
}

.v-btn {
  margin: 0 0 0 20px;
}

.export-wrapper {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
</style>