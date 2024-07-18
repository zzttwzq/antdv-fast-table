<template>
  <div>
    <a-card :title="title">
      <div>
        <SimpleSearchView
          v-if="tableSearchList2.length"
          ref="search"
          :list="tableSearchList2"
          @searchData="searchData"
          @clearSearch="clearSearch"
        ></SimpleSearchView>
      </div>
      <div>
        <a-space class="operator">
          <div>
            <a-button v-if="tableAdd" @click="addRecord" type="primary">新建</a-button>
            <slot name="topLeftButtons"></slot>
          </div>
          <slot name="topRightButtons"></slot>
        </a-space>
        <StandardTable
          :rowKey="tableRowKey"
          :loading="loading"
          :columns="tableHeaderList2"
          :dataSource="dataSource"
          :pagination="showPagination ? pagination : null"
          @change="change"
          :onExpand="onExpand"
          :scroll="{ x: tableWidth2, y: tableHeight2 }"
        >
          <div slot="description" slot-scope="{ text }">
            {{ text }}
          </div>
          <div slot="action" slot-scope="{ record }">
            <a v-if="tableEdit" @click="editRecord(record)" style="margin-right: 8px">
              编辑
            </a>
            <a v-if="tableDelete" @click="deleteRecord(record.id)"> 删除 </a>
            <slot name="buttons" :record="record"></slot>
          </div>
        </StandardTable>
      </div>
    </a-card>
    <!-- 角色添加和修改 -->
    <a-modal
      v-model="visible"
      :width="tableFormWidth"
      :title="isAdd ? '新增' : '修改'"
      :ok-text="isAdd ? '新增' : '修改'"
      :loading="loading"
      cancel-text="取消"
      @ok="submit"
      @cancel="cancel"
    >
      <CustomFormList
        v-if="!useCustomForm"
        ref="form"
        :prefixClick="prefixClick"
        :suffixClick="suffixClick"
        :list="tableFormList2"
        :showBtns="false"
      ></CustomFormList>
      <slot name="tableCustomForm"></slot>
    </a-modal>
  </div>
</template>

<script>
const onWillSearch = "onWillSearch";
const onWillSearchReqeust = "onWillSearchReqeust";
const onDidSearch = "onDidSearch";

const onWillGetList = "onWillGetList";
const onWillGetListRequest = "onWillGetListRequest";
const onGetListSuccess = "onGetListSuccess";
const onGetListError = "onGetListError";

const onWillAdd = "onWillAdd";
const onAddSuccess = "onAddSuccess";
const onAddError = "onAddError";

const onWillEdit = "onWillEdit";
const onEditSuccess = "onEditSuccess";
const onEditError = "onEditError";

const onWillSaveReqeust = "onWillSaveReqeust";

const onWillDelete = "onWillDelete";
const onWillDeleteReqeust = "onWillDeleteReqeust";
const onDeleteSuccess = "onDeleteSuccess";
const onDeleteError = "onDeleteError";

const onFormPrefixClick = "onFormPrefixClick";
const onFormSuffixClick = "onFormSuffixClick";

