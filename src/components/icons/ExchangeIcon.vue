<template>
  <div class="exchange-wrapper">
    <font-awesome-icon icon="exchange-alt"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ExchangeIcon',
})
</script>

<style lang="scss" scoped>
.exchange-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 40px;

  & > svg {
    width: 30%;
    height: 30%;
  }
}
</style>