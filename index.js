import StandardTable from "./standard-table/";
import CustomFormItem from "./custom-form-item/";
import CustomFormList from "./custom-form-list/";
import FastTable from "./fast-table/";
import SimpleSearchView from "./simple-search-view/";

export default {
    install: function(Vue) {
        Vue.component('StandardTable', StandardTable);
        Vue.component('CustomFormItem', CustomFormItem);
        Vue.component('CustomFormList', CustomFormList);
        Vue.component('FastTable', FastTable);
        Vue.component('SimpleSearchView', SimpleSearchView);
    }
}