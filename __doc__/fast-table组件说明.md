# FastTable 组件说明

该组件是为了方便后台管理系统写列表增删改查功能而创建的；

## 组件 API 说明

| 名称 | 说明 | 类型 | 是否必须 | 默认值   | 范例 |
| -------------------- | -------------------------------------- | ------------------------------------------------------------- | -------- | -------- | ------------------------------------------------------------ |
| **Table(属性)** | | | | | |
| _tableHeaderList_ | 表头数组 | Array | true | [] | 这个沿用 antd 或者 elment 的 table 表头 |
| _tableSearchList_    | 表头数组[^说明1] | Array | true | [] | 搜索内容视图内容 |
| _tableFormList_      | 表头数组[^说明1] | Array | true | [] | 新增和修改内容 |
| _title_              | 页面的标题 | String | false | | 如角色管理等 |
| _pageNumKey_         | 分页 page 字段名称 | String | false | pageNum  | |
| _pageSizeKey_        | 分页 size 字段名称 | String | false | pageSize | |
| _pageStart_          | 分页起始值 | Number | false | 1 | |
| _logLevel_           | 日志等级 | String | false | "debug" | TableLogLevel.info, TableLogLevel.debug, TableLogLevel.error |
| _showTableAdd_       | 自带的新增操作功能 | Boolean | | | |
| _showTableDelete_    | 自带的删除操作功能 | Boolean | true | | |
| _showTableEdit_      | 自带的编辑操作功能 | Boolean | true |
| _showPagination_     | table 底部的 Pagination | Boolean | true | | |
| **Table(方法)**      | | | | | | 
| _onExpand_           | 扩展点击的时候 | Function(expanded<Boolen>, rowItem<Object>) | false | |                                                              |
| _onChange_           | pagination, filters or sorter 改变回调 | Function(pagination<Object>, filters<Object>, sorter<Object>) | false | | |
| **Table(插槽 slot)** | | | | | |
| _buttons:data_       | 列表操作列自定义按钮 | | false | | 会返回当前列的 data |
| _topLeftButtons_     | 表格顶部左侧按钮 | | | | |
| _topRightButtons_    | 表格顶部右侧按钮 | | | | |
| _custEditModel_      | 自定义表格增加修改的 model 内容 | | false | | |
| **Form 表单** | | | | | | | |
| _tableFormWidth_ | 弹窗宽度 | Number | 500 | | |
| _tableFormSubmitClick_ | 弹窗提交按钮点击 | Boolean | false | | |
| _tableFormCancelClick_ | 弹窗取消按钮点击 | Boolean | false | | |
| _onFormPrefixClick_ | 弹窗前缀按钮点击 | Number | false | | |
| _onFormSuffixClick_ | 弹窗后缀按钮点击 | Number | false | | |
| _useCustomForm_ | 使用自定义的表格 | Boolean | false | | |
| **Table 请求接口[^说明2]** | | | | | |
| _listRequest_ | 列表接口 | Object<Promise> | false | | |
| _addRequest_ | 新增接口 | Object<Promise> | false | | |
| _editDetailRequest_ | 获取详情接口 | Object<Promise> | false | | |
| _editRequest_ | 修改接口 | Object<Promise> | false | | |
| _deleteRequest_ | 删除接口 | Object<Promise> | false | | |
| **Table 请求回调** | | | | | |
| _handelWillSearch_ | 处理即将搜索的数据 | Function(search<Object>) | false | | |
| _handelWillGetList_ | 处理即将调用请求接口 | Function(params<Object>) | false | | |
| _handelListData_ | 处理列表数据 | Function(data<Array<Object>>) | false | | |
| _handelWillAdd_ | 处理即将新增数据 | Function() | false | | |
| _handelWillEdit_ | 处理即将点击修改按钮 | Function(rowItem<Object>) | false | | |
| _handelModifyData_ | 处理新增修改数据 | Function(values<Object>) | false | | |
| _handelAddResult_ | 处理新增返回结果 | Function(status<Boolean>, res<Object>) | false | | |
| _handelEditResult_ | 处理修改返回结果 | Function(status<Boolean>, res<Object>) | false | | |
| _handelWillDelete_ | 即将删除回调 | Function(params<Object>) | false | | |
| _handelDeleteResult_ | 删除返回结果 | Function(status<Boolean>, res<Object>) | false | | |

