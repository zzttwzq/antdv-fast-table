# CustomFormItem 组件说明

该组件是为了方便后台管理系统写增加和修改的表单提交型内容而创建的；会根据参数返回一个组件；

## item 参数解析

| 名称                                    | 说明                                          | 类型              | 是否必须 | 默认值             |
| --------------------------------------- | --------------------------------------------- | ----------------- | -------- | ------------------ |
| **公共参数**                            |                                               |                   |          |                    |
| _type_                                  | 组件类型[^说明1]                              | String            | true     | ''                 |
| _name_                                  | 组件名称                                      | String            | true     | ''                 |
| _decorator_                             | 装饰器[^说明2]                                | Array             | true     |                    |
| _colPull_                               | 栅格向左移动格数                              | Number            | false    | 0                  |
| _colPush_                               | 栅格向右移动格数                              | Number            | false    | 0                  |
| _colSpan_                               | 栅格占位格数（最大不能超过 24）               | Number            | false    | 24                 |
| _gutter_                                | 栅格间隔（最大不能超过 24）                   | Number            | false    | 24                 |
| _justify_                               | flex 布局下的水平排列方式：[^说明4]           | Number            | false    | space-between      |
| _align_                                 | flex 布局下的垂直对齐方式：[^说明5]           | Number            | false    | top                |
| _formLabelWidth_                        | 组件标题宽度（最大不能超过 24）               | Number            | false    | 6                  |
| _formWrapperWidth_                      | 组件内容宽度（最大不能超过 24）               | Number            | false    | 18                 |
| _disabled_                              | 是否禁用                                      | Boolean           | false    |                    |
| _placeholder_                           | 占位字符串                                    | String            | false    | '请选择｜请输入  ' |
| _tableWidth_                            | 表格内容宽度(默认按照 columns 数据自动计算)   | Number            | false    | 0                  |
| _tableHeight_                           | 表格内容高度 (默认 0, 不设置高度，没有滚动条) | Number            | false    | 0                  |
| _labelAlign_                            | form title 靠左还是靠右                       | String            | "right"  | "left" "right"     |
| **输入框(text)**                        |                                               |                   |          |                    |
| _prefixIcon_                            | 输入框前部 icon                               | String            | false    | ''                 |
| _prefixText_                            | 输入框前部文本                                | String            | false    | ''                 |
| _suffixIcon_                            | 输入框后部 icon                               | String            | false    | ''                 |
| _suffixText_                            | 输入框后部文本                                | String            | false    | ''                 |
| **文本框(textarea)**                    |                                               |                   |          |                    |
| _minRows_                               | 文本框最小行数                                | Number            | false    | 3                  |
| _maxRows_                               | 文本框最大行数                                | Number            | false    | 6                  |
| **数字输入框(number)**                  |                                               |                   |          |                    |
| _precision_                             | 小树位数                                      | Number            | false    | 0                  |
| **数字输入范围框(numberRange)**         |                                               |                   |          |                    |
| _precision_                             | 小树位数                                      | Number            | false    | 0                  |
| _precision2_                            | 小树位数                                      | Number            | false    | 0                  |
| **时间日期选择器(date,dateRange,time)** |                                               |                   |          |                    |
| _showTime_                              | 是否显示时间                                  | Boolean           | false    | false              |
| _disabledDate_                          | 小树位数                                      | monent Function() | false    |                    |
| _dateChanged_                           | 日期修改                                      | Function(<item>)  | false    |                    |
| **下拉选择器(select)**                  |                                               |                   |          |                    |
| _options_                               | 下拉列表数据：[^说明3]                        | Array             | false    | []                 |
| **单选组件(radioGroup)**                |                                               |                   |          |                    |
| _options_                               | 下拉列表数据：[^说明3]                        | Array             | false    | []                 |
| **多选组件(checkboxGroup)**             |                                               |                   |          |                    |
| _options_                               | 下拉列表数据：[^说明3]                        | Array             | false    | []                 |
| **文件上传组件(fileUpload)**            |                                               |                   |          |                    |
| _fileList_                              | 文件列表                                      | Array             | false    | []                 |
| _max_                                   | 最大数量                                      | Number            | false    | 1                  |
| **图片上传组件(imageUpload)**           |                                               |                   |          |                    |
| _fileList_                              | 文件列表                                      | Array             | false    | []                 |
| _max_                                   | 最大数量                                      | Number            | false    | 1                  |
| _isAvatar_                              | 是否是头像(会默认单个图片，并用圆形裁切)      | Boolean           | false    | false              |
| **公共方法**                            |                                               |                   |          |                    |
| _prefixClick_                           | 组件前部点击                                  | Function(<item>)  | false    |                    |
| _suffixClick_                           | 组件后部点击                                  | Function(<item>)  | false    |                    |
| **插槽(slot)**                          |                                               |                   |          |                    |

---

### 用例

```javascript
<template>
  <div>
   <CustomFormItem
    :item="item"
   >
   </CustomFormItem>
  </div>
</template>

<script>

export default {
  name: "FormTest",
  data() {
    return {
        item: {
          name: "字段名称",
          type: "text",
          decorator: [
            "nameCn",
            {
              rules: [{ required: true, message: "请输入字段名称" }],
            },
          ],
        }
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped></style>

```

[^说明1]: 组件类型:`text,textArea,number,numberRange,select,date,time,dateRange,radioGroup,checkboxGroup`
[^说明2]: 装饰器是通用的装饰器，与 antd 和 element 都保持一致；数组第一个是表单值名称，第二个是判断条件；
[^说明3]: options 是通用的数据，与 antd 和 element 都保持一致；{label|String, value|String,Number}；
[^说明4]: justify：`start end center space-around space-between`
[^说明5]: align：`top middle bottom`
