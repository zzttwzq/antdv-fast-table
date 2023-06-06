<template>
  <div>
    <a-form layout="horizontal" :form="form" ref="forms">
      <!-- :justify="item.justify ? item.justify : 'space-between'"
        :align="item.align ? item.align : 'middle'"
        :gutter="item.gutter ? item.gutter : 0" -->
      <a-row
        type="flex"
        justify="start"
        align="middle"
        :gutter="0"
        :md="24"
        :sm="24"
        :lg="24"
        :xl="24"
        :xxl="24"
      >
        <a-col
          :pull="item.colPull ? item.colPull : 0"
          :push="item.colPush ? item.colPush : 0"
          :span="item.colSpan ? item.colSpan : 24"
          :key="index"
          v-for="(item, index) in list2"
        >
          <slot v-if="item.slot" :name="item.slot" :record="record"></slot>
          <CustomFormItem
            v-else
            :prefixClick="prefixClick"
            :suffixClick="suffixClick"
            :item="item"
            :change="change"
          ></CustomFormItem>
        </a-col>
      </a-row>
      <a-row
        v-if="showBtns"
        type="flex"
        justify="start"
        align="middle"
        :gutter="0"
        :md="24"
        :sm="24"
        :lg="24"
        :xl="24"
        :xxl="24"
        style="margin-top: 20px"
      >
        <a-col :offset="9"
          ><a-button @click="cancel">取消</a-button>
          <a-button @click="submit" type="primary" style="margin-left: 8px"
            >提交</a-button
          >
          <slot name="customButtons"></slot
        ></a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "CustomFormList",
  props: {
    // ====== 数据
    // 列表数据
    list: {
      type: Array,
      required: true,
      default: () => [],
    },
    // 是否显示提交取消按钮
    showBtns: {
      type: Boolean,
      required: true,
      default: true,
    },
    // ====== 方法
    // 提交按钮点击
    submitClick: {
      type: Function,
      required: false,
      default: () => {},
    },
    // 取消按钮点击
    cancelClick: {
      type: Function,
      required: false,
      default: () => {},
    },
    // 内容前部区域点击如：input的prefix
    prefixClick: {
      type: Function,
      required: false,
      default: () => {},
    },
    // 内容后部区域点击如：input的suffix
    suffixClick: {
      type: Function,
      required: false,
      default: () => {},
    },
    // 内容改动
    change: {
      type: Function,
      required: false,
      default: () => {},
    },
  },
  data() {
    return {
      list2: this.list,
      form: this.$form.createForm(this),
    };
  },
  watch: {
    list(val) {
      this.list2 = val;
    },
  },
  methods: {
    submit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.submitClick) {
            this.submitClick(values);
          }
        }
      });
    },
    cancel() {
      if (this.cancelClick) {
        this.cancelClick();
      }
    },
    // 获取form表单
    getForm() {
      return this.form;
    },
    // 设置form数据
    setFormValues(formValues) {
      return this.form.setFieldsValue(formValues);
    },
    // 获取form数据
    getFormValues(formValues) {
      return this.form.setFieldsValue(formValues);
    },
  },
};
</script>
<style lang="css"></style>