---

### 用例

```vue
<template>
  <div>
    <FastTable
      title="项目分类"
      :logLevel="TableLogLevel.debug"
      :tableHeaderList="columns"
      :tableSearchList="searchList"
      :tableFormList="formList"
      pageNumKey="page"
      pageSizeKey="size"
      :pageStart="0"
      :tableFormWidth="500"
      :listRequest="listRequest"
      :addRequest="addRequest"
      :editRequest="editRequest"
      :detailRequest="detailRequest"
      :deleteRequest="deleteRequest"
      :onRequestSuccess="onRequestSuccess"
      :onRequestError="onRequestError"
      :onWillSearch="onWillSearch"
      :onSearch="onSearch"
      @onDidSearch="onDidSearch"
      :onWillGetList="onWillGetList"
      :onGetList="onGetList"
      @onDidGetList="onDidGetList"
      :onWillPopAdd="onWillPopAdd"
      :onWillAdd="onWillAdd"
      :onAdd="onAdd"
      @onDidAdd="onDidAdd"
      :onWillPopEdit="onWillPopEdit"
      :onWillEdit="onWillEdit"
      :onEdit="onEdit"
      @onDidEdit="onDidEdit"
      :onWillEditDetail="onWillEditDetail"
      :onEditDetail="onEditDetail"
      @onDidEditDetail="onDidEditDetail"
      :onWillPopDelete="onWillPopDelete"
      :onWillDelete="onWillDelete"
      :onDelete="onDelete"
      @onDidDelete="onDidDelete"
      @onFormPrefixClick="onFormPrefixClick"
      @onFormSuffixClick="onFormSuffixClick"
    >
      <template slot="tableCustomForm">
        <div></div>
      </template>
    </FastTable>
  </div>
</template>

<script>
// 导入mixin文件
import mixin from "./mixin" 

export default {
  mixins: [mixin],
  name: 'BlogPage', // 博客 博客 
   data() {
    return {}
  },
  created() {
    this.init();
  },
  methods: {},
};
</script>

<style lang='less' scoped>
</style>
```

