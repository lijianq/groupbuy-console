<template>
  <a-modal
    :title="$t('account.avatar.modify')"
    :visible="visible"
    :maskClosable="false"
    :width="800"
    :footer="null"
    @cancel="handleCancel"
  >
    <a-row>
      <a-col :xs="24" :md="12" :style="{ height: '350px' }">
        <vue-cropper
          ref="cropper"
          :img="options.img"
          :info="true"
          :autoCrop="options.autoCrop"
          :autoCropWidth="options.autoCropWidth"
          :autoCropHeight="options.autoCropHeight"
          :fixedBox="options.fixedBox"
          @realTime="realTime"
        >
        </vue-cropper>
      </a-col>
      <a-col :xs="24" :md="12" :style="{ height: '350px' }">
        <div class="avatar-upload-preview">
          <img :src="previews.url" :style="previews.img" />
        </div>
      </a-col>
    </a-row>
    <br />
    <a-row>
      <a-col :lg="2" :md="2">
        <a-upload
          name="file"
          :beforeUpload="beforeUpload"
          :showUploadList="false"
          accept="image/*"
        >
          <a-button icon="upload" type="primary" class="operation-button">{{
            $t("common.image.select")
          }}</a-button>
        </a-upload>
      </a-col>
      <a-col :lg="{ span: 6, offset: 4 }" :md="2">
        <a-button icon="plus" class="image-button" @click="changeScale(1)" />
        <a-button icon="minus" class="image-button" @click="changeScale(-1)" />
        <a-button icon="undo" class="image-button" @click="rotateLeft" />
        <a-button icon="redo" class="image-button" @click="rotateRight" />
      </a-col>
      <a-col :lg="{ span: 2, offset: 3 }" :md="2">
        <a-button
          type="primary"
          class="operation-button"
          :loading="confirmLoading"
          @click="handleUpload()"
          >{{ $t("route.action.save") }}</a-button
        >
      </a-col>
    </a-row>
  </a-modal>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import cosAPI from "@/api/cos/CosAPI";

@Component
export default class AvatarModal extends Vue {
  visible = false;
  confirmLoading = false;
  uploading = false;
  options: any = {
    img: "",
    autoCrop: true,
    autoCropWidth: 200,
    autoCropHeight: 200,
    fixedBox: true,
  };
  previews: any = {};
  companyId: any = null;
  accountId: any = null;

  open(companyId: string, accountId: string) {
    this.visible = true;
    this.companyId = companyId;
    this.accountId = accountId;
  }

  close() {
    this.companyId = null;
    this.accountId = null;
    this.options.img = "";
    this.visible = false;
  }

  handleCancel() {
    this.close();
  }

  changeScale(num: number) {
    num = num || 1;
    const cropper: any = this.$refs.cropper;
    cropper.changeScale(num);
  }

  rotateLeft() {
    const cropper: any = this.$refs.cropper;
    cropper.rotateLeft();
  }

  rotateRight() {
    const cropper: any = this.$refs.cropper;
    cropper.rotateRight();
  }

  beforeUpload(file: any) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.options.img = reader.result;
    };
    return false;
  }

  handleUpload() {
    const cropper: any = this.$refs.cropper;
    cropper.getCropBlob((data: any) => {
      this.confirmLoading = true;
      const file = new window.File([data], "avatar.png", { type: data.type });
      const targetId = `${this.companyId}/${this.accountId}`;
      cosAPI
        .uploadFile(file, targetId)
        .then((result: any) => {
          this.$emit("ok", result);
          this.close();
        })
        .catch((error) => {
          this.$message.error(error.message);
        })
        .finally(() => {
          this.confirmLoading = false;
        });
    });
  }

  realTime(data: any) {
    this.previews = data;
  }
}
</script>

<style lang="less" scoped>
button.image-button {
  margin-right: 5px;
  font-size: 14px;
  height: 35px;
  width: 40px;
}
button.operation-button {
  margin-right: 20px;
  padding: 0 15px;
  font-size: 14px;
  height: 35px;
  width: 180px;
}
.avatar-upload-preview {
  position: absolute;
  top: 50%;
  transform: translate(50%, -50%);
  width: 180px;
  height: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
