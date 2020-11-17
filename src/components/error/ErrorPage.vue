<template>
  <div class="error">
    <div class="imgBlock">
      <div class="imgEle" :style="{backgroundImage: `url(${types[type].img})`}">
      </div>
    </div>
    <div class="content">
      <h1>{{ types[type].title }}</h1>
      <div class="desc">{{ $t(types[type].desc) }}</div>
      <div class="actions">
        <a-button type="primary" @click="goHome">返回首页</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ErrorPage from "./ErrorPage"
export default ErrorPage
</script>

<style lang="less" scoped>
@import "ErrorPage";
</style>
