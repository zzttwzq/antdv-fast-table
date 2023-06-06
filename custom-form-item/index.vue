<template>
  <a-form-item
    :label="item.name"
    :labelCol="{
      span: item.formLabelWidth ? item.formLabelWidth : 6,
      offset: item.formLabelOffset ? item.formLabelOffset : 0,
    }"
    :wrapperCol="{
      span: item.formWrapperWidth ? item.formWrapperWidth : 18,
      offset: item.formWrapperOffset ? item.formWrapperOffset : 0,
    }"
    :labelAlign="item.labelAlign ? item.labelAlign : 'right'"
  >
    <!-- 文本类型 -->
    <a-input
      v-if="item.type == 'text'"
      :disabled="item.disabled ? true : false"
      v-decorator="item.decorator"
      :placeholder="item.placeholder ? item.placeholder : '请输入'"
    >
      <template v-if="item.prefixIcon || item.prefixText" slot="prefix"
        ><div style="cursor: pointer" @click="prefixClick(item)">
          <a-icon v-if="item.prefixIcon" :type="item.prefixIcon" />
          <span v-if="item.prefixText">{{ item.prefixText }}</span>
        </div>
      </template>
      <template v-if="item.suffixIcon || item.suffixText" slot="suffix">
        <div @click="suffixClick(item)" style="cursor: pointer">
          <a-icon v-if="item.suffixIcon" :type="item.suffixIcon" />
          <span v-if="item.suffixText">{{ item.suffixText }}</span>
        </div>
      </template>
    </a-input>

    <!-- 长文本类型 -->
    <a-textarea
      v-else-if="item.type == 'textarea'"
      placeholder="请输入"
      :auto-size="{
        minRows: item.minRows ? item.minRows : 3,
        maxRows: item.maxRows ? item.maxRows : 6,
      }"
      v-decorator="item.decorator"
    />

    <!-- 数字类型 -->
    <a-input-number
      v-else-if="item.type == 'number'"
      :disabled="item.disabled ? true : false"
      style="width: 100%"
      v-decorator="item.decorator"
      :precision="item.precision ? Number(item.precision) : 0"
      :placeholder="item.placeholder ? item.placeholder : '请输入'"
    >
      <!-- <a-icon slot="prefix" type="user" />
      <a-tooltip slot="suffix" title="Extra information">
        <a-icon type="info-circle" style="color: rgba(0, 0, 0, 0.45)" />
      </a-tooltip> -->
    </a-input-number>

    <!-- 数字范围类型 -->
    <div class="flex-center" v-else-if="item.type == 'numberRange'">
      <a-input-number
        style="display: inline-block; width: 100%"
        v-decorator="item.decorator"
        :precision="item.precision ? Number(item.precision) : 0"
        :placeholder="item.placeholder ? item.placeholder : '请输入'"
      />
      &nbsp;<span>至</span>&nbsp;
      <a-input-number
        style="display: inline-block; width: 100%"
        v-decorator="item.decorator2"
        :precision="item.precision2 ? Number(item.precision2) : 0"
        :placeholder="item.placeholder2 ? item.placeholder2 : '请输入'"
      />
    </div>

    <!-- 日期选择器 -->
    <a-date-picker
      style="width: 100%"
      v-else-if="item.type == 'date'"
      :showTime="item.showTime"
      :disabled-date="item.disabledDate ? item.disabledDate(item) : null"
      @change="item.dateChanged ? item.dateChanged : null"
      v-decorator="item.decorator"
      :placeholder="item.placeholder ? item.placeholder : '请输入'"
    />

    <!-- 时间日期选择器 -->
    <a-date-picker
      style="width: 100%"
      v-else-if="item.type == 'datetime'"
      :showTime="item.showTime"
      :disabled-date="item.disabledDate ? item.disabledDate(item) : null"
      @change="item.dateChanged ? item.dateChanged : null"
      v-decorator="item.decorator"
      :placeholder="item.placeholder ? item.placeholder : '请输入'"
    />

    <!-- 时间日期范围选择器 -->
    <a-range-picker
      style="width: 100%"
      v-else-if="item.type == 'dateRange'"
      :showTime="item.showTime"
      :disabled-date="item.disabledDate ? item.disabledDate(item) : null"
      @change="item.dateChanged ? item.dateChanged : null"
      v-decorator="item.decorator"
      :placeholder="item.placeholder ? item.placeholder : ['开始时间', '结束时间']"
    />

    <!-- 时间选择 -->
    <a-time-picker
      style="width: 100%"
      v-else-if="item.type == 'time'"
      :disabled-date="item.disabledDate ? item.disabledDate(item) : null"
      @change="item.dateChanged ? item.dateChanged : null"
      v-decorator="item.decorator"
      :placeholder="item.placeholder ? item.placeholder : '请选择时间'"
    />

    <!-- select选择器 -->
    <a-select
      allowClear
      style="width: 100%"
      v-else-if="item.type == 'select'"
      v-decorator="item.decorator"
      :options="item.options"
      :placeholder="item.placeholder ? item.placeholder : '请选择'"
    >
    </a-select>

    <!-- radioGroup -->
    <a-radio-group
      style="width: 100%"
      v-else-if="item.type == 'radioGroup'"
      v-decorator="item.decorator"
      :options="item.options"
      :placeholder="item.placeholder ? item.placeholder : '请选择'"
    />

    <!-- checkboxGroup -->
    <a-checkbox-group
      style="width: 100%"
      v-else-if="item.type == 'checkboxGroup'"
      v-decorator="item.decorator"
      :options="item.options"
      :placeholder="item.placeholder ? item.placeholder : '请选择'"
    />

    <!-- 文件上传 -->

    <!-- 图片上传 -->
  </a-form-item>
</template>

<script>
import moment from "moment";

export default {
  name: "CustomFormItem",
  props: {
    //  配置参数
    item: {
      type: Object,
      required: true,
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
    return {};
  },
  methods: {
    // 不能选择以前的日期
    disabledDate(current) {
      return current && current < moment().endOf("day").subtract(1, "days");
    },
  },
  change(e) {
    this.change(this.item, e);
  },
};
</script>
<style lang="css">
.flex-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
