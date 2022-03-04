@@ -0,0 +1,343 @@
<template>
  <div class="search">
    <a-form layout="horizontal" :form="form" ref="forms">
      <a-row
        justify="start"
        align="middle"
        :key="index"
        v-for="(li, index) in searchList"
      >
        <a-col
          :span="1"
          :key="index * 10 + index2"
          :md="8"
          :sm="24"
          v-for="(item, index2) in li"
        >
          <CustomFormItem
            :prefixClick="prefixClick"
            :suffixClick="suffixClick"
            :item="item"
          ></CustomFormItem>
        </a-col>
      </a-row>
      <span v-if="searchList.length > 0" style="float: right; margin-top: 3px">
        <a-button @click="searchData" type="primary">查询</a-button>
        <a-button @click="clearSearch" style="margin-left: 8px">重置</a-button>
      </span>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "SimpleSearchView",
  props: {
    // 列表数据
    list: {
      type: Array,
      required: true,
      default: () => [],
    },
    // 内容前部区域点击如：input的prefix
    prefixClick: {
      type: Function,
      required: false,
      default: () => {},
    },
    // 内容后部区域点击如：input的suffix
    suffixClick: {
      type: Function,
      required: false,
      default: () => {},
    },
  },
  data() {
    return {
      list2: this.list,
      searchList: [],
      selectTagId: "",
      form: this.$form.createForm(this),
    };
  },
  mounted() {
    this.handelSearchList();
  },
  watch: {
    list(val) {
      this.list2 = val;
      this.handelSearchList();
    },
  },
  methods: {
    handelSearchList() {
      /// 分割成每个行，每行3个
      let rowCount = 3;
      let i = 0;
      let li = [];
      let list = [];
      this.list2.map((it) => {
        // if (it.type != "numberRange") {
        //   this.search[it.fieldName] = it.value;
        // } else {
        //   this.search[it.fieldName] = it.value;
        //   this.search[it.fieldName2] = it.value2;
        // }

        it.labelAlign = "left";
        if (it.decorator[1].rules && it.decorator[1].rules.length > 0) {
          it.decorator[1].rules[0].required = false;
        }

        if (i % rowCount != 0) {
          li.push(it);
        } else {
          if (i != 0) {
            list.push(li);
          }
          li = [];
          li.push(it);
        }
        i++;
      });

      // console.log(this.search);

      if (li.length > 0) {
        list.push(li);
      }
      this.searchList = list;

      // console.log(this.searchList);
    },
    // 搜索数据
    searchData() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit("searchData", values);
        }
      });
    },
    // 清除数据
    clearSearch() {
      this.form.resetFields();
      this.selectTagId = "";
      this.$emit("clearSearch", null);
    },
    // 设置form内容
    setFormValues(formValues) {
      return this.form.setFieldsValue(formValues);
    },
    buttonClick(item) {
      this.selectTagId = item.index;
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  margin-bottom: 54px;
}
</style>
