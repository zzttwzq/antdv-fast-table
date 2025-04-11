<template>
  <div>
    <a-card :title="title">
      <div>
        <SimpleSearchView v-if="tableSearchList2.length" ref="search" :list="tableSearchList2" @searchData="searchData"
          @clearSearch="clearSearch"></SimpleSearchView>
      </div>
      <div>
        <a-space class="operator">
          <a-space class="operator">
            <a-button v-if="showTableAdd" @click="addRecord" type="primary">新增</a-button>
            <slot name="topLeftButtons"></slot>
          </a-space>
          <slot name="topRightButtons"></slot>
        </a-space>
        <StandardTable :rowKey="tableRowKey" :loading="loading" :columns="tableHeaderList2" :dataSource="dataSource"
          :pagination="pagination" @change="change" :onExpand="onExpand" :scroll="{ x: tableWidth2, y: tableHeight2 }">
          <div slot="description" slot-scope="{ text }">
            {{ text }}
          </div>
          <div slot="action" slot-scope="{ record }">
            <a v-if="showTableEdit" @click="editRecord(record)" style="margin-right: 8px">
              编辑
            </a>
            <a v-if="showTableDelete" @click="deleteRecord(record.id)"> 删除 </a>
            <slot name="buttons" :record="record"></slot>
          </div>
        </StandardTable>
      </div>
    </a-card>
    <!-- 角色添加和修改 -->
    <a-modal v-model="visible" :width="tableFormWidth" :title="isAdd ? '新增' : '修改'" :ok-text="isAdd ? '新增' : '修改'"
      :loading="loading" cancel-text="取消" @ok="submit" @cancel="cancel">
      <CustomFormList v-if="!useCustomForm" ref="form" :prefixClick="prefixClick" :suffixClick="suffixClick"
        :list="tableFormList2" :showBtns="false"></CustomFormList>
      <slot name="tableCustomForm"></slot>
    </a-modal>
  </div>
</template>

<script>
import {
  TableLogLevel,
  TableRequestType,
} from "../enum";
import {
  tableProps,
  tableSearchProps,
  tablePageProps,
  tableFormProps,
  tableMethod,
  tableRequestMethod,
  callBacks,
} from "./tablePropsConfig";

