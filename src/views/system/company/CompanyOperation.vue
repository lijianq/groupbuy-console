<template>
  <a-modal
    :title="title"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" id="companyOpForm" v-bind="formLayout">
        <a-form-item v-show="model" label="主键ID">
          <a-input v-decorator="['id', { initialValue: 0 }]" disabled />
        </a-form-item>
        <a-form-item label="描述">
          <a-input v-decorator="['description', {rules: [{required: true, min: 5, message: '请输入至少五个字符！'}]}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import {WrappedFormUtils} from 'ant-design-vue/types/form/form'
import pick from 'lodash.pick'

@Component
export default class CompanyOperation extends Vue {

  fields = ['description', 'id']
   
  @Prop({type: String, default: ''})
  title: string | undefined

  @Prop({type: Boolean, default: false})
  visible = false

  @Prop({type: Boolean, default: false})
  loading = false

  @Prop({type: Object, default: null})
  model: any | {}

  formLayout: any = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 13 }
    }
  }

  form!: WrappedFormUtils

  created() {
    this.form = this.$form.createForm(this, {name: 'companyOpForm'})
  }

  @Watch('model')
  modelChanged() { 
    this.fields.forEach(v => this.form.getFieldDecorator(v, {}))
    console.log("this.model=",this.model)
    if (this.model) {
      this.form.setFieldsValue(pick(this.model, this.fields))
    } else {
      this.form.resetFields()
    }
  }
}
</script>