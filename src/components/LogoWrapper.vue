<template>
  <div id="logo-wrapper">
    <img src="@/assets/logo/logo-dark.png" alt="SkidInc logo" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class LogoWrapper extends Vue {}
</script>

<style lang="scss" scoped>
#logo-wrapper {
  pointer-events: none;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  img {
    display: block;
    opacity: 0.1;
  }
}
</style>
