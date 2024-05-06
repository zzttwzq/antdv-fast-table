<template>
  <div>
    <a-card :title="title">
      <div>
        <SimpleSearchView
          :list="searchList2"
          @searchData="searchData"
          @clearSearch="clearSearch"
          v-if="searchList2.length"
          ref="search"
        ></SimpleSearchView>
      </div>
      <div>
        <a-space class="operator">
          <div>
            <a-button v-if="!disableAddAction" @click="add" type="primary">新建</a-button>
            <slot name="topLeftButtons"></slot>
          </div>
          <slot name="topRightButtons"></slot>
        </a-space>
        <StandardTable
          :rowKey="rowKey"
          :loading="loading"
          :columns="columns2"
          :dataSource="dataSource"
          :pagination="disablePagination ? null : pagination"
          @change="change"
          :onExpand="onExpand"
          :scroll="{ x: tableWidth2, y: tableHeight2 }"
        >
          <div slot="description" slot-scope="{ text }">
            {{ text }}
          </div>
          <div slot="action" slot-scope="{ record }">
            <a v-if="!disableEditAction" @click="edit(record)" style="margin-right: 8px">
              编辑
            </a>
            <a v-if="!disableDeleteAction" @click="deleteRecord(record.id)"> 删除 </a>
            <slot name="buttons" :record="record"></slot>
          </div>
        </StandardTable>
      </div>
    </a-card>
    <!-- 角色添加和修改 -->
    <a-modal
      v-model="visible"
      :title="isAdd ? '新增' : '修改'"
      :ok-text="isAdd ? '新增' : '修改'"
      cancel-text="取消"
      :loading="loading"
      @ok="submit"
      :width="custEditModelWidth"
    >
      <slot v-if="custEditModel" name="custEditModel"></slot>
      <CustomFormList
        :prefixClick="prefixClick"
        :suffixClick="suffixClick"
        ref="form"
        :list="formList2"
        :showBtns="false"
        v-else
      ></CustomFormList>
    </a-modal>
  </div>
</template>

<script>
// 本地获取默认数量
let pageSize = localStorage.getItem("pageSize");
pageSize = Number(pageSize);

