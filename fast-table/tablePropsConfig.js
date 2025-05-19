// Date: 2024-12-23
// Creator: WZQ
// Description: 表格属性配置
// Update: 2024-12-23

/**
 * @description: 表格属性配置
 * @param title: 表格标题   默认空
 * @param showPagination: 是否显示分页  默认显示
 * @param tableWidth: 表格宽度  默认0
 * @param tableHeight: 表格高度  默认0
 * @param showTableAdd: 是否显示增加按钮  默认显示
 * @param showTableEdit: 是否显示修改按钮  默认显示
 * @param showTableDelete: 是否显示删除按钮  默认显示
 * @param tableHeaderList: 表头属性数组  必传
 */
export const tableProps = {
    // 表格标题
    title: {
        type: String,
        required: false,
        default: "",
    },
    // 日志级别
    logLevel: {
        type: String,
        default: "info",
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
    // 显示增加按钮
    showTableAdd: {
        type: Boolean,
        required: false,
        default: true,
    },
    // 显示修改按钮
    showTableEdit: {
        type: Boolean,
        required: false,
        default: true,
    },
    // 显示删除操作
    showTableDelete: {
        type: Boolean,
        required: false,
        default: true,
    },
    // 表头属性数组
    tableHeaderList: {
        type: Array,
        required: true,
        default: () => [],
    },
}

/** 
 * @description: 表格搜索属性配置
 * @param tableSearchList: 表格头部搜索内容  必传
*/
export const tableSearchProps = {
    // 表格头部搜索内容
    tableSearchList: {
        type: Array,
        required: true,
        default: () => [],
    },
}

/**
 * @description: 表格分页属性配置
 * @param pageNumKey: 请求pageNum参数字段名称  默认pageNum
 * @param pageSizeKey: 请求pageSize参数字段名称  默认pageSize
 * @param pageStart: 请求pageNum 起始数据  默认1
 * @param total: 请求pageNum 总数据  默认0
 * @param pageSizes: 每页显示个数  默认[10, 20, 30, 40]
 * @param layout: 分页布局  默认total, sizes, prev, pager, next, jumper
 * @param currentPage: 当前页数  默认1
 * @param pageSize: 每页显示个数  默认10
 * @param total: 总数据  默认0
 * @param pageChange: 页码改变的回调  默认空
 * @param sizeChange: 每页显示个数改变的回调  默认空
*/
export const tablePageProps = {
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
    /// 总数据
    total: {
        type: Number,
        required: false,
        default: 0,
    },
}

/**
 * @description: 表格增加修改弹窗属性配置
 * @param tableFormList: 表格增加修改弹窗内容列表  必传
 * @param tableFormWidth: 弹窗宽度  默认500
 * @param tableFormSubmitClick: 弹窗提交按钮点击  默认空
 * @param tableFormCancelClick: 弹窗取消按钮点击  默认空
 * @param useCustomForm: 使用自定义的表格增加修改弹窗  默认false
*/
export const tableFormProps = {
    // 使用自定义的表格增加修改弹窗
    useCustomForm: {
        type: Boolean,
        required: false,
        default: false,
    },
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
        default: null,
    },
    // 弹窗取消按钮点击
    tableFormCancelClick: {
        type: Function,
        required: false,
        default: null,
    },
    // 弹窗前缀按钮点击
    onFormPrefixClick: {
        type: Function,
        required: false,
        default: null,
    },
    // 弹窗后缀按钮点击
    onFormSuffixClick: {
        type: Function,
        required: false,
        default: null,
    },
}

export const tableMethod = {
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
}

/**
 * @description: 请求方法配置
 * @param listRequest: 列表请求方法  必传
 * @param addRequest: 添加请求方法  必传
 * @param editRequest: 修改请求方法  必传
 * @param detailRequest: 详情请求方法  必传
 * @param deleteRequest: 删除请求方法  必传
 */
export const tableRequestMethod = {
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
}

