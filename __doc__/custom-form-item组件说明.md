# CustomFormItem组件说明

该组件是为了方便后台管理系统写增加和修改的表单提交型内容而创建的；会根据参数返回一个组件；

## item参数解析
| 名称                                    | 说明                                         | 类型              | 是否必须 | 默认值            |
| --------------------------------------- | -------------------------------------------- | ----------------- | -------- | ----------------- |
| __公共参数__                            |                                              |                   |          |                   |
| *type*                                  | 组件类型[^说明1]                             | String            | true     | ''                |
| *name*                                  | 组件名称                                     | String            | true     | ''                |
| *decorator*                             | 装饰器[^说明2]                               | Array             | true     |                   |
| *colPull*                               | 栅格向左移动格数                             | Number            | false    | 0                 |
| *colPush*                               | 栅格向右移动格数                             | Number            | false    | 0                 |
| *colSpan*                               | 栅格占位格数（最大不能超过24）               | Number            | false    | 24                |
| *gutter*                                | 栅格间隔（最大不能超过24）                   | Number            | false    | 24                |
| *justify*                               | flex 布局下的水平排列方式：[^说明4]          | Number            | false    | space-between     |
| *align*                                 | flex 布局下的垂直对齐方式：[^说明5]          | Number            | false    | top               |
| *formLabelWidth*                        | 组件标题宽度（最大不能超过24）               | Number            | false    | 6                 |
| *formWrapperWidth*                      | 组件内容宽度（最大不能超过24）               | Number            | false    | 18                |
| *disabled*                              | 是否禁用                                     | Boolean           | false    |                   |
| *placeholder*                           | 占位字符串                                   | String            | false    | '请选择｜请输入 ' |
| *tableWidth*                            | 表格内容宽度(默认按照columns数据自动计算)    | Number            | false    | 0                 |
| *tableHeight*                           | 表格内容高度 (默认0, 不设置高度，没有滚动条) | Number            | false    | 0                 |
| __输入框(text)__                        |                                              |                   |          |                   |
| *prefixIcon*                            | 输入框前部icon                               | String            | false    | ''                |
| *prefixText*                            | 输入框前部文本                               | String            | false    | ''                |
| *suffixIcon*                            | 输入框后部icon                               | String            | false    | ''                |
| *suffixText*                            | 输入框后部文本                               | String            | false    | ''                |
| __文本框(textarea)__                    |                                              |                   |          |                   |
| *minRows*                               | 文本框最小行数                               | Number            | false    | 3                 |
| *maxRows*                               | 文本框最大行数                               | Number            | false    | 6                 |
| __数字输入框(number)__                  |                                              |                   |          |                   |
| *precision*                             | 小树位数                                     | Number            | false    | 0                 |
| __数字输入范围框(numberRange)__         |                                              |                   |          |                   |
| *precision*                             | 小树位数                                     | Number            | false    | 0                 |
| *precision2*                            | 小树位数                                     | Number            | false    | 0                 |
| __时间日期选择器(date,dateRange,time)__ |                                              |                   |          |                   |
| *showTime*                              | 是否显示时间                                 | Boolean           | false    | false             |
| *disabledDate*                          | 小树位数                                     | monent Function() | false    |                   |
| *dateChanged*                           | 日期修改                                     | Function(<item>)  | false    |                   |
| __下拉选择器(select)__                  |                                              |                   |          |                   |
| *options*                               | 下拉列表数据：[^说明3]                       | Array             | false    | []                |
| __单选组件(radioGroup)__                |                                              |                   |          |                   |
| *options*                               | 下拉列表数据：[^说明3]                       | Array             | false    | []                |
| __多选组件(checkboxGroup)__             |                                              |                   |          |                   |
| *options*                               | 下拉列表数据：[^说明3]                       | Array             | false    | []                |
| __文件上传组件(fileUpload)__            |                                              |                   |          |                   |
| *fileList*                              | 文件列表                                     | Array             | false    | []                |
| *max*                                   | 最大数量                                     | Number            | false    | 1                 |
| __图片上传组件(imageUpload)__           |                                              |                   |          |                   |
| *fileList*                              | 文件列表                                     | Array             | false    | []                |
| *max*                                   | 最大数量                                     | Number            | false    | 1                 |
| *isAvatar*                              | 是否是头像(会默认单个图片，并用圆形裁切)     | Boolean           | false    | false             |
| __公共方法__                            |                                              |                   |          |                   |
| *prefixClick*                           | 组件前部点击                                 | Function(<item>)  | false    |                   |
| *suffixClick*                           | 组件后部点击                                 | Function(<item>)  | false    |                   |
| __插槽(slot)__                          |                                              |                   |          |                   |

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

[^说明1]: 组件类型:```text,textArea,number,numberRange,select,date,time,dateRange,radioGroup,checkboxGroup```
[^说明2]: 装饰器是通用的装饰器，与antd和element都保持一致；数组第一个是表单值名称，第二个是判断条件；
[^说明3]: options是通用的数据，与antd和element都保持一致；{label|String, value|String,Number}；
[^说明4]: justify：```start end center space-around space-between```
[^说明5]: align：```top middle bottom``` 
