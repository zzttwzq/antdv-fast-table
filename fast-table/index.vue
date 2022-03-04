<template>
  <div>
    <a-card :title="title">
      <div>
        <SimpleSearchView
          :list="searchList2"
          @searchData="searchData"
          @clearSearch="clearSearch"
          v-if="searchList2.length"
        ></SimpleSearchView>
      </div>
      <div>
        <a-space class="operator">
          <a-button @click="add" type="primary">新建</a-button>
          <slot name="leftButtons"></slot>
        </a-space>
        <StandardTable
          rowKey="id"
          :columns="columns2"
          :dataSource="dataSource"
          :pagination="pagination"
          @change="change"
          :loading="loading"
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
    >
      <CustomFormList
        @prefixClick="prefixClick"
        @suffixClick="suffixClick"
        ref="form"
        :list="formList2"
        :showBtns="false"
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
      required: true,
      default: "",
    },
    ///========= 页面功能
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

    ///========= 回调
    // 处理列表数据
    handelListData: {
      type: Function,
      required: false,
    },
    // 处理即将新增数据
    handelWillAdd: {
      type: Function,
      required: false,
    },
    // 处理新增修改数据
    handelModifyData: {
      type: Function,
      required: false,
    },
    // 处理即将点击修改按钮
    handelWillEdit: {
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
    // 处理删除返回结果 Function(<请求成功状态>, <请返回结果>)
    handelDeleteResult: {
      type: Function,
      required: false,
    },
  },
  data() {
    return {
      /// 数据表
      loading: false,
      pagination: {
        current: 1,
        pageSize: pageSize ? pageSize : 30,
        total: 0,
        showTotal: (total) => `共 ${total} 条记录`,
        showQuickJumper: true,
        showSizeChanger: true,
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
    searchList(val) {
      this.searchList2 = val;
    },
    formList(val) {
      this.formList2 = val;
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 增加删除修改操作
    add() {
      if (this.handelWillAdd) {
        this.handelWillAdd();
      }
      this.isAdd = true;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.form.getForm().resetFields();
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

      if (this.handelWillEdit) {
        this.handelWillEdit(this.editData);
      }

      this.isAdd = false;
      this.visible = true;

      this.$nextTick(() => {
        this.$refs.form.getForm().resetFields();
        this.$refs.form.getForm().setFieldsValue(this.editData);
      });
    },
    submit(e) {
      e.preventDefault();

      this.$refs.form.getForm().validateFields(async (err, values) => {
        if (!err) {
          /// 增加id数据
          if (!this.isAdd) {
            values.id = this.editData.id;
          }
          /// 修改数据
          if (this.handelModifyData) {
            this.handelModifyData(values);
          }

          console.log(values);

          if (this.isAdd) {
            try {
              let data = "";
              if (this.addRequest) {
                data = await this.addRequest(values);
              } else {
                data = await this.$request(this.addUrl, "POST", values);
              }
              if (this.handelAddResult) {
                this.handelAddResult(true, data);
              } else {
                console.log(">>>>addRequest", data);
                this.getList();
              }
            } catch (error) {
              this.handelAddResult ? this.handelAddResult(false, error) : "";
            }
          } else {
            try {
              let data = "";
              if (this.addRequest) {
                data = await this.editRequest(values);
              } else {
                data = await this.$request(this.editUrl, "POST", values);
              }
              if (this.handelEditResult) {
                this.handelEditResult(true, data);
              } else {
                console.log(">>>>editRequest", data);
                this.getList();
              }
            } catch (error) {
              this.handelEditResult ? this.handelEditResult(false, error) : "";
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
        okText: "确认",
        cancelText: "取消",
        async onOk() {
          try {
            let data = "";
            if (self.addRequest) {
              data = await self.deleteRequest([e]);
            } else {
              data = await self.$request(self.deleteUrl, "post", {
                id: [e],
              });
            }

            if (self.handelDeleteResult) {
              self.handelDeleteResult(true, data);
            } else {
              console.log(">>>>delRequest", data);
              self.getList();
            }
          } catch (error) {
            if (self.handelDeleteResult) {
              self.handelDeleteResult(false, error);
            }
          }
        },
      });
    },

    // 设置数据
    setFormValues(formValues) {
      console.log(this.$refs.form);

      this.$refs.form.getForm().setFieldsValue(formValues);
    },

    // table操作
    searchData(e) {
      this.search = e;
      this.pagination.page = "1";
      this.getList();
    },
    clearSearch() {
      this.search = {};
      this.pagination.page = "1";
      this.getList();
    },
    change(pagination, filters, sorter) {
      console.log(pagination);
      console.log(filters);
      console.log(sorter);
      this.pagination.current = pagination.current;

      localStorage.setItem("pageSize", pagination.pageSize);

      this.getList();
    },
    async getList() {
      this.loading = true;

      let params = {
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize,
        ...this.search,
      };
      if (params.time && params.time.length > 1) {
        params.beginTime = params.time[0].unix();
        params.endTime = params.time[1].unix();
        delete params.time;
      }

      let data = "";
      if (this.addRequest) {
        data = await this.listRequest(params);
      } else {
        data = await this.$request(this.listUrl, "post", params);
      }

      if (this.handelListData) {
        this.handelListData(data.data);
      }

      this.dataSource = data.data;

      this.pagination = {
        ...this.pagination,
        total: data.total,
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
}

@media screen and (max-width: 900px) {
  .fold {
    width: 100%;
  }
}
</style>
