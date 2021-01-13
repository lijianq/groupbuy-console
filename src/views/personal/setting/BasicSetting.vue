<template>
  <div class="account-settings-info">
    <a-row :gutter="24">
      <a-col :md="24" :lg="16">
        <a-form :form="form" id="basicOpForm">
          <a-form-item :label="$t('account.company')">
            <a-input v-decorator="['companyId']" disabled />
          </a-form-item>
          <a-form-item :label="$t('account.id')">
            <a-input v-decorator="['accountId']" disabled />
          </a-form-item>
          <a-form-item :label="$t('account.name')">
            <a-input v-decorator="['accountName']" disabled />
          </a-form-item>
          <a-form-item :label="$t('account.full.name')">
            <a-input
              v-decorator="[
                'accountFullName',
                {
                  rules: [
                    {
                      required: true,
                      max: 50,
                      message: $t('account.full.name.required'),
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
          <a-form-item :label="$t('account.phone')">
            <a-input
              v-decorator="[
                'accountPhone',
                {
                  rules: [
                    {
                      required: true,
                      pattern: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/,
                      message: $t('common.phone.invalid'),
                    },
                    {
                      max: 20,
                      message: $t('common.phone.max'),
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
          <a-form-item>
            <a-button
              :loading="loading"
              type="primary"
              class="operation-button"
              @click="handleSave"
              >{{ $t("route.action.save") }}</a-button
            >
            <a-button class="operation-button" @click="resetForm">{{
              $t("route.action.reset")
            }}</a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <div class="ant-upload-preview" @click="openAvatarModal">
          <div class="mask">
            <a-icon type="plus" />
          </div>
          <img :src="avatar" />
        </div>
      </a-col>
    </a-row>

    <avatar-modal ref="avatarModal" @ok="setAvatar" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import AvatarModal from "./AvatarModal.vue";
import { WrappedFormUtils } from "ant-design-vue/types/form/form";
import personalAPI from "@/api/personal/PersonalAPI";

@Component({
  components: {
    AvatarModal,
  },
})
export default class BasicSetting extends Vue {
  @Prop({ type: Object, default: null })
  account: any | null;

  avatar: string = "";
  location: any = null;
  form!: WrappedFormUtils;
  loading = false;

  created() {
    this.form = this.$form.createForm(this, { name: "basicOpForm" });
  }

  @Watch("account")
  accountChanged() {
    this.resetForm();
  }

  resetForm() {
    const { account } = this;
    if (account) {
      this.form.setFieldsValue({
        companyId: account.companyId,
        accountId: account.accountId,
        accountName: account.accountName,
        accountFullName: account.accountFullName,
        accountPhone: account.accountPhone,
      });
      let avatarSrc: string = account.accountAvatar;
      if (avatarSrc) {
        avatarSrc = avatarSrc.trim();
        if (avatarSrc.toLowerCase().startsWith("http")) {
          this.avatar = avatarSrc;
        } else {
          this.avatar = `http://${avatarSrc}`;
        }
      } else {
        this.avatar = require("@/assets/avatars/default.png");
      }
    }
  }

  handleSave() {
    this.loading = true;
    this.form.validateFields(
      ["accountFullName", "accountPhone"],
      (err, values) => {
        if (!err) {
          const updatedAccount: any = {};
          updatedAccount.companyId = this.account.companyId;
          updatedAccount.accountId = this.account.accountId;
          updatedAccount.accountFullName = values.accountFullName;
          updatedAccount.accountPhone = values.accountPhone;
          if (this.location) {
            updatedAccount.accountAvatar = this.location;
          } else {
            updatedAccount.accountAvatar = this.account.accountAvatar;
          }

          personalAPI
            .updateAccount(updatedAccount)
            .then(() => {
              values.accountAvatar = this.location;
              this.$emit("accountChanged", values);
            })
            .catch((error) => {
              this.$message.error(error.message);
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          this.loading = false;
        }
      }
    );
  }

  openAvatarModal() {
    const modal: any = this.$refs.avatarModal;
    modal.open(this.account.companyId, this.account.accountId);
  }

  setAvatar(result: any) {
    this.location = result.Location;
    this.avatar = `http://${result.Location}?${Date.now()}`;
  }
}
</script>

<style lang="less" scoped>
button.operation-button {
  margin-top: 10px;
  margin-right: 20px;
  padding: 0 15px;
  font-size: 14px;
  height: 35px;
  width: 180px;
}
.account-settings-info {
  margin-top: 20px;
}
.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  margin-top: 30px;
  width: 100%;
  max-width: 160px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;

  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img,
  .mask {
    width: 100%;
    max-width: 160px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
