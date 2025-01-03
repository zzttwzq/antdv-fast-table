@@ -0,0 +1,343 @@
<template>
  <div class="search">
    <a-form layout="horizontal" :form="form" ref="forms">
      <a-row
        justify="start"
        align="middle"
        :key="index"
        v-for="(li, index) in !enableCollape
          ? searchList
          : collape
          ? searchCollapeList
          : searchList"
      >
        <a-col :span="1" :key="index * 10 + index2" :md="md" v-for="(item, index2) in li">
          <CustomFormItem
            :prefixClick="prefixClick"
            :suffixClick="suffixClick"
            :item="item"
          ></CustomFormItem>
        </a-col>
      </a-row>
      <div
        style="width: 100%"
        v-if="searchList.length > 0"
        :class="['button-back', alginMap[algin]]"
      >
        <a-button @click="searchData" class="announce-button" type="primary">{{
          searchButtonText
        }}</a-button>
        <div class="button-space"></div>
        <a-button @click="clearSearch" class="announce-button">
          {{ clearButtonText }}</a-button
        >
        <div class="button-space"></div>
        <slot name="bottomButtons"></slot>

        <div v-if="enableCollape" class="button-space"></div>
        <div @click="clickCollape" v-if="enableCollape" class="show-button-back">
          <span class="name">{{ collape ? "显示" : "收起" }}</span>
          <a-icon style="margin-left: 5px" :type="collape ? 'down' : 'up'" />
        </div>
      </div>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "SimpleSearchView",
  props: {
    //*** datasource */
    // 列表数据
    list: {
      type: Array,
      required: true,
      default: () => [],
    },
    rowCount: {
      type: Number,
      required: false,
      default: 3,
    },
    searchButtonText: {
      type: String,
      required: false,
      default: "查询",
    },
    clearButtonText: {
      type: String,
      required: false,
      default: "重置",
    },
    enableCollape: {
      type: Boolean,
      required: false,
      default: false,
    },
    showRows: {
      type: Number,
      required: false,
      default: 1,
    },

    //** styles */
    algin: {
      type: String,
      required: false,
      default: "right",
    },

    //** functions */
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
      searchCollapeList: [],
      selectTagId: "",
      form: this.$form.createForm(this),
      collape: true,
      alginMap: {
        left: "flex-row-left",
        center: "flex-row-center",
        space: "flex-row-space",
        right: "flex-row-right",
      },
    };
  },
  computed: {
    md() {
      return Math.ceil(24 / this.rowCount);
    },
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
      let i = 0;
      let li = [];
      let list = [];
      let list2 = [];
      let row = 0;

      this.list2.map((it) => {
        // if (it.type != "numberRange") {
        //   this.search[it.fieldName] = it.value;
        // } else {
        //   this.search[it.fieldName] = it.value;
        //   this.search[it.fieldName2] = it.value2;
        // }

        if (
          it.decorator.length > 1 &&
          it.decorator[1].rules &&
          it.decorator[1].rules.length > 0
        ) {
          it.decorator[1].rules[0].required = false;
        }

        if (i % this.rowCount != 0) {
          li.push(it);
        } else {
          row++;

          if (i != 0) {
            list.push(li);
          }

          if (this.enableCollape) {
            if (this.showRows >= row) {
              if (i != 0) {
                list2.push(li);
              }
            }
          }

          li = [];
          li.push(it);
        }

        i++;
      });

      if (li.length > 0) {
        list.push(li);
      }
      this.searchList = list;
      this.searchCollapeList = list2;

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
    // 获取form表单
    getForm() {
      return this.form;
    },
    // 设置form内容
    setFormValues(formValues) {
      return this.form.setFieldsValue(formValues);
    },
    buttonClick(item) {
      this.selectTagId = item.index;
    },
    clickCollape() {
      this.collape = !this.collape;
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  margin-bottom: 54px;
  .button-back {
    display: flex;
  }
}
.show-button-back {
  // background: red;
  cursor: pointer;
}
.button-space {
  width: 16px;
  height: 10px;
}
.flex-row-left {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.flex-row-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.flex-row-space {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.flex-row-right {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
</style>
