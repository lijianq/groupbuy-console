<template>
  <a-modal
    :dialog-style="{ top: '10px' }"
    :title="title"
    :width="800"
    :visible="visible"
    @cancel="handleCancel"
  >
  <template slot="footer">
      <a-button class="right-button" @click="handleCancel()">{{$t('common.close')}}</a-button>
      <span v-if="isDetail && isApproval">
        <a-button type="primary" class="right-button" @click="gotoExpiredPage()">{{$t('common.next')}}</a-button>
        <a-button type="primary" class="right-button" @click="handleReject()">{{$t('route.action.reject')}}</a-button>
      </span>
      <span v-if="isExpiredPage">
        <a-button type="primary" class="right-button" @click="backToDetailPage()">{{$t('common.prev')}}</a-button>
        <a-button type="primary" class="right-button" @click="gotoPermissionPage()">{{$t('common.next')}}</a-button>
        <a-button class="right-button" @click="resetExpiredDate()">{{$t('route.action.reset')}}</a-button>
      </span>
      <span v-if="isPermission && !isApproval">
        <a-button type="primary" class="right-button" @click="handleSetPermission()">{{$t('route.action.permission.set')}}</a-button>
        <a-button class="right-button" @click="resetChecked()">{{$t('route.action.reset')}}</a-button>
      </span>
      <span v-if="isPermission && isApproval">
        <a-button type="primary" class="right-button" @click="backToExpiredPage()">{{$t('common.prev')}}</a-button>
        <a-button type="primary" class="right-button" @click="handleApprove()">{{$t('route.action.complete')}}</a-button>
        <a-button type="primary" class="right-button" @click="handleReject()">{{$t('route.action.reject')}}</a-button>
        <a-button class="right-button" @click="resetChecked()">{{$t('route.action.reset')}}</a-button>
      </span>
  </template>
  <a-spin :spinning="loading">
    <a-card :bordered="false" v-if="record">
      <div class="title">
        <img
          v-if="record.companyLogo"
          :src="`http://${record.companyLogo}`"
          class="logo"
        />
        {{ record.companyName }}
      </div>
      <a-divider style="margin-bottom: 10px" />
      <div v-if="isDetail">
        <a-descriptions :title="$t('company.base')" :column="3">
          <a-descriptions-item :label="$t('company.id')">{{
            record.companyId
          }}</a-descriptions-item>
          <a-descriptions-item :label="$t('company.contact')">{{
            record.companyContact
          }}</a-descriptions-item>
          <a-descriptions-item :label="$t('company.phone')">{{
            record.companyPhone
          }}</a-descriptions-item>
          <a-descriptions-item :label="$t('company.email')">{{
            record.companyEmail
          }}</a-descriptions-item>
          <a-descriptions-item :label="$t('company.industry')"
            >{{ $t(`company.industry.${record.companyIndustry}`) }}
          </a-descriptions-item>
        </a-descriptions>
        <a-descriptions :column="1">
          <a-descriptions-item :label="$t('company.address')">{{
            `${record.companyRegion} ${record.companyAddress}`
          }}</a-descriptions-item>
        </a-descriptions>
        <a-divider style="margin-top: 10px; margin-bottom: 10px" />
        <a-descriptions :title="$t('company.status.current')">
          <a-descriptions-item :label="$t('company.status')">{{
            $t(`company.status.${record.companyStatus.toLowerCase()}`)
          }}</a-descriptions-item>
          <a-descriptions-item :label="$t('company.expired.date')">{{
            record.companyExpiredTime
          }}</a-descriptions-item>
        </a-descriptions>
        <a-divider style="margin-top: 10px; margin-bottom: 10px" />
        <a-descriptions :title="$t('company.license.license')" :column="1">
          <a-descriptions-item :label="$t('company.license.no')">{{
            record.companyLicenseNo
          }}</a-descriptions-item>
          <a-descriptions-item>
            <viewer :images="images">
              <img
                class="preview"
                v-for="(src, index) in images"
                :src="src"
                :key="index"
              />
            </viewer>
          </a-descriptions-item>
        </a-descriptions>
      </div>
      <div v-if="isExpiredPage">
        <span style="margin-right: 15px;">{{$t('company.expired.date')}}:</span>
        <span> <a-date-picker :value="expiredDate" @change="onDateChange"/></span> 
      </div>
      <div v-if="isPermission">
        <a-tree
          checkable
          v-model="checkedKeys"
          :autoExpandParent="false"
          :selectable="false"
          :tree-data="treeData"
          @check="onCheck"
        >
        </a-tree>
      </div>
    </a-card>
    </a-spin>
  </a-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import SystemAPI from "@/api/system/SystemAPI";
import moment, { Moment } from 'moment'

@Component
export default class CompanyDetail extends Vue {
  @Prop({ type: String, default: "" })
  title: string | undefined;

