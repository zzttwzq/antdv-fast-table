# CustomFormList组件说明

该组件是为了方便后台管理系统写增加和修改的表单提交型内容而创建的；会根据参数返回组件列表；

## 组件API说明
| 名称               | 说明                 | 类型                                | 是否必须 | 默认值 | 范例                               |
| ------------------ | -------------------- | ----------------------------------- | -------- | ------ | ---------------------------------- |
| __属性(数据源)__   |                      |                                     |          |        |
| *list*             | 表头数组[^说明1]     | Array                               | true     | []     | 这个沿用antd或者elment的table表头  |
| __属性(页面功能)__ |                      |                                     |          |        |                                    |
| *showBtns*         | 是否显示提交取消按钮 | Boolean                             | false    | true   |                                    |  |
| __方法__           |                      |                                     |          |        |                                    |
| *prefixClick*      | 输入框前部点击       | Function(<item>) | false    |        |                                    |
| *suffixClick*      | 输入框后部点击       | Function(<item>) | false    |        |                                    |
| *submitClick*      | 提交按钮点击         | Function(<提交的数据>)              | false    |        |                                    |
| *cancelClick*      | 取消按钮点击         | Function()                          | false    |        |                                    |
| __内部方法__       |                      |                                     |          |        |                                    |
| *getForm*          | 获取form表单         | Object Function()                   | false    |        |                                    |
| *setFormValues*    | 设置form数据         | Function(<表单中的数据map>)         | false    |        | 必须要在form中才能设置，不然会报错 |
| *getFormValues*    | 获取form数据         | Map<String, any> Function()         | false    |        |                                    |
| __插槽(slot)__     |                      |                                     |          |        |                                    |
| *customButtons*    | 列表操作列自定义按钮 |                                     | false    |        | 会返回当前列的data                 |

---
### 用例
```javascript
<template>
  <div>
   <CustomFormList
    :prefixClick="prefixClick"
    :suffixClick="suffixClick"
    :submitClick="submitClick"
    :cancelClick="cancelClick"
    ref="form"
    :list="formList"
    :showBtns="showBtns"
   ></CustomFormList>
  </div>
</template>

<script>

export default {
  name: "FormTest",
  data() {
    return {
      showBtns: true,
      formList: [
        {
          name: "字段名称",
          type: "text", // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            "nameCn",
            {
              rules: [{ required: true, message: "请输入字段名称" }],
            },
          ],
        },
        {
          name: "字段别名",
          type: "text", // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            "nameEn",
            {
              rules: [{ required: true, message: "请输入字段别名" }],
            },
          ],
        },
        {
          name: "字段宽度",
          type: "number", // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            "width",
            {
              rules: [{ required: true, message: "请输入字段宽度" }],
            },
          ],
        },
        {
          name: "字段浮动",
          type: "radioGroup", // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            "fixed",
            {
              rules: [{ required: true, message: "请选择字段浮动" }],
            },
          ],
          options: [
            { label: "左浮动", value: "left" },
            { label: "居中", value: "center" },
            { label: "右浮动", value: "right" },
          ],
        },
        {
          name: "脱敏展示",
          type: "radioGroup", // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            "desensitization",
            {
              rules: [{ required: true, message: "请选择脱敏展示" }],
            },
          ],
          options: [
            { label: "否", value: 0 },
            { label: "是", value: 1 },
          ],
        },
        {
          name: "所属列表",
          type: "checkboxGroup", // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            "listIds",
            {
              rules: [{ required: true, message: "请选择所属列表" }],
            },
          ],
          options: [],
        },
        {
          name: "字段类型",
          type: "radioGroup", // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            "fieldType",
            {
              rules: [{ required: true, message: "请选择字段类型" }],
            },
          ],
          options: [
            { label: "常规字段", value: 1 },
            { label: "特殊字段", value: 2 },
          ],
        },
        {
          name: "父字段",
          type: "select", // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            "pid",
            {
              rules: [{ required: false, message: "请选择父字段" }],
            },
          ],
          options: [],
        },
        {
          name: "字段类别",
          type: "select", // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            "fieldCategory",
            {
              rules: [{ required: true, message: "请选择字段类别" }],
            },
          ],
          options: [],
        },
        {
          name: "链接地址",
          type: "text", // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            "url",
            {
              rules: [{ required: false, message: "请输入链接地址" }],
            },
          ],
        },
      ],
    };
  },
  methods: {
    prefixClick(e) {
      this.$emit("prefixClick", e);
    },
    suffixClick(e) {
      this.$emit("suffixClick", e);
    },
    submitClick(data) {
      console.log(data);
    },
    cancelClick() {},
  },
};
</script>

<style lang="less" scoped></style>

```

[^说明1]: 数组内容参考cust-form表格内容
[^说明2]: 接口取object和string一种即可，不需要两个都写，如果两个都有那会优先取object类型的接口;
