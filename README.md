# antdv-fast-table
针对antdv UI框架快速创建后台管理列表增删改查等功能的组件库

# [fast-table](./__doc__/fast-table组件说明.md)
快速创建curd功能，传入table列表，form表单内容，搜索条件，增删改查接口等，直接出来完整功能。

# [custom-form-list](./__doc__/custom-form-list组件说明.md)
快速创建form表单功能，通过数组获取组件内容。

# [simple-search-view](./__doc__/simple-search-view组件说明.md)
根据custom-form-list创建搜索列表，通常是3个为一行排列，带搜索和重置按钮，支持插槽。

# 1.0.6
- 页面功能
  - 新增 disableBackCardView 禁用table底层的Cardview；
  - 新增 disablePagination 禁用table底部的Pagination；
- 请求回调方法
  - 新增 handelWillGetList 处理调用list接口之前可以处理参数；
  - 新增 handelWillDelete 处理调用删除接口之前可以处理参数；
  - 回调方法支持 async await；
- 其他方法
  - 新增 onChange pagination, filters or sorter 改变回调；
  - 新增 onExpand 多级列表点击展开回调；
# 1.0.5 更新
1. 修复 disableEditAction disableAddAction disableDeleteAction 3个属性导致的按钮问题 