```js
# mixin.js
import { getBlog, postBlog, getBlogByID, deleteBlogByID,getBlogCategory, 
getUser, 
  } from "@/api/ApiRequest" 
import { TableRequestType, TableLogLevel } from "antdv-fast-table/enum";

export default {
  data() {
    return {
      TableLogLevel: TableLogLevel,
      TableRequestType: TableRequestType,
      /// relateList
      blogCategoryList: [], 
      userList: [], 

      /// table
      columns: [
        {
          title: '记录id',//记录id
          dataIndex: 'id',
          key: 'id',
          sort: 'up',
          align: 'center',
          width: 100,
          showTime: false,
        },
        {
          title: '标题',//标题
          dataIndex: 'title',
          key: 'title',
          sort: 'up',
          align: 'left',
          width: 100,
          showTime: false,
        },
        {
          title: '描述',//描述
          dataIndex: 'des',
          key: 'des',
          sort: 'up',
          align: 'left',
          width: 100,
          showTime: false,
        },
        {
          title: '关联图片',//关联图片
          dataIndex: 'cover',
          key: 'cover',
          sort: 'up',
          align: 'left',
          width: 100,
          showTime: false,
        },
        {
          title: '内容(markdown格式)',//内容(markdown格式)
          dataIndex: 'content',
          key: 'content',
          sort: 'up',
          align: 'left',
          width: 100,
          showTime: false,
        },
        {
          title: '标签',//标签
          dataIndex: 'tag',
          key: 'tag',
          sort: 'up',
          align: 'left',
          width: 100,
          showTime: false,
        },
        {
          title: '关联博客分类#blog_category',//关联博客分类#blog_category
          dataIndex: 'blogCategoryId',
          key: 'blogCategoryId',
          sort: 'up',
          align: 'left',
          width: 100,
          showTime: false,
        },
        {
          title: '关联用户#user',//关联用户#user
          dataIndex: 'userId',
          key: 'userId',
          sort: 'up',
          align: 'left',
          width: 100,
          showTime: false,
        },
        {
          title: '查看',//查看
          dataIndex: 'see',
          key: 'see',
          sort: 'up',
          align: 'left',
          width: 100,
          showTime: false,
        },
        {
          title: '点赞',//点赞
          dataIndex: 'star',
          key: 'star',
          sort: 'up',
          align: 'left',
          width: 100,
          showTime: false,
        },
        {
          title: '评论',//评论
          dataIndex: 'coment',
          key: 'coment',
          sort: 'up',
          align: 'left',
          width: 100,
          showTime: false,
        },
        {
          title: '创建于',//创建于
          dataIndex: 'createAt',
          key: 'createAt',
          sort: 'up',
          align: 'center',
          width: 100,
          showTime: true,
        },
        {
          title: '更新于',//更新于
          dataIndex: 'updateAt',
          key: 'updateAt',
          sort: 'up',
          align: 'center',
          width: 100,
          showTime: true,
        },
        {
          title: '删除于',//删除于
          dataIndex: 'deleteAt',
          key: 'deleteAt',
          sort: 'up',
          align: 'center',
          width: 100,
          showTime: true,
        },

        {
          title: '操作',
          scopedSlots: {
            customRender: 'action',
          },
        },
      ],

      /// 搜索内容
      searchList: [
        {
          name: 'title', //标题 
          title: '标题',
          type: 'text', // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            'title',
            {
              rules: [
                { required: 0, message: '标题 为必填项' },
              ],
            },
          ],
          sort: 'up',
          align: 'left',
          width: 100,
          showTime: false,
        },
        {
          name: 'des', //描述 
          title: '描述',
          type: 'text', // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            'des',
            {
              rules: [
                { required: 0, message: '描述 为必填项' },
              ],
            },
          ],
          sort: 'up',
          align: 'left',
          width: 100,
          showTime: false,
        },
        {
          name: 'cover', //关联图片 
          title: '关联图片',
          type: 'text', // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            'cover',
            {
              rules: [
                { required: 0, message: '关联图片 为必填项' },
              ],
            },
          ],
          sort: 'up',
          align: 'left',
          width: 100,
          showTime: false,
        },
        {
          name: 'content', //内容(markdown格式) 
          title: '内容(markdown格式)',
          type: 'textArea', // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            'content',
            {
              rules: [
                { required: 0, message: '内容(markdown格式) 为必填项' },
              ],
            },
          ],
          sort: 'up',
          align: 'left',
          width: 100,
          showTime: false,
        },
        {
          name: 'tag', //标签 
          title: '标签',
          type: 'text', // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            'tag',
            {
              rules: [
                { required: 0, message: '标签 为必填项' },
              ],
            },
          ],
          sort: 'up',
          align: 'left',
          width: 100,
          showTime: false,
        },
        {
          name: 'blogCategoryId', //关联博客分类 
          title: '关联博客分类',
          type: 'select', // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            'blogCategoryId',
            {
              rules: [
                { required: 0, message: '关联博客分类 为必填项' },
              ],
            },
          ],
          options: [
          ],
          sort: 'up',
          align: 'left',
          width: 100,
          showTime: false,
        },
        {
          name: 'userId', //关联用户 
          title: '关联用户',
          type: 'select', // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            'userId',
            {
              rules: [
                { required: 0, message: '关联用户 为必填项' },
              ],
            },
          ],
          options: [
          ],
          sort: 'up',
          align: 'left',
          width: 100,
          showTime: false,
        },
        {
          name: 'see', //查看 
          title: '查看',
          type: 'number', // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            'see',
            {
              rules: [
                { required: 0, message: '查看 为必填项' },
              ],
            },
          ],
          precision: 0,
          sort: 'up',
          align: 'left',
          width: 100,
          showTime: false,
        },
        {
          name: 'star', //点赞 
          title: '点赞',
          type: 'number', // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            'star',
            {
              rules: [
                { required: 0, message: '点赞 为必填项' },
              ],
            },
          ],
          precision: 0,
          sort: 'up',
          align: 'left',
          width: 100,
          showTime: false,
        },
        {
          name: 'coment', //评论 
          title: '评论',
          type: 'number', // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            'coment',
            {
              rules: [
                { required: 0, message: '评论 为必填项' },
              ],
            },
          ],
          precision: 0,
          sort: 'up',
          align: 'left',
          width: 100,
          showTime: false,
        },
        {
          name: 'createAt', //创建于 
          title: '创建于',
          type: 'date', // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            'createAt',
            {
              rules: [
                { required: 0, message: '创建于 为必填项' },
              ],
            },
          ],
          sort: 'up',
          align: 'center',
          width: 100,
          showTime: true,
        },
        {
          name: 'updateAt', //更新于 
          title: '更新于',
          type: 'date', // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            'updateAt',
            {
              rules: [
                { required: 0, message: '更新于 为必填项' },
              ],
            },
          ],
          sort: 'up',
          align: 'center',
          width: 100,
          showTime: true,
        },
      ],

      /// 表单信息列表
      formList: [
        {
          name: 'title', //标题 
          title: '标题',
          type: 'text', // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            'title',
            {
              rules: [
                { required: 0, message: '标题 为必填项' },
              ],
            },
          ],
          sort: 'up',
          align: 'left',
          width: 100,
          showTime: false,
        },
        {
          name: 'des', //描述 
          title: '描述',
          type: 'text', // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            'des',
            {
              rules: [
                { required: 0, message: '描述 为必填项' },
              ],
            },
          ],
          sort: 'up',
          align: 'left',
          width: 100,
          showTime: false,
        },
        {
          name: 'cover', //关联图片 
          title: '关联图片',
          type: 'text', // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            'cover',
            {
              rules: [
                { required: 0, message: '关联图片 为必填项' },
              ],
            },
          ],
          sort: 'up',
          align: 'left',
          width: 100,
          showTime: false,
        },
        {
          name: 'content', //内容(markdown格式) 
          title: '内容(markdown格式)',
          type: 'textArea', // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            'content',
            {
              rules: [
                { required: 0, message: '内容(markdown格式) 为必填项' },
              ],
            },
          ],
          sort: 'up',
          align: 'left',
          width: 100,
          showTime: false,
        },
        {
          name: 'tag', //标签 
          title: '标签',
          type: 'text', // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            'tag',
            {
              rules: [
                { required: 0, message: '标签 为必填项' },
              ],
            },
          ],
          sort: 'up',
          align: 'left',
          width: 100,
          showTime: false,
        },
        {
          name: 'blogCategoryId', //关联博客分类 
          title: '关联博客分类',
          type: 'select', // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            'blogCategoryId',
            {
              rules: [
                { required: 0, message: '关联博客分类 为必填项' },
              ],
            },
          ],
          options: [
          ],
          sort: 'up',
          align: 'left',
          width: 100,
          showTime: false,
        },
        {
          name: 'userId', //关联用户 
          title: '关联用户',
          type: 'select', // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            'userId',
            {
              rules: [
                { required: 0, message: '关联用户 为必填项' },
              ],
            },
          ],
          options: [
          ],
          sort: 'up',
          align: 'left',
          width: 100,
          showTime: false,
        },
        {
          name: 'see', //查看 
          title: '查看',
          type: 'number', // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            'see',
            {
              rules: [
                { required: 0, message: '查看 为必填项' },
              ],
            },
          ],
          precision: 0,
          sort: 'up',
          align: 'left',
          width: 100,
          showTime: false,
        },
        {
          name: 'star', //点赞 
          title: '点赞',
          type: 'number', // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            'star',
            {
              rules: [
                { required: 0, message: '点赞 为必填项' },
              ],
            },
          ],
          precision: 0,
          sort: 'up',
          align: 'left',
          width: 100,
          showTime: false,
        },
        {
          name: 'coment', //评论 
          title: '评论',
          type: 'number', // text, number, numberRange, select, date, datetime, dateRange
          decorator: [
            'coment',
            {
              rules: [
                { required: 0, message: '评论 为必填项' },
              ],
            },
          ],
          precision: 0,
          sort: 'up',
          align: 'left',
          width: 100,
          showTime: false,
        },
      ],

      listRequest: getBlog,
      addRequest: postBlog,
      editRequest: postBlog,
      detailRequest: getBlogByID,
      deleteRequest: deleteBlogByID,
    };
  },
  methods: {
    async init() {
      this.getBlogCategoryList(); 
      this.getUserList(); 
    },
    // 获取列表数据
    async getBlogCategoryList() { 
      let data = await getBlogCategory({ "page": 0, "size": 100000 });
      // 转换select options 数据
      data = data.map(v => {
        return {
          "label": v["name"] != undefined ? v["name"] : v["title"],
          "value": v["id"],
        };
      })
      this.blogCategoryList = data; 
      // 给formlist里的`blogCategoryId`.options 重新赋值
      this.formList.map(it => {
        if (it["name"] == "blogCategoryId") {
          it["options"] = this.blogCategoryList;
        }
      });
      this.searchList.map(it => {
        if (it["name"] == "blogCategoryId") {
          it["options"] = this.blogCategoryList;
        }
      });
    },
    // 获取列表数据
    async getUserList() { 
      let data = await getUser({ "page": 0, "size": 100000 });
      // 转换select options 数据
      data = data.map(v => {
        return {
          "label": v["name"] != undefined ? v["name"] : v["title"],
          "value": v["id"],
        };
      })
      this.userList = data; 
      // 给formlist里的`userId`.options 重新赋值
      this.formList.map(it => {
        if (it["name"] == "userId") {
          it["options"] = this.userList;
        }
      });
      this.searchList.map(it => {
        if (it["name"] == "userId") {
          it["options"] = this.userList;
        }
      });
    },
    onRequestSuccess(type, res, refreshList) {
      console.log(this.TableRequestType.onList == type);
      console.log(">onRequestSuccess", type, res);
      switch (type) {
        case this.TableRequestType.onList:
          // res.map((it) => {
          //   it["title"] = "name";
          // });
          break;
        case this.TableRequestType.onAdd:
          refreshList(); // 刷新列表
          break;
        case this.TableRequestType.onEditDetail:
          break;
        case this.TableRequestType.onEdit:
          refreshList(); // 刷新列表
          break;
        case this.TableRequestType.onDelete:
          refreshList(); // 刷新列表
          break;
        default:
          break;
      }
    },
    onRequestError(type, res) {
      console.log(">onRequestError", type, res);
      switch (type) {
        case this.TableRequestType.onList:
          break;
        case this.TableRequestType.onAdd:
          break;
        case this.TableRequestType.onEditDetail:
          break;
        case this.TableRequestType.onEdit:
          break;
        case this.TableRequestType.onDelete:
          break;

        default:
          break;
      }
    },
    onWillSearch(params, pagenation) {
      console.log(">onWillSearch", params, pagenation);
    },
    onSearch(params) {
      console.log(">onSearch", params);
      return true;
    },
    onDidSearch() {
      console.log(">onDidSearch");
    },
    onWillGetList(params) {
      params["test"] = 10;
      console.log(">onWillGetList", params);
    },
    onGetList(params) {
      console.log(">onGetList", params);
      return true;
    },
    onDidGetList() {
      console.log(">onDidGetList");
    },
    onWillPopAdd() {
      console.log(">onWillPopAdd");
      return true;
    },
    onWillAdd(params) {
      console.log("onWillAdd", params);
    },
    onAdd(params) {
      console.log(">onAdd", params);
      return true;
    },
    onDidAdd() {
      console.log(">onDidAdd");
    },
    onWillPopEdit() {
      console.log(">onWillPopEdit");
      return true;
    },
    onWillEditDetail(params) {
      console.log(">onWillEditDetail", params);
    },
    onEditDetail(params) {
      console.log(">onEditDetail", params);
      return true;
    },
    onDidEditDetail() {
      console.log(">onDidEditDetail");
    },
    onWillEdit(params) {
      console.log(">onWillEdit", params);
    },
    onEdit(params) {
      console.log(">onEdit", params);
      return true;
    },
    onDidEdit() {
      console.log(">onDidEdit");
    },
    onWillPopDelete() {
      console.log(">onWillPopDelete");
      return true;
    },
    onWillDelete(params) {
      console.log(">onWillDelete", params);
    },
    onDelete(params) {
      console.log(">onDelete", params);
      return true;
    },
    onDidDelete() {
      console.log("onDidDelete");
    },
    onFormPrefixClick() {

    },
    onFormSuffixClick() {

    },
    log(title, msg) {
      console.log(`[ProjectCategory->${title}]`, msg ?? "");
    },
  },
};

```

[^说明1]: 数组内容参考 cust-form 表格内容
[^说明2]: 接口取请使用 await 方式，或者自定义成 async 类型方法