export default {
  name: "FastTable",
  props: {
    ...tableProps,
    ...tableSearchProps,
    ...tablePageProps,
    ...tableFormProps,
    ...tableMethod,
    ...tableRequestMethod,
    ...tableSearchProps,
    ...callBacks,
  },
  data() {
    return {
      /// 数据表
      loading: false,
      tableWidth2: this.tableWidth,
      tableHeight2: this.tableHeight,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 1000,
        size: "normal",
        showTotal: (total) => `共 ${total} 条记录`,
        showQuickJumper: true,
        showSizeChanger: true,
        hideOnSinglePage: false,
        showLessItems: true,
        pageSizeOptions: ["10", "20", "30", "50", "100"],
        onShowSizeChange: () => { },
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
      this.loading = true;
      this.search = e;
      this.pagination.page = "1";

      // 准备请求查询接口
      this.onWillSearch && await this.onWillSearch(this.search, this.pagination);

      // 是否继续请求
      if (this.onSearch) {
        let onSearch = await this.onSearch(this.search);
        this.log("getList-onSearch", onSearch, TableLogLevel.debug);
        if (onSearch == false) {
          this.loading = false;
          return;
        }
      }

      // 请求接口
      await this.getList();

      // 请求完成
      this.log("submit->onDidSearch", "", TableLogLevel.info);
      this.$emit("onDidSearch");
    },
    // 重置查找结果
    async clearSearch() {
      this.loading = true;
      this.search = {};
      this.resetSearchForm();
      this.pagination.page = "1";

      // 准备查询数据
      this.onWillSearch && await this.onWillSearch(this.search, this.pagination);

      // 是否继续请求
      if (this.onSearch) {
        let onSearch = await this.onSearch(this.search);
        this.log("getList-onSearch", onSearch, TableLogLevel.debug);
        if (onSearch == false) {
          this.loading = false;
          return;
        }
      }

      // 请求接口
      await this.getList();

      // 请求完成
      this.log("submit->onDidSearch", "", TableLogLevel.info);
      this.$emit("onDidSearch");
    },
    // 列表接口
    async getList() {
      this.loading = true;

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
      this.log("getList-onWillGetList", "", TableLogLevel.info);
      this.onWillGetList && await this.onWillGetList(params);

      // 是否继续请求
      if (this.onGetList) {
        let onGetList = await this.onGetList(params);
        this.log("getList-onGetList", onGetList, TableLogLevel.debug);
        if (onGetList == false) {
          this.loading = false;
          return;
        }
      }

      try {
        let data = await this.listRequest(params);
        let list = data && data.data ? data.data : data;

        this.log("getList-onGetListSuccess1", data, TableLogLevel.debug);
        this.onRequestSuccess && await this.onRequestSuccess(TableRequestType.onList, data);

        this.dataSource = list;
        this.pagination = {
          ...this.pagination,
          total: data && data.total ? data.total : 0,
        };
      } catch (error) {
        this.log("getList-onGetListError", error, TableLogLevel.error);
        this.onRequestError && await this.onRequestError(TableRequestType.onList, error);
      }

      // 请求完成回调
      this.log("getList-onDidGetList", "", TableLogLevel.info);
      this.$emit("onDidGetList");

      this.loading = false;
    },
    // 添加表格数据
    async addRecord() {
      // 是否弹出新增页面
      let onWillPopAdd = true;
      if (this.onWillPopAdd) {
        onWillPopAdd = await this.onWillPopAdd();
        this.log("addRecord->onWillPopAdd", onWillPopAdd, TableLogLevel.debug);
      }

      // 先显示页面
      if (onWillPopAdd) {
        this.isAdd = true;
        this.visible = true;

        this.$nextTick(async () => {
          this.log("addRecord->nextTick", "resetTableForm", TableLogLevel.info);
          this.resetTableForm();
        });
      }
      else {
        this.isAdd = false;
        this.visible = false;
      }
    },
    // 编辑表格数据
    async editRecord(e) {
      // 是否弹出新增页面
      let onWillPopEdit = true;
      if (this.onWillPopEdit) {
        onWillPopEdit = await this.onWillPopEdit();
        this.log("editRecord->onWillPopEdit", onWillPopEdit, TableLogLevel.debug);
      }

      // 先显示页面
      if (onWillPopEdit) {
        this.isAdd = false;
        this.visible = true;

        let params = e.id;
        // 即将请求，增加修改；如果有自定义的增加修改方法
        this.onWillEditDetail && await this.onWillEditDetail(params);

        // 是否继续请求
        if (this.onEditDetail) {
          let onEditDetail = await this.onEditDetail(params);
          this.log("getList-onEditDetail", onEditDetail, TableLogLevel.debug);
          if (onEditDetail == false) {
            return;
          }
        }

        // 调用详情接口
        try {
          if (this.detailRequest) {
            let d = await this.detailRequest(params);
            this.editData = d.data;
          } else {
            this.editData = e;
            this.editData.tag_id = Number(this.editData.tag_id);
          }

          this.log("submit->onEditDetailSuccess", this.editData, TableLogLevel.debug);
          this.onRequestSuccess && await this.onRequestSuccess(TableRequestType.onEditDetail, this.editData);
        } catch (error) {
          this.log("submit->onEditDetailError", error, TableLogLevel.error);
          this.onRequestError && await this.onRequestError(TableRequestType.onEditDetail, error);
        }

        // 请求完成回调
        this.log("submit-onDidEditDetail", "", TableLogLevel.info);
        this.$emit("onDidEditDetail");

        this.$nextTick(async () => {
          this.log("editRecord->nextTick", "resetTableForm setTableForm", TableLogLevel.info);
          this.resetTableForm();
          this.setTableForm(this.editData);
        });
      }
      else {
        this.isAdd = false;
        this.visible = false;
      }
    },
    // 删除表格数据
    async deleteRecord(id) {
      let self = this;

      // 是否弹出新增页面
      let onWillPopDelete = true;
      if (this.onWillPopDelete) {
        onWillPopDelete = await this.onWillPopDelete();
        this.log("deleteRecord->onWillPopDelete", onWillPopDelete, TableLogLevel.debug);
        if (onWillPopDelete == false) {
          return;
        }
      }

      this.$confirm({
        title: "提示",
        content: "是否确认删除？",
        cancelText: "取消",
        async onOk() {
          // 请求参数
          let params = id;

          // 准备删除操作
          self.log("deleteRecord-onWillDelete", TableLogLevel.info);
          self.onWillDelete && self.onWillDelete(params);

          // 是否继续请求
          if (self.onDelete) {
            let onDelete = await self.onDelete(params);
            self.log("deleteRecord-onDelete", onDelete, TableLogLevel.debug);
            if (onDelete == false) {
              return;
            }
          }

          // 请求接口
          try {
            let res = await self.deleteRequest(params);

            self.log("deleteRecord-onDeleteSuccess", res, TableLogLevel.debug);
            self.onRequestSuccess && await self.onRequestSuccess(TableRequestType.onDelete, res, self.getList);
          } catch (error) {

            self.log("deleteRecord-onDeleteError", error, TableLogLevel.error);
            self.onRequestError && await self.onRequestError(TableRequestType.onDelete, error, self.getList);
          }

          // 请求完成回调
          self.log("deleteRecord-onDidDelete", "", TableLogLevel.info);
          self.$emit("onDidDelete");
        },
      });
    },
    // 弹窗取消
    async cancel(e) {
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

      // 如果有自定义的提交方法
      if (this.submitClick) {
        this.submitClick();
        return;
      }

      this.$refs.form.validateForm(async (err, values) => {
        if (!err) {
          // 判断如果是修改就添加id字段
          if (this.isAdd == false) {
            values.id = this.editData.id;
          }

          // 添加创建，修改，删除时间
          if (values["createAt"] != null && typeof values["createAt"] == "object") {
            values["createAt"] = values["createAt"].valueOf();
          }
          if (values["updateAt"] != null && typeof values["updateAt"] == "object") {
            values["updateAt"] = values["updateAt"].valueOf();
          }
          if (values["deleteAt"] != null && typeof values["deleteAt"] == "object") {
            values["deleteAt"] = values["deleteAt"].valueOf();
          }

          // 即将请求，增加修改；如果有自定义的增加修改方法
          if (this.isAdd) {
            this.onWillAdd && await this.onWillAdd(values);
          }
          else {
            this.onWillEdit && await this.onWillEdit(values);
          }

          if (this.isAdd) {
            // 是否继续请求
            if (this.onAdd) {
              let onAdd = await this.onAdd(values);
              this.log("getList-onAdd", onAdd, TableLogLevel.debug);
              if (onAdd == false) {
                this.loading = false;
                return;
              }
            }
          }
          else {
            // 是否继续请求
            if (this.onEdit) {
              let onEdit = await this.onEdit(values);
              this.log("getList-onEdit", onEdit, TableLogLevel.debug);
              if (onEdit == false) {
                this.loading = false;
                return;
              }
            }
          }

          // 增加修改请求
          try {
            let res = {};
            if (this.isAdd) {
              res = await this.addRequest(values);
            } else {
              res = await this.editRequest(values);
            }

            // 成功回调
            if (this.isAdd) {
              this.log("submit->onAddSuccess", res, TableLogLevel.debug);
              this.onRequestSuccess && this.onRequestSuccess(TableRequestType.onAdd, res, this.getList);
            }
            else {
              this.log("submit->onEditSuccess", res, TableLogLevel.debug);
              this.onRequestSuccess && this.onRequestSuccess(TableRequestType.onEdit, res, this.getList);
            }
          } catch (error) {
            //  失败回调
            if (this.isAdd) {
              this.log("submit->onAddError", error, TableLogLevel.error);
              this.onRequestError && this.onRequestError(TableRequestType.onAdd, error, this.getList);
            }
            else {
              this.log("submit->onEditError", error, TableLogLevel.error);
              this.onRequestError && this.onRequestError(TableRequestType.onEdit, error, this.getList);
            }
          }

          // 请求完成回调
          this.log("submit->onDidAdd", "", TableLogLevel.info);
          this.$emit("onDidAdd");

          this.visible = false;
        }
        else {
          this.log("submit->validateError", err, TableLogLevel.debug);
        }
      });
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

    // ============= 搜索和列表方法
    // pagenation事件
    async change(pagination, filters, sorter) {
      this.pagination.current = pagination.current;
      localStorage.setItem("pageSize", pagination.pageSize);

      this.log("change", pagination, TableLogLevel.debug);
      this.log("change", filters, TableLogLevel.debug);
      this.log("change", sorter, TableLogLevel.debug);
      if (this.onChange) {
        this.log("change->onChange", TableLogLevel.info);
        await this.onChange();
      } else {
        await this.getList();
      }
    },

    // ============= form表单事件
    // form表单组件左侧组件点击
    prefixClick(e) {
      this.$emit("onFormPrefixClick", e, TableLogLevel.debug);
    },
    // form表单组件右侧组件点击
    suffixClick(e) {
      this.$emit("onFormSuffixClick", e, TableLogLevel.debug);
    },

    // ============= 其他
    // 统一的控制台输出
    log(title, msg, level) {
      if ((this.logLevel == TableLogLevel.debug && (
        level == TableLogLevel.info
      ) || (this.logLevel == TableLogLevel.error && (
        level == TableLogLevel.info ||
        level == TableLogLevel.debug
      )))
      ) {
        return;
      }

      // if (process.env.NODE_ENV != "prod") {
      console.log(`[${level}][fast-table->${title}]`, msg);
      // }
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

.flex_row_left {
  display: flex;
  justify-content: left;
  align-items: center;
}

.flex_row_center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex_row_right {
  display: flex;
  justify-content: right;
  align-items: center;
}

@media screen and (max-width: 900px) {
  .fold {
    width: 100%;
  }
}
</style>