<template>
  <div>

    <a-form-item :label="item.title" :labelCol="{
      span: 6,
      offset: item.formLabelOffset ? item.formLabelOffset : 2,
    }" :labelAlign="item.labelAlign ? item.labelAlign : 'right'" :wrapperCol="{
      span: 10,
      offset: item.formWrapperOffset ? item.formWrapperOffset : 0,
    }">

      <!-- 文本类型 -->
      <a-input v-if="item.type == 'text'" :disabled="item.disabled ? true : false" v-decorator="item.decorator"
        :placeholder="item.placeholder ? item.placeholder : '请输入'" @change="item.change ? item.change : null">
        <template v-if="item.prefixIcon || item.prefixText" slot="prefix">
          <div style="cursor: pointer" @click="prefixClick(item)">
            <a-icon v-if="item.prefixIcon" :type="item.prefixIcon" />
            <span v-if="item.prefixText">{{ item.prefixText }}</span>
          </div>
        </template>
        <template v-if="item.suffixIcon || item.suffixText" slot="suffix">
          <div style="cursor: pointer" @click="suffixClick(item)">
            <a-icon v-if="item.suffixIcon" :type="item.suffixIcon" />
            <span v-if="item.suffixText">{{ item.suffixText }}</span>
          </div>
        </template>
      </a-input>

      <!-- 长文本类型 -->
      <a-textarea v-else-if="item.type == 'textArea'" placeholder="请输入" :auto-size="{
        minRows: item.minRows ? item.minRows : 3,
        maxRows: item.maxRows ? item.maxRows : 6,
      }" v-decorator="item.decorator" @change="item.change ? item.change : null" />

      <!-- 数字类型 -->
      <a-input-number v-else-if="item.type == 'number'" :disabled="item.disabled ? true : false" style="width: 100%"
        v-decorator="item.decorator" :precision="item.precision ? Number(item.precision) : 0"
        :placeholder="item.placeholder ? item.placeholder : '请输入'" @change="item.change ? item.change : null">
        <template v-if="item.prefixIcon || item.prefixText" slot="prefix">
          <div style="cursor: pointer" @click="prefixClick(item)">
            <a-icon v-if="item.prefixIcon" :type="item.prefixIcon" />
            <span v-if="item.prefixText">{{ item.prefixText }}</span>
          </div>
        </template>
        <template v-if="item.suffixIcon || item.suffixText" slot="suffix">
          <div style="cursor: pointer" @click="suffixClick(item)">
            <a-icon v-if="item.suffixIcon" :type="item.suffixIcon" />
            <span v-if="item.suffixText">{{ item.suffixText }}</span>
          </div>
        </template>
      </a-input-number>

      <!-- 数字范围类型 -->
      <div class="flex-center" v-else-if="item.type == 'numberRange'">
        <a-input-number style="display: inline-block; width: 100%" v-decorator="item.decorator"
          :precision="item.precision ? Number(item.precision) : 0"
          :placeholder="item.placeholder ? item.placeholder : '请输入'" @change="item.change ? item.change : null" />
        &nbsp;<span>至</span>&nbsp;
        <a-input-number style="display: inline-block; width: 100%" v-decorator="item.decorator2"
          :precision="item.precision2 ? Number(item.precision2) : 0"
          :placeholder="item.placeholder2 ? item.placeholder2 : '请输入'" @change="item.change ? item.change : null" />
      </div>

      <!-- 日期选择器 -->
      <a-date-picker style="width: 100%" v-else-if="item.type == 'date'" :showTime="item.showTime"
        :disabled-date="item.disabledDate ? item.disabledDate(item) : null" v-decorator="item.decorator"
        :placeholder="item.placeholder ? item.placeholder : '请输入'" @change="item.change ? item.change : null" />

      <!-- 时间日期范围选择器 -->
      <a-range-picker style="width: 100%" v-else-if="item.type == 'dateRange'" :showTime="item.showTime"
        :disabled-date="item.disabledDate ? item.disabledDate(item) : null" v-decorator="item.decorator" :placeholder="item.placeholder ? item.placeholder : ['开始时间', '结束时间']
          " @change="item.change ? item.change : null" />

      <!-- 时间选择 -->
      <a-time-picker style="width: 100%" v-else-if="item.type == 'time'"
        :disabled-date="item.disabledDate ? item.disabledDate(item) : null" @change="item.change ? item.change : null"
        v-decorator="item.decorator" :placeholder="item.placeholder ? item.placeholder : '请选择时间'" />

      <!-- select选择器 -->
      <a-select allowClear style="width: 100%" v-else-if="item.type == 'select'" v-decorator="item.decorator"
        :options="item.options" :placeholder="item.placeholder ? item.placeholder : '请选择'"
        @change="item.change ? item.change : null">
      </a-select>

      <!-- radioGroup -->
      <a-radio-group style="width: 100%" v-else-if="item.type == 'radioGroup'" v-decorator="item.decorator"
        :options="item.options" :placeholder="item.placeholder ? item.placeholder : '请选择'"
        @change="item.change ? item.change : null" />

      <!-- checkboxGroup -->
      <a-checkbox-group style="width: 100%" v-else-if="item.type == 'checkboxGroup'" v-decorator="item.decorator"
        :options="item.options" :placeholder="item.placeholder ? item.placeholder : '请选择'"
        @change="item.change ? item.change : null" />

      <!-- 文件上传 -->
      <a-upload-dragger v-else-if="item.type == 'fileDrag'" v-decorator="[
        'dragger',
        {
          valuePropName: 'fileList',
          getValueFromEvent: normFile,
        },
      ]" name="files" action="/upload.do">
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox" />
        </p>
        <p class="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p class="ant-upload-hint">
          Support for a single or bulk upload.
        </p>
      </a-upload-dragger>

      <!-- 图片上传 -->
      <a-upload v-else-if="item.type == 'image'" :headers="item.headers" :action="item.action" list-type="picture-card"
        :file-list="fileList" :multiple="item.multiple" @preview="handlePreview" :before-upload="beforeUpload"
        @change="handleChange">
        <div v-if="fileList.length < item.limit">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            {{ item.uploadText ? item.uploadText : 'Upload' }}
          </div>
        </div>
      </a-upload>

      <!-- 自定义类型 -->
    </a-form-item>

    <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
import moment from "moment";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default {
  name: "CustomFormItem",
  props: {
    //  配置参数
    item: {
      type: Object,
      required: true,
      default: () => { },
    },
    // 内容前部区域点击如：input的prefix
    prefixClick: {
      type: Function,
      required: false,
      default: () => { },
    },
    // 内容后部区域点击如：input的suffix
    suffixClick: {
      type: Function,
      required: false,
      default: () => { },
    },
    // 内容改动
    change: {
      type: Function,
      required: false,
      default: () => { },
    },
  },
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
  },
  methods: {
    // 不能选择以前的日期
    disabledDate(current) {
      return current && current < moment().endOf("day").subtract(1, "days");
    },
    inputChange(e) {
      this.change(this.item, e);
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    beforeUpload(file) {
      if (this.item.beforeUpload) {
        return this.item.beforeUpload(file);
      }
      else {
        return true;
      }
    },
    handleChange(e) {
      console.log(">>>", e);
      this.item.handleChange(e);
    }
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

.flex-row-space {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
