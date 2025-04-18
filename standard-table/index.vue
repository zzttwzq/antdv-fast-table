<template>
  <div class="standard-table">
    <a-table :bordered="bordered" :loading="loading" :columns="columns" :dataSource="dataSource"
      :pagination="pagination" :expandedRowKeys="expandedRowKeys" :expandedRowRender="expandedRowRender"
      :scroll="scroll" @change="onChange" @expand="(expanded, item) => {
        onExpand ? onExpand(expanded, item) : null;
      }
        " :rowSelection="selectedRows
          ? {
            selectedRowKeys: selectedRowKeys,
            onChange: updateSelect,
          }
          : undefined
          ">
      <template slot-scope="text, record, index" :slot="slot" v-for="slot in Object.keys($scopedSlots).filter(
        (key) => key !== 'expandedRowRender'
      )">
        <slot :name="slot" v-bind="{ text, record, index }"></slot>
      </template>
      <template :slot="slot" v-for="slot in Object.keys($slots)">
        <slot :name="slot"></slot>
      </template>
      <template slot-scope="record, index, indent, expanded"
        :slot="$scopedSlots.expandedRowRender ? 'expandedRowRender' : ''">
        <slot v-bind="{ record, index, indent, expanded }"
          :name="$scopedSlots.expandedRowRender ? 'expandedRowRender' : ''"></slot>
      </template>
    </a-table>
  </div>
</template>

<script>
export default {
  name: "StandardTable",
  props: {
    bordered: Boolean,
    loading: [Boolean, Object],
    columns: Array,
    dataSource: Array,
    rowKey: {
      type: [String, Function],
      default: "key",
    },
    pagination: Object,
    selectedRows: Array,
    expandedRowKeys: Array,
    expandedRowRender: Function,
    onExpand: Function,
    scroll: {
      x: Number,
      y: Number,
    },
  },
  data() {
    return {
      needTotalList: [],
    };
  },
  methods: {
    updateSelect(selectedRowKeys, selectedRows) {
      this.$emit("update:selectedRows", selectedRows);
      this.$emit("selectedRowChange", selectedRowKeys, selectedRows);
    },
    initTotalList(columns) {
      const totalList = columns
        .filter((item) => item.needTotal)
        .map((item) => {
          return {
            ...item,
            total: 0,
          };
        });
      return totalList;
    },
    onClear() {
      this.updateSelect([], []);
      this.$emit("clear");
    },
    onChange(pagination, filters, sorter, { currentDataSource }) {
      this.$emit("change", pagination, filters, sorter, { currentDataSource });
    },
  },
  created() {
    // console.log(">>>rowKey ", this.rowKey);
    this.needTotalList = this.initTotalList(this.columns);
  },
  watch: {
    selectedRows(selectedRows) {
      this.needTotalList = this.needTotalList.map((item) => {
        return {
          ...item,
          total: selectedRows.reduce((sum, val) => {
            let v;
            try {
              v = val[item.dataIndex]
                ? val[item.dataIndex]
                : eval(`val.${item.dataIndex}`);
            } catch (_) {
              v = val[item.dataIndex];
            }
            v = !isNaN(parseFloat(v)) ? parseFloat(v) : 0;
            return sum + v;
          }, 0),
        };
      });
    },
  },
  computed: {
    selectedRowKeys() {
      return this.selectedRows.map((record) => {
        return typeof this.rowKey === "function"
          ? this.rowKey(record)
          : record[this.rowKey];
      });
    },
  },
};
</script>

<style scoped lang="less">
.standard-table {
  .alert {
    margin-bottom: 16px;

    .message {
      a {
        font-weight: 600;
      }
    }

    .clear {
      float: right;
    }
  }
}

// /deep/ .ant-table-tbody > tr > td {
//   padding: 0px!important;
// }</style>
