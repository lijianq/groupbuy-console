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
        <a-button type="primary" @click="goHome">{{ $t("common.back.home") }}</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { RouterConfiguration} from '@/config'

@Component
export default class ErrorPage extends Vue {

     types = {
        401: {
            img: require('@/assets/401.svg'),
            title: '401',
            desc: 'error.401'
        },
        404: {
            img: require('@/assets/404.svg'),
            title: '404',
            desc: 'error.404'
        },
        500: {
            img: require('@/assets/500.svg'),
            title: '500',
            desc: 'error.500'
        }
    }

    @Prop({type: String, default: 'ErrorPage'})
    public name: string | undefined
    @Prop({type: String, default: '404'})
    public type: string | undefined

    goHome() {
        this.$router.push({path: RouterConfiguration.homePath})
    }
}
</script>

<style lang="less" scoped>
@import "node_modules/ant-design-vue/lib/style/index";

.error {
  display: flex;
  align-items: center;
  height: 80%;
  min-height: 500px;

  .imgBlock {
    flex: 0 0 62.5%;
    width: 62.5%;
    padding-right: 152px;
    zoom: 1;
    &::before,
    &::after {
      content: ' ';
      display: table;
    }
    &::after {
      clear: both;
      height: 0;
      font-size: 0;
      visibility: hidden;
    }
  }

  .imgEle {
    float: right;
    width: 100%;
    max-width: 430px;
    height: 360px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
  }

  .content {
    flex: auto;

    h1 {
      margin-bottom: 24px;
      color: #434e59;
      font-weight: 600;
      font-size: 72px;
      line-height: 72px;
    }

    .desc {
      margin-bottom: 16px;
      color: @text-color-secondary;
      font-size: 20px;
      line-height: 28px;
    }

    .actions {
      button:not(:last-child) {
        margin-right: 8px;
      }
    }
  }
}

@media screen and (max-width: @screen-xl) {
  .error {
    .imgBlock {
      padding-right: 88px;
    }
  }
}

@media screen and (max-width: @screen-sm) {
  .error {
    display: block;
    text-align: center;
    .imgBlock {
      margin: 0 auto 24px;
      padding-right: 0;
    }
  }
}

@media screen and (max-width: @screen-xs) {
  .error {
    .imgBlock {
      margin-bottom: -24px;
      overflow: hidden;
    }
  }
}
</style>