/**
 * @description: 回调函数配置
 * @param onRequestSuccess: 请求成功回调  默认空
 * @param onRequestError: 请求失败回调  默认空
 * @param onWillSearch: 表格即将搜索回调  默认空
 * @param onSearch: 表格搜索回调  默认空  返回false 将不会调用搜索
 * @param onDidSearch: 表格搜索结束回调  默认空
 * @param onWillGetList: 表格即将获取列表回调  默认空
 * @param onGetList: 表格获取列表回调  默认空 返回false 将不会调用获取列表接口
 * @param onDidGetList: 表格获取列表结束回调  默认空
 * @param onWillPopAdd: 表格即将弹出新增弹窗回调  默认空 返回false 将不会调用删除接口
 * @param onWillAdd: 表格即将新增回调  默认空
 * @param onAdd: 表格新增回调  默认空 返回false 将不会调用新增接口
 * @param onDidAdd: 表格新增结束回调  默认空
 * @param onWillPopEdit: 表格即将弹出编辑弹窗回调  默认空 返回false 将不会调用删除接口
 * @param onWillEditDetail: 表格即将调用详情接口回调  默认空
 * @param onEditDetail: 表格调用详情接口回调  默认空 返回false 将不会调用详情接口
 * @param onDetailDataShow: 表格展示数据回调  返回要展示的数据
 * @param onDidEditDetail: 表格调用完成详情接口回调  默认空
 * @param onWillEdit: 表格即将编辑回调  默认空
 * @param onEdit: 表格编辑回调  默认空 返回false 将不会调用编辑接口
 * @param onDidEdit: 表格编辑结束回调  默认空
 * @param onWillPopDelete: 表格即将弹出删除弹窗回调  默认空 返回false 将不会调用删除接口
 * @param onWillDelete: 表格即将删除回调  默认空
 * @param onDelete: 表格删除回调  默认空 返回false 将不会调用删除接口
 * @param onDidDelete: 表格删除结束回调  默认空
 */
export const callBacks = {
    // 请求成功回调
    onRequestSuccess: {
        type: Function,
        required: false,
        default: null,
    },
    // 请求失败回调
    onRequestError: {
        type: Function,
        required: false,
        default: null,
    },
    // 表格即将搜索回调
    onWillSearch: {
        type: Function,
        required: false,
        default: null,
    },
    // 表格搜索回调 default: null,
    onSearch: {
        type: Function,
        required: false,
        default: null,
    },
    // 表格搜索结束回调
    onDidSearch: {
        type: Function,
        required: false,
        default: null,
    },
    // 表格即将获取列表回调
    onWillGetList: {
        type: Function,
        required: false,
        default: null,
    },
    // 表格即将搜索回调
    onGetList: {
        type: Function,
        required: false,
        default: null,
    },
    // 表格即将搜索回调
    onDidGetList: {
        type: Function,
        required: false,
        default: null,
    },
    // 表格即将弹出新增弹窗回调
    onWillPopAdd: {
        type: Function,
        required: false,
        default: null,
    },
    // 表格即将新增回调
    onWillAdd: {
        type: Function,
        required: false,
        default: null,
    },
    // 表格新增回调
    onAdd: {
        type: Function,
        required: false,
        default: null,
    },
    // 表格完成新增回调
    onDidAdd: {
        type: Function,
        required: false,
        default: null,
    },
    // 表格即将调用详情接口回调
    onWillEditDetail: {
        type: Function,
        required: false,
        default: null,
    },
    // 表格调用详情接口回调 返回是否调用
    onEditDetail: {
        type: Function,
        required: false,
        default: null,
    },
    // 表格展示数据回调
    onDetailDataShow: {
        type: Function,
        required: false,
        default: null,
    },
    // 表格调用完成详情接口回调
    onDidEditDetail: {
        type: Function,
        required: false,
        default: null,
    },
    // 表格即将弹出编辑弹窗回调
    onWillPopEdit: {
        type: Function,
        required: false,
        default: null,
    },
    // 表格即将编辑回调
    onWillEdit: {
        type: Function,
        required: false,
        default: null,
    },
    // 表格编辑回调
    onEdit: {
        type: Function,
        required: false,
        default: null,
    },
    // 表格完成编辑回调
    onDidEdit: {
        type: Function,
        required: false,
        default: null,
    },
    // 表格即将弹出删除弹窗回调
    onWillPopDelete: {
        type: Function,
        required: false,
        default: null,
    },
    // 表格即将删除回调
    onWillDelete: {
        type: Function,
        required: false,
        default: null,
    },
    // 表格删除回调
    onDelete: {
        type: Function,
        required: false,
        default: null,
    },
    // 表格完成删除回调
    onDidDelete: {
        type: Function,
        required: false,
        default: null,
    },
}
