# FastTable组件说明

该组件是为了方便后台管理系统写列表增删改查功能而创建的；

## 组件API说明
| 名称                       | 说明                   | 类型                                          | 是否必须 | 默认值 | 范例                              |
| -------------------------- | ---------------------- | --------------------------------------------- | -------- | ------ | --------------------------------- |
| __属性(数据源)__           |                        |                                               |          |        |                                   |
| *columns*                  | 表头数组               | Array                                         | true     | []     | 这个沿用antd或者elment的table表头 |
| *searchList*               | 表头数组[^说明1]       | Array                                         | true     | []     | 搜索内容视图内容                  |
| *formList*                 | 表头数组[^说明1]       | Array                                         | true     | []     | 新增和修改内容                    |
| *title*                    | 页面的标题             | String                                        | false    |        | 如角色管理等                      |
| __属性(页面功能)__         |                        |                                               |          |        |                                   |
| *disableAddAction*         | 禁用自带的新增操作功能 | Boolean                                       | false    |        |                                   |
| *disableDeleteAction*      | 禁用自带的删除操作功能 | Boolean                                       | false    |        |                                   |
| *disableEditAction*        | 禁用自带的编辑操作功能 | Boolean                                       | false    |        |                                   |
| __属性(接口请求)[^说明2]__ |                        |                                               |          |        |                                   |
| *listUrl*                  | 列表接口               | String                                        | false    |        |                                   |
| *addUrl*                   | 新增接口               | String                                        | false    |        |                                   |
| *editDetailUrl*            | 获取详情接口           | String                                        | false    |        |                                   |
| *editUrl*                  | 修改接口               | String                                        | false    |        |                                   |
| *deleteUrl*                | 删除接口               | String                                        | false    |        |                                   |
| *listRequest*              | 列表接口               | Object<Promise>                               | false    |        |                                   |
| *addRequest*               | 新增接口               | Object<Promise>                               | false    |        |                                   |
| *editDetailRequest*        | 获取详情接口           | Object<Promise>                               | false    |        |                                   |
| *editRequest*              | 修改接口               | Object<Promise>                               | false    |        |                                   |
| *deleteRequest*            | 删除接口               | Object<Promise>                               | false    |        |                                   |
| __方法__                   |                        |                                               |          |        |                                   |
| *handelListData*           | 处理列表数据           | Function(<处理的数据>)                        | false    |        |                                   |
| *handelWillAdd*            | 处理即将新增数据       | Boolen<是否继续执行> Function()               | false    |        |                                   |
| *handelModifyData*         | 处理新增修改数据       | Function(<修改后的数据>)                      | false    |        |                                   |
| *handelWillEdit*           | 处理即将点击修改按钮   | Boolen<是否继续执行> Function(<修改前的数据>) | false    |        |                                   |
| *handelAddResult*          | 处理新增返回结果       | Function(<请求成功状态>, <请返回结果>)        | false    |        |                                   |
| *handelEditResult*         | 处理修改返回结果       | Function(<请求成功状态>, <请返回结果>)        | false    |        |                                   |
| *handelDeleteResult*       | 处理删除返回结果       | Function(<请求成功状态>, <请返回结果>)        | false    |        |                                   |
| __插槽(slot)__             |                        |                                               |          |        |                                   |
| *buttons:data*             | 列表操作列自定义按钮   |                                               | false    |        | 会返回当前列的data                |

---
### 用例
```javascript
<template>
  <div>
    <FastTable
      title="字段管理"
      :columns="columns"
      :searchList="searchList"
      :formList="formList"
      :listRequest="get_field_page"
      :addRequest="post_field"
      :editRequest="post_field_update"
      :editDetailRequest="get_field"
      :deleteRequest="delete_field"
      :handelListData="handelListData"
      :handelWillEdit="handelWillEdit"
      :handelWillAdd="handelWillAdd"
      :handelModifyData="handelModifyData"
      :handelAddResult="handelAddResult"
      :handelEditResult="handelEditResult"
      :handelDeleteResult="handelDeleteResult"
    >
      <template v-slot:buttons="data">
        <a @click="yesRelevance(data.record)"> 账号关联 </a>
      </template>
    </FastTable>
  </div>
</template>

<script>
import {
  get_field_category_list,
  get_field_list_all,
  get_field_all,
  get_field,
  post_field,
  post_field_update,
  get_field_page,
  delete_field,
} from "@/api/columns_request";

export default {
  name: "ColumnManager",
  data() {
    return {
      columns: [
        {
          title: "字段名称",
          key: "nameCn",
          dataIndex: "nameCn",
        },
        {
          title: "字段别名",
          key: "nameEn",
          dataIndex: "nameEn",
        },
        {
          title: "所属列表",
          key: "listName",
          dataIndex: "listName",
        },
        {
          title: "是否脱敏",
          key: "desensitization",
          dataIndex: "desensitization",
        },
        {
          title: "父字段",
          key: "parentName",
          dataIndex: "parentName",
        },
        {
          key: "action",
          title: "操作",
          scopedSlots: {
            customRender: "action",
          },
        },
      ],
      searchList: [],
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
      get_field,
      get_field_page,
      post_field,
      post_field_update,
      delete_field,
    };
  },
  mounted() {
    this.getFieldCategory();
    this.getFieldList();
    this.getPFieldList();
  },
  methods: {
    // 获取字段列表
    async getFieldList() {
      let data = await get_field_list_all({
        pageNum: 1,
        pageSize: 100,
      });

      let list = [];
      data.map((it) => {
        list.push({
          label: it.name,
          value: it.id,
          ...it,
        });
      });

      this.formList[5].options = list;
      this.$forceUpdate();
    },
    // 获取父字段
    async getPFieldList() {
      let data = await get_field_all({
        pageNum: 1,
        pageSize: 100,
      });

      let list = [];
      data.map((it) => {
        list.push({
          label: it.name,
          value: it.id,
          ...it,
        });
      });

      this.formList[7].option = list;
      this.$forceUpdate();
    },
    // 获取字段类别
    async getFieldCategory() {
      let data = await get_field_category_list({
        pageNum: 1,
        pageSize: 1000,
      });

      let list = [];
      data.map((it) => {
        list.push({
          label: it.name,
          value: it.id,
          ...it,
        });
      });

      this.formList[8].options = list;
      this.$forceUpdate();
    },

    handelListData(data) {
      data.map((it) => {
        it.listName = "";
        it.fieldLists.map((it2) => {
          it.listName += it2.name + ",";
        });

        it.desensitization = it.desensitization == 0 ? "否" : "是";
        it.listName = it.listName.substr(0, it.listName.length - 1);
      });
    },
    handelWillEdit(data) {
      let list = [];
      data.fieldLists.map((it) => {
        list.push(it.id);
      });
      data.listIds = list;
    },
    handelWillAdd() {},
    handelModifyData(data) {
      console.log(data);
    },
    handelAddResult(success, data) {
      console.log(success, data);
    },
    handelEditResult(success, data) {
      console.log(success, data);
    },
    handelDeleteResult(success, data) {
      console.log(success, data);
    },
  },
};
</script>

<style lang="less" scoped></style>

```

[^说明1]: 数组内容参考cust-form表格内容
[^说明2]: 接口取object和string一种即可，不需要两个都写，如果两个都有那会优先取object类型的接口;