# antdv-fast-table
针对antdv UI框架快速创建后台管理列表增删改查等功能的组件库

# [fast-table](./__doc__/fast-table组件说明.md)
快速创建curd功能，传入table列表，form表单内容，搜索条件，增删改查接口等，直接出来完整功能。

# [custom-form-list](./__doc__/custom-form-list组件说明.md)
快速创建form表单功能，通过数组获取组件内容。

# [simple-search-view](./__doc__/simple-search-view组件说明.md)
根据custom-form-list创建搜索列表，通常是3个为一行排列，带搜索和重置按钮，支持插槽。

## 更新内容

# 1.2.7
1. fast-table 表头slot 名称改成 SLOT_TABLE_HEADER
2. fast-table slot topLeftButtons 名称改成 SLOT_TABLE_HEADER_LEFT_BUTTON
3. fast-table slot topRightButtons 名称改成 SLOT_TABLE_HEADER_RIGHT_BUTTON
4. fast-table slot tableCustomForm 名称改成 SLOT_TABLE_CUSTOM_FROM

# 1.2.6
1. fast-table 表头按钮横向排列

# 1.2.5
1. 修复custom form 表单

# 1.2.4
1. fast-table api 变更
2. 修复不显示pagination 功能
3. page默认从1开始

# 1.2.3
1. 修复 fast-table 搜索框宽度问题
  
# 1.2.2
1. 整理 fast-table 方法和错误

# 1.2.1
1. fast-table handle方法拼写错误
2. 修复 编辑 弹窗内容错误
3. 修复 编辑 没有带id错误
4. 字段调整
# 1.2.0
1. custom-form-item 显示字段改成title，name用来做表单
# 1.1.9
1. fast-table 添加slot `custEditModel` 可以自定义增加修改的model内容
# 1.1.8
1. fast-table 修复删除无法调用接口
# 1.1.7
1. fast-table 修复若干bug
# 1.1.6
1. fast-table 添加 tableWidth:表格内容宽度(默认按照columns数据自动计算)；tableHeight:表格内容高度 (默认0, 不设置高度，没有滚动条);rowKey表格的主要key
# 1.1.5
1. custom-form-item 取消 dateTime; 如果需要时间可以添加 showTime 属性即可
# 1.1.4
1. custom-form-item datetime 改成 dateTime; textarea 改成 textArea;
# 1.1.3
1. custom-form-item 添加 datetime类型组件 
# 1.1.2
1. fast-table 修复列表接口没有total 提示pagenation校验错误
2. fast-table 添加pageNumKey 用于更改分页page对应的key
3. fast-table 添加pageSizeKey 用于更改分页size对应的key
4. fast-table 添加pageStart 用于更改分页起始页数
# 1.1.1
1. 修复列表接口报错后页面无法正常操作
# 1.1.0
1. 修复simplesearch 默认值错误
# 1.0.9
1. 修改prefix无法点击bug
# 1.0.8
1. custom-form-item 添加span和offset支持
2. custom-form-list 支持自定义slot；添加组件change事件
3. simple-search-view 添加底部按钮algin 属性；添加底部按钮slot；添加查询重置按钮文本修改；添加收缩搜索条件框，可以指定显示行数；
4. 添加每行显示个数控制
# 1.0.7
1. 修复 handelListData 不会调用的bug
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