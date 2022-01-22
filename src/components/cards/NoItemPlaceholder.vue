<template>
  <div class="no-item-wrapper">
    <v-card
        elevation="2"
    >
      <v-card-text>
        {{title}}
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'NoItemPlaceholder',
  props: {
    title: {
      required: true,
      type: String
    }
  }
})
</script>

<style lang="scss" scoped>
.no-item-wrapper {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.v-card {
  width: 200px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;

  &__text {
    font-size: 20px;
    text-align: center;
  }
}
</style>