export default {
  name: "FastTable",
  props: {
    //========= 表格头部搜索等区域
    // 表格标题
    title: {
      type: String,
      required: false,
      default: "",
    },
    // 表格头部搜索内容
    tableSearchList: {
      type: Array,
      required: true,
      default: () => [],
    },

    //========= 表格
    // 表头属性数组
    tableHeaderList: {
      type: Array,
      required: true,
      default: () => [],
    },
    // 显示table底部的Pagination
    showPagination: {
      type: Boolean,
      required: false,
      default: true,
    },
    // 表格宽
    tableWidth: {
      type: Number,
      default: 0,
    },
    // 表格高
    tableHeight: {
      type: Number,
      default: 0,
    },
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

    ///========= 表格数据
    // 表格增加按钮
    tableAdd: {
      type: Boolean,
      required: false,
      default: true,
    },
    // 表格修改按钮
    tableEdit: {
      type: Boolean,
      required: false,
      default: true,
    },
    // 表格删除操作
    tableDelete: {
      type: Boolean,
      required: false,
      default: true,
    },
    /// 请求pageNum参数字段名称
    pageNumKey: {
      type: String,
      required: false,
      default: "pageNum",
    },
    /// 请求pageSize参数字段名称
    pageSizeKey: {
      type: String,
      required: false,
      default: "pageSize",
    },
    /// 请求pageNum 起始数据
    pageStart: {
      type: Number,
      required: false,
      default: 1,
    },

    ///========= table增改弹窗
    // 表格增加修改弹窗内容列表
    tableFormList: {
      type: Array,
      required: true,
      default: () => [],
    },
    // 弹窗宽度
    tableFormWidth: {
      type: Number,
      required: false,
      default: 500,
    },
    // 弹窗提交按钮点击
    tableFormSubmitClick: {
      type: Function,
      required: false,
      default: undefined,
    },
    // 弹窗取消按钮点击
    tableFormCancelClick: {
      type: Function,
      required: false,
      default: undefined,
    },
    // 使用自定义的表格增加修改弹窗
    useCustomForm: {
      type: Boolean,
      required: false,
      default: false,
    },

    ///========= 接口请求
    // 列表请求方法
    listRequest: {
      type: Function,
      required: true,
    },
    // 添加请求方法
    addRequest: {
      type: Function,
      required: true,
    },
    // 修改请求方法
    editRequest: {
      type: Function,
      required: true,
    },
    // 详情请求方法
    detailRequest: {
      type: Function,
      required: true,
    },
    // 删除请求方法
    deleteRequest: {
      type: Function,
      required: true,
    },
    // 处理列表请求参数
    handleListRequestParams: {
      type: Function,
      required: false,
      default: null,
    },
    // 处理添加/编辑请求参数
    handleSaveRequestParams: {
      type: Function,
      required: false,
      default: null,
    },
    // 处理详情请求参数
    handleDetailRequestParams: {
      type: Function,
      required: false,
      default: null,
    },
    // 处理删除请求参数
    handleDeleteRequestParams: {
      type: Function,
      required: false,
      default: null,
    },
    // 处理列表数据
    handleListData: {
      type: Function,
      required: false,
      default: null,
    },
    // 新增或修改或删除数据以后
    afterModifyListData: {
      type: Function,
      required: false,
      default: null,
    },

    // 显示日志提示
    showLog: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      /// 数据表
      loading: false,
      tableWidth2: this.tableWidth,
      tableHeight2: this.tableHeight,
      pagination: {
        defaultPageSize: 30,
        current: this.pageStart,
        pageSize: 30,
        total: 0,
        showTotal: (total) => `共 ${total} 条记录`,
        showQuickJumper: true,
        showSizeChanger: true,
        hideOnSinglePage: true,
        showLessItems: true,
        size: "normal",
        pageSizeOptions: ["30", "40", "60", "80", "100"],
      },
      dataSource: [],
      tableHeaderList2: this.tableHeaderList,
      tableSearchList2: this.tableSearchList,
      tableFormList2: this.tableFormList,

      /// 表单提交
      editData: {}, // 修改的内容
      visible: false, // 是否显示弹窗
      isAdd: false, // 是否是增加
    };
  },
  watch: {
    tableHeaderList(val) {
      this.tableHeaderList2 = val;
    },
    tableSearchList(val) {
      this.tableSearchList2 = val;
    },
    tableFormList(val) {
      this.tableFormList2 = val;
    },
    tableWidth(val) {
      this.tableWidth2 = val;
    },
    tableHeight(val) {
      this.tableHeight2 = val;
    },
  },
  mounted() {
    // 本地获取默认数量
    let pageSize = localStorage.getItem("pageSize");
    this.pageSize = Number(pageSize);
    this.tableWidth2 = 0;
    this.tableHeaderList.map((it) => {
      this.tableWidth2 += it["width"] != null ? it["width"] : 100;
    });

    this.getList();
  },
  methods: {
    // ============= 表格头部表
    // 设置搜索表单数据
    setSearchForm(formValues) {
      this.$refs.search ? this.$refs.search.setFormValues(formValues) : null;
    },
    // 重置搜索表单数据
    resetSearchForm() {
      this.$refs.search ? this.$refs.search.getForm().resetFields() : null;
    },
    // 查找数据
    async searchData(e) {
      this.search = e;
      this.pagination.page = "1";

      // 准备查询数据
      this.$emit(onWillSearch, this.search);

      // 准备请求查询接口
      this.$emit(onWillSearchReqeust, this.search, this.pagination);

      // 请求接口
      await this.getList();

      // 请求完成
      this.$emit(onDidSearch);
    },
    // 重置查找结果
    async clearSearch() {
      this.search = {};
      this.resetSearchForm();
      this.pagination.page = "1";

      // 准备查询数据
      this.$emit(onWillSearch, this.search);

      // 准备请求查询接口
      this.$emit(onWillSearchReqeust, this.search, this.pagination);

      // 请求接口
      await this.getList();

      // 请求完成
      this.$emit(onDidSearch);
    },

    // ============= 表格数据操作
    // 表行标记
    tableRowKey(row) {
      return row.id;
    },
    // 设置表格弹窗表单数据
    setTableForm(formValues) {
      this.$refs.form.setFormValues(formValues);
    },
    // 重置表格弹窗表单数据
    resetTableForm() {
      this.$refs.form ? this.$refs.form.getForm().resetFields() : null;
    },
    // 添加表格数据
    async addRecord() {
      // 先显示页面
      this.isAdd = true;
      this.visible = true;

      // 准备新增操作
      this.$emit(onWillAdd);
      this.log("addRecord", "");

      this.$nextTick(async () => {
        this.resetTableForm();
        this.log("addRecord->nextTick", "resetTableForm");
      });
    },
    // 编辑表格数据
    async editRecord(e) {
      // 显示弹窗
      this.isAdd = false;
      this.visible = true;

      // 调用详情接口
      try {
        if (this.detailRequest) {
          let params = e.id;
          if (this.handleDetailRequestParams) {
            params = await this.handleDetailRequestParams(params);
            this.log("editRecord->handleDetailRequestParams", params);
          }
          this.editData = await this.detailRequest(params);
        } else {
          this.editData = e;
          this.editData.tag_id = Number(this.editData.tag_id);
        }

        this.log("editRecord->detailRequestSuccess", this.editData);
      } catch (error) {
        this.log("editRecord->detailRequestError", error);
      }

      // 准备修改操作
      this.$emit(onWillEdit, this.editData);
      this.log("editRecord->onWillEdit", this.editData);

      // 刷新form
      this.$nextTick(() => {
        this.resetTableForm();
        this.setTableForm(this.editData);
        this.log("editRecord->nextTick", "resetTableForm setTableForm");
      });
    },
    // 删除表格数据
    async deleteRecord(id) {
      let self = this;

      // 准备删除操作
      this.$emit(onWillDelete, id);
      this.log("deleteRecord->onWillDelete", id);

      this.$confirm({
        title: "提示",
        content: "是否确认删除？",
        cancelText: "取消",
        async onOk() {
          // 请求参数
          let params = id;

          self.$emit(onWillDeleteReqeust, params);
          self.log("deleteRecord-onWillDeleteReqeust", params);

          // 准备处理参数，方法可为空
          if (self.handleDeleteRequestParams) {
            params = await self.handleDeleteRequestParams(params);
            self.log("deleteRecord-handleDeleteRequestParams", params);
          }

          // 请求接口
          try {
            let res = await self.deleteRequest(params);
            self.$emit(onDeleteSuccess, res);

            // 成功回调
            self.log("deleteRecord-onDeleteSuccess", res);

            // 成功后续刷新
            if (self.afterModifyListData) {
              await self.afterModifyListData(res);
            } else {
              self.getList();
            }
          } catch (error) {
            self.$emit(onDeleteError, error);

            // 失败回调
            self.log("deleteRecord->onDeleteError", error);
          }
        },
      });
    },
    // 弹窗取消
    cancel(e) {
      e.preventDefault();
      if (this.cancelClick) {
        this.cancelClick();
        return;
      }

      this.visible = false;
      this.isAdd = false;
    },
    // 弹窗确认
    async submit(e) {
      e.preventDefault();
      if (this.submitClick) {
        this.submitClick();
        return;
      }

      this.$refs.form.validateForm(async (err, values) => {
        if (!err) {
          /// 判断如果是修改就添加id字段
          if (this.isAdd == false) {
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

          // 增加修改即将开始
          this.$emit(onWillSaveReqeust, values);
          this.log("submit->onWillSaveReqeust", values);

          // 准备处理参数，方法可为空
          if (this.handleSaveRequestParams) {
            values = await this.handleSaveRequestParams(values);
            this.log("submit-handleSaveRequestParams", values);
          }

          // 增加修改请求
          try {
            let res = {};
            if (this.isAdd) {
              res = await this.addRequest(values);
              this.$emit(onAddSuccess, res);
              this.log("submit->onAddSuccess", res);
            } else {
              res = await this.editRequest(values);
              this.$emit(onEditSuccess, res);
              this.log("submit->onEditSuccess", res);
            }

            // 成功后续刷新
            if (this.afterModifyListData) {
              await this.afterModifyListData(res);
            } else {
              this.getList();
            }
          } catch (error) {
            if (this.isAdd) {
              this.$emit(onAddError, error);
              this.log("submit->onAddError", error);
            } else {
              this.$emit(onEditError, error);
              this.log("submit->onEditError", error);
            }
          }

          this.visible = false;
        }
      });
    },
    // 列表接口
    async getList() {
      this.loading = true;

      // 即将开始获取列表
      this.$emit(onWillGetList);
      this.log("getList-onWillGetList");

      // 如果有search的内容，则添加search内容
      let params = {
        ...this.search,
      };
      // 添加分页信息
      params[this.pageNumKey] = this.pagination.current;
      params[this.pageSizeKey] = this.pagination.pageSize;
      // 这个是开始和结束时间字段解析，解析成 beginTime，endTime 两个参数
      if (params.time && params.time.length > 1) {
        params.beginTime = params.time[0].unix();
        params.endTime = params.time[1].unix();
        delete params.time;
      }

      // 即将开始请求列表接口
      await this.$emit(onWillGetListRequest, params);
      this.log("getList-onWillGetListRequest", params);

      // 准备处理参数，方法可为空
      if (this.handleListRequestParams) {
        params = await this.handleListRequestParams(params);
        this.log("getList-handleListRequestParams", params);
      }

      try {
        let data = await this.listRequest(params);
        let list = data && data.data ? data.data : data;
        // 给列表数据，给page添加total等字段
        if (this.handleListData) {
          list = await this.handleListData(list);
          this.log("getList-handleListData", list);
        }

        this.dataSource = list;

        this.pagination = {
          ...this.pagination,
          total: data && data.total ? data.total : 0,
        };

        this.$emit(onGetListSuccess, data);
        this.log("getList-onGetListSuccess", data);
      } catch (error) {
        this.$emit(onGetListError, error);
        this.log("getList-onGetListError", error);
      }

      this.loading = false;
    },

    // ============= 搜索和列表方法
    // pagenation事件
    async change(pagination, filters, sorter) {
      this.pagination.current = pagination.current;
      localStorage.setItem("pageSize", pagination.pageSize);

      this.log("change", pagination, filters, sorter);

      if (this.onChange) {
        await this.onChange();
        this.log("change->onChange");
      } else {
        await this.getList();
      }
    },

    // ============= form表单事件
    // form表单组件左侧组件点击
    prefixClick(e) {
      this.$emit(onFormPrefixClick, e);
    },
    // form表单组件右侧组件点击
    suffixClick(e) {
      this.$emit(onFormSuffixClick, e);
    },

    // ============= 其他
    // 统一的控制台输出
    log(title, msg) {
      if (this.showLog && process.env.NODE_ENV != "prod") {
        console.log(`[fast-table->${title}]`, msg ?? "");
      }
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