  @Prop({ type: Boolean, default: false })
  visible = false;

  @Prop({ type: Object, default: null })
  record: any | {};

  images: string[] = [];

  formLayout: any = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 13 },
    },
  };

  loading = false;
  isDetail = false;
  isPermission = false;
  isApproval = false;
  isExpiredPage = false;

  defaultCheckedKeys: any[] = [];
  treeData: any[] = [];
  checkedKeys: any[] = [];
  halfCheckedKeys: any[] = [];
  expiredDate: Moment = moment();
  
  @Watch("record")
  modelChanged() {
    this.resetData();
    if (this.record) {
      this.images.push(`https://${this.record.companyLicense}`);
       this.expiredDate = moment().add(1, 'month');
      this.setFlag(this.record.type);
      if (this.isPermission || this.isApproval) {
        this.loading = true;
        SystemAPI.getCompanyPermission(this.record.companyId).then((result: any) => {
          this.treeData = result.data;
          this.setTreeData(this.treeData);
          this.checkedKeys = this.defaultCheckedKeys;
        }).catch(error => {
          this.$message.error(error.message);
        }).finally( () => {
          this.loading = false;
        })
      }
    }
  }

  resetData() {
    this.defaultCheckedKeys = [];
    this.images = [];
    this.treeData = [];
    this.checkedKeys = [];
    this.halfCheckedKeys = [];
    this.expiredDate = moment();
    this.isPermission = false;
    this.isApproval = false;
    this.isDetail = false;
    this.isExpiredPage = false;
  }

  resetChecked() {
    this.checkedKeys = this.defaultCheckedKeys;
    this.halfCheckedKeys = [];
  }

  resetExpiredDate() {
    this.expiredDate = moment().add(1, 'month');
  }

  setFlag(type: string) {
    if (type === 'permission') {
      this.isPermission = true;
    } else if (type === 'approval') {
      this.isApproval = true;
      this.isDetail = true;
    } else {
      this.isDetail = true;
    }
  }

  setTreeData(records: any[]) {
    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      record.title = this.$t(record.i18nKey);
      const children = record.children;
      if (children) {
        if (record.disableCheckbox) {
          this.defaultCheckedKeys.push(record.key)
        }
        this.setTreeData(children);
      } else {
        if (record.hasPermission) {
          this.defaultCheckedKeys.push(record.key)
        }
      }
    }
  }

  onCheck(checkedKeys: any[], info: any) {
    this.checkedKeys = checkedKeys;
    this.halfCheckedKeys = info.halfCheckedKeys;
  }

  onDateChange(date: Moment) {
    this.expiredDate = date;
  }

  gotoExpiredPage() {
    this.isDetail = false;
    this.isExpiredPage = true;
  }

  backToDetailPage() {
    this.isExpiredPage = false;
    this.isDetail = true;
  }

  gotoPermissionPage() {
    this.isExpiredPage = false;
    this.isPermission = true;
  }

  backToExpiredPage() {
    this.isPermission =  false;
    this.isExpiredPage = true;
  }

  handleCancel() {
    this.$emit('cancel');
  }

  handleReject() {
    this.loading = true;
    SystemAPI.rejectCompany(this.record.companyId).then((response: any) => {
      this.$emit('cancel', response.data);
    }).catch(error => {
      this.$message.error(error.message);
    }).finally(() => {
      this.loading = false;
    })
  }

  handleApprove() {
    this.loading = true;
    const selectedKeys: string[] = [...this.checkedKeys, ...this.halfCheckedKeys];
    const expiredDate = this.expiredDate.format('YYYY-MM-DD');
    const request: any = {
      actions: selectedKeys,
      expiredDate: expiredDate,
      email: this.record.companyEmail
    }
    SystemAPI.approveCompany(this.record.companyId, request).then((response: any) => {
      this.$emit('cancel', response.data);
    }).catch(error => {
      this.$message.error(error.message);
    }).finally(() => {
      this.loading = false;
    })
  }

  handleSetPermission() {
    this.loading = true;
    const selectedKeys: string[] = [...this.checkedKeys, ...this.halfCheckedKeys];
    SystemAPI.setCompanyPermission(this.record.companyId, selectedKeys).then(() => {
      this.$emit('cancel');
    }).catch(error => {
      this.$message.error(error.message);
    }).finally (() => {
      this.loading = false;
    })
  }
}
</script>
<style lang="less" scoped>
.logo {
  height: 32px;
  vertical-align: center;
  margin-right: 10px;
  border-style: none;
}
.preview {
  height: 160px;
  cursor: pointer;
  display: inline-block;
}
.title {
  color: rgba(0, 0, 0, 0.85);
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: 500;
}
button.right-button {
  margin-left: 10px;
  padding: 0 15px;
  font-size: 14px;
  width: 120px;
}
</style>
