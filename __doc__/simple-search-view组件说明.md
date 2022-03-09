# SimpleSearchView组件说明

该组件是为了方便后台管理系统写列表搜索封装的；

## 组件API说明
| 名称               | 说明             | 类型                                | 是否必须 | 默认值 | 范例                               |
| ------------------ | ---------------- | ----------------------------------- | -------- | ------ | ---------------------------------- |
| __属性(数据源)__   |                  |                                     |          |        |
| *list*             | 内容数组[^说明1] | Array                               | true     | []     |                                    |
| __属性(页面功能)__ |                  |                                     |          |        |                                    |
| __方法__           |                  |                                     |          |        |                                    |
| *searchData*       | 处理列表数据     | Function(<searchData>) | false    |        |                                    |
| *clearSearch*      | 处理即将新增数据 | Function() | false    |        |                                    |
| __内部方法__       |                  |                                     |          |        |                                    |
| *setFormValues*    | 设置form数据     | Function(<表单中的数据map>)         | false    |        | 必须要在form中才能设置，不然会报错 |
| __插槽(slot)__     |                  |                                     |          |        |                                    |

---
### 用例
```javascript
<template>
  <div>
   <SimpleSearchView
    :list="formList"
    @searchData="searchData"
    @clearSearch=""
  ></SimpleSearchView>
  </div>
</template>

<script>

export default {
  name: "FormTest",
  data() {
    return {
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
    searchData(data) {
      console.log(data);
    },
    clearSearch() {},
  },
};
</script>

<style lang="less" scoped></style>

```

[^说明1]: 数组内容参考cust-form表格内容