export default {
  name: "FastTable",
  props: {
    // 表行标记
    rowKey: {
      type: String | Number,
    },
    ///========= 数据源
    // 表头
    columns: {
      type: Array,
      required: true,
      default: () => [],
    },
    // 搜索列表
    searchList: {
      type: Array,
      required: true,
      default: () => [],
    },
    // 增加修改modal
    formList: {
      type: Array,
      required: true,
    },
    // 标题
    title: {
      type: String,
      required: false,
      default: "",
    },
    ///========= 页面功能
    custEditModel: {
      type: Boolean,
      required: false,
      default: false,
    },
    custEditModelWidth: {
      type: Number,
      required: false,
      default: 500,
    },
    // 禁用自带的删除操作功能
    disableDeleteAction: {
      type: Boolean,
      required: false,
      default: false,
    },
    // 禁用自带的编辑操作功能
    disableEditAction: {
      type: Boolean,
      required: false,
      default: false,
    },
    // 禁用自带的编辑操作功能
    disableAddAction: {
      type: Boolean,
      required: false,
      default: false,
    },
    // 禁用table底部的cardview
    disableBackCardView: {
      type: Boolean,
      required: false,
      default: false,
    },
    // 禁用table底部的Pagination
    disablePagination: {
      type: Boolean,
      required: false,
      default: false,
    },

    ///========= 分页字段
    pageNumKey: {
      type: String,
      required: false,
      default: "pageNum",
    },
    pageSizeKey: {
      type: String,
      required: false,
      default: "pageSize",
    },
    pageStart: {
      type: Number,
      required: false,
      default: 1,
    },

    ///========= 接口请求
    listUrl: {
      type: String,
      required: false,
      default: "",
    },
    addUrl: {
      type: String,
      required: false,
      default: "",
    },
    editUrl: {
      type: String,
      required: false,
      default: "",
    },
    editDetailUrl: {
      type: String,
      required: false,
      default: "",
    },
    deleteUrl: {
      type: String,
      required: false,
      default: "",
    },
    // 增删改查接口封装过的
    listRequest: {
      type: Function,
      required: false,
      default: () => {},
    },
    addRequest: {
      type: Function,
      required: false,
    },
    editRequest: {
      type: Function,
      required: false,
    },
    editDetailRequest: {
      type: Function,
      required: false,
    },
    deleteRequest: {
      type: Function,
      required: false,
    },

    // ========= 方法
    // 扩展点击的时候 Function(expanded<Boolen>, rowItem<Object>)
    onExpand: {
      type: Function,
      required: false,
    },
    // pagination, filters or sorter 改变回调 Function(pagination<Object>, filters<Object>, sorter<Object>)
    onChange: {
      type: Function,
      required: false,
    },

    ///========= 回调
    // 处理新增修改数据 Function(<修改后的数据>)
    handelWillSearch: {
      type: Function,
      required: false,
    },
    // 处理即将调用请求接口 Function(<params参数>)
    handelWillGetList: {
      type: Function,
      required: false,
    },
    // 处理列表数据
    handelListData: {
      type: Function,
      required: false,
    },
    // 处理新增修改数据 Function()
    handelWillAdd: {
      type: Function,
      required: false,
    },
    // 处理即将点击修改按钮 Function(<修改前的数据>)
    handelWillEdit: {
      type: Function,
      required: false,
    },
    // 处理新增修改数据 Function(<修改后的数据>)
    handelModifyData: {
      type: Function,
      required: false,
    },
    // 处理新增返回结果 Function(<请求成功状态>, <请返回结果>)
    handelAddResult: {
      type: Function,
      required: false,
    },
    // 处理修改返回结果 Function(<请求成功状态>, <请返回结果>)
    handelEditResult: {
      type: Function,
      required: false,
    },
    // 处理即将删除操作 Function(params<Object>)
    handelWillDelete: {
      type: Function,
      required: false,
    },
    // 处理删除返回结果 Function(<请求成功状态>, <请返回结果>)
    handelDeleteResult: {
      type: Function,
      required: false,
    },
    tableWidth: {
      type: Number,
      default: 0,
    },
    tableHeight: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      /// 数据表
      loading: false,
      tableWidth2: this.tableWidth,
      tableHeight2: this.tableHeight,
      pagination: {
        defaultPageSize: 10,
        current: this.pageStart,
        pageSize: pageSize ? pageSize : 30,
        total: 0,
        showTotal: (total) => `共 ${total} 条记录`,
        showQuickJumper: true,
        showSizeChanger: true,
        showSizeChanger: true,
        hideOnSinglePage: true,
        showLessItems: true,
        showTotal: () => true,
        size: "normal",
        pageSizeOptions: ["30", "40", "60", "80", "100"],
      },
      dataSource: [],
      columns2: this.columns,
      searchList2: this.searchList,
      formList2: this.formList,

      /// 表单提交
      editData: {}, // 修改的内容
      visible: false, // 是否显示弹窗
      isAdd: false, // 是否是增加
    };
  },
  watch: {
    columns(val) {
      this.columns2 = val;
    },
    tableWidth(val) {
      this.tableWidth2 = val;
    },
    tableHeight(val) {
      this.tableHeight2 = val;
    },
    searchList(val) {
      this.searchList2 = val;
    },
    formList(val) {
      this.formList2 = val;
    },
  },
  mounted() {
    this.getList();

    this.tableWidth2 = 0;
    this.columns.map((it) => {
      this.tableWidth2 += it["width"] != null ? it["width"] : 100;
    });
    // console.log(">>> x", this.x);
  },
  methods: {
    // ============= 其他方法
    // 设置搜索数据
    setSearchValues(formValues) {
      this.$refs.search.getForm().setFieldsValue(formValues);
    },
    // 设置表单数据
    setFormValues(formValues) {
      this.$refs.form.getForm().setFieldsValue(formValues);
    },

    // ============= 增加，修改，删除方法
    // 增加删除修改操作
    async add() {
      // 新增即将开始
      this.handelWillAdd ? await this.handelWillAdd() : null;

      this.isAdd = true;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.form ? this.$refs.form.getForm().resetFields() : null;
      });
    },
    async edit(e) {
      if (this.editDetailRequest) {
        let detail = await this.editDetailRequest(e.id);
        this.editData = detail;
      } else if (this.editDetailUrl) {
        let detail = await this.$request(this.addUrl, "POST", { id: e.id });
        this.editData = detail;
      } else {
        this.editData = e;
        this.editData.tag_id = Number(this.editData.tag_id);
      }

      // 修改即将开始
      this.handelWillEdit ? await this.handelWillEdit(this.editData) : null;

      this.isAdd = false;
      this.visible = true;

      this.$nextTick(() => {
        this.$refs.form ? this.$refs.form.getForm().resetFields() : null;
        this.$refs.form ? this.$refs.form.getForm().setFieldsValue(this.editData) : null;
      });
    },
    async submit(e) {
      e.preventDefault();

      // 使用自己的customform
      if (this.$refs.form == null) {
        if (this.isAdd) {
          this.handelModifyData ? await this.handelModifyData({ isAdd: true }) : null;
        } else {
          this.handelModifyData ? await this.handelModifyData({ isAdd: false }) : null;
        }
        this.visible = false;
        return;
      }

      this.$refs.form.getForm().validateFields(async (err, values) => {
        if (!err) {
          /// 判断如果是修改就添加id字段
          if (!this.isAdd && values.id == "") {
            values.id = this.editData.id;
          }

          if (values["createAt"] != null && typeof values["createAt"] == "object") {
            values["createAt"] = values["createAt"].valueOf();
          }
          if (values["updateAt"] != null && typeof values["updateAt"] == "object") {
            values["updateAt"] = values["updateAt"].valueOf();
          }
          if (values["deleteAt"] != null && typeof values["deleteAt"] == "object") {
            values["deleteAt"] = values["deleteAt"].valueOf();
          }

          // 增加或修改即将开始
          this.handelModifyData ? await this.handelModifyData(values) : null;

          if (this.isAdd) {
            try {
              // 新增请求开始
              let data = "";
              this.addRequest
                ? (data = await this.addRequest(values))
                : (data = await this.$request(this.addUrl, "POST", values));

              // 新增结果返回
              this.handelAddResult
                ? await this.handelAddResult(true, data)
                : await this.getList();
            } catch (error) {
              // 新增失败返回
              this.handelAddResult ? await this.handelAddResult(false, error) : "";
            }
          } else {
            try {
              // 修改请求开始
              let data = "";
              this.editRequest
                ? (data = await this.editRequest(values))
                : (data = await this.$request(this.editUrl, "POST", values));

              // 修改请求返回
              this.handelEditResult
                ? await this.handelEditResult(true, data)
                : await this.getList();
            } catch (error) {
              console.log(">>>error editRequest", error);

              // 修改失败返回
              this.handelEditResult ? await this.handelEditResult(false, error) : "";
            }
          }

          this.visible = false;
        }
      });
    },
    deleteRecord(e) {
      let self = this;
      this.$confirm({
        title: "提示",
        content: "是否确认删除？",
        cancelText: "取消",
        async onOk() {
          try {
            // 请求即将开始
            let params = {};
            params = e;
            self.handelWillDelete ? await self.handelWillDelete(params) : null;

            // 请求删除数据
            let data = "";
            self.deleteRequest
              ? (data = await self.deleteRequest(params))
              : (data = await self.$request(self.deleteUrl, "POST", params));

            // 请求删除返回结果
            self.handelAddResult
              ? await self.handelDeleteResult(true, data)
              : await self.getList();
          } catch (error) {
            console.log(">>>error deleteRequest", error);
            self.handelDeleteResult ? await self.handelDeleteResult(false, error) : "";
          }
        },
      });
    },

    // ============= 搜索和列表方法
    // table操作
    async searchData(e) {
      this.search = e;

      // 即将开始搜索
      this.handelWillSearch ? await this.handelWillSearch(e) : null;

      this.pagination.page = "1";
      await this.getList();
    },
    async clearSearch() {
      this.search = {};
      // 即将开始搜索
      this.handelWillSearch ? await this.handelWillSearch({}) : null;

      this.pagination.page = "1";
      await this.getList();
    },
    async change(pagination, filters, sorter) {
      // console.log(pagination);
      // console.log(filters);
      // console.log(sorter);
      this.pagination.current = pagination.current;

      localStorage.setItem("pageSize", pagination.pageSize);

      if (this.onChange) {
        await this.onChange();
      } else {
        await this.getList();
      }
    },
    async getList() {
      this.loading = true;

      let params = {
        ...this.search,
      };
      params[this.pageNumKey] = this.pagination.current;
      params[this.pageSizeKey] = this.pagination.pageSize;

      if (params.time && params.time.length > 1) {
        params.beginTime = params.time[0].unix();
        params.endTime = params.time[1].unix();
        delete params.time;
      }

      // 即将开始请求列表接口
      this.handelWillGetList ? await this.handelWillGetList(params) : null;

      let data = "";
      if (this.listRequest) {
        data = await this.listRequest(params);
      } else {
        data = await this.$request(this.listUrl, "post", params);
      }

      // 请求返回处理数据
      if (data && data.data) {
        this.handelListData ? await this.handelListData(data.data) : null;
        this.dataSource = data.data;
      } else {
        this.handelListData ? await this.handelListData(data) : null;
        this.dataSource = data;
      }

      this.pagination = {
        ...this.pagination,
        total: data && data.total ? data.total : 0,
      };

      this.loading = false;
    },

    // 组件事件
    prefixClick(e) {
      this.$emit("prefixClick", e);
    },
    suffixClick(e) {
      this.$emit("suffixClick", e);
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  margin-bottom: 54px;
}

.fold {
  width: calc(100% - 216px);
  display: inline-block;
}

.operator {
  margin-bottom: 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
}

@media screen and (max-width: 900px) {
  .fold {
    width: 100%;
  }
}
</style>
