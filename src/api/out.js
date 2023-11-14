
import service from './service';
//可选出金账户列表
export const withdrawAccounts = (data) => service({
    url: '/withdrawAccounts',
    data,
    method: 'get'
})
// 可选入金货币
export const depCoins = (data) => service({
    url: '/depCoins',
    data,
    method: 'get'
})
// 可选出金货币
export const withdrawCoins = (data) => service({
    url: '/withdrawCoins',
    data,
    method: 'get'
})

// 可出金账本列表 
export const balanceList = (data) => service({
    url: '/balanceList',
    data,
    method: 'get'
})
// 出金申请
// coinCode 出金币种代码
// reqValue 申请出金金额
// bankId 接款账户
export const putWithdraw = (data) => service({
    url: '/putWithdraw',
    data,
    method: 'post'
})

// 出金申请usdt
// coinCode 出金币种代码
// reqValue 申请出金金额
// bankId 接款账户
export const putCryptWithdraw = (data) => service({
    url: '/putCryptWithdraw',
    data,
    method: 'post'
})

// 兑换金额
// exFrom 出金来源货币
// exTarget 出金目的货币
// exValue 出金金额
export const calculateRate = (data) => service({
    url: '/calculateRate',
    data,
    method: 'post'
})

// 入金相关 
// 入金申请详情

export const depositLGet = (data) => service({
    url: '/depositLGet',
    data,
    method: 'get'
})
// 入金申请列表
/** id
 *  coinCode 法币入金货币代码，必选，只能选择法币货币代码 必填
 *  reqValue  申请金额   必填
 *   bankId   入金时用于收款的银行账户，无需填写，只需要传递coinCode查询即刻获得管理端设置好对应的入金收款账户
 *   sendBank  入金时用户的打款账户，必选自己登记过的账户  必填
 *   depValue  实际到款金额
 *   recorded  审核人
 *   reqStatus  申请状态 1 提交申请 2 确认汇款 3 财务审核 4 入账完成
 *   userId
 *   reqProof 入金汇款凭证，提交申请完成后，第二步需要提交汇款水单截图，第二步时必填
 *   memo  如果驳回，可以在备注字段填写原因，用户查看详情是可以查看到
 *   createTime
 *   modifiedTime 编辑时间
 * */
export const depositList = (data) => service({
    url: '/depositList',
    data,
    method: 'post'
})

// 出金列表
export const withdrawList = (data) => service({
    url: '/withdrawList',
    data,
    method: 'post'
})

// 入金申请
export const putDeposit = (data) => service({
    url: '/putDeposit',
    data,
    method: 'post'
})

// 出金列表（加密货币—）
export const cryptWithdrawList = (data) => service({
    url: '/cryptWithdrawList',
    data,
    method: 'post'
})

// 加密货币入金申请详情
export const cryptDepositGet = (data) => service({
    url: '/cryptDepositGet',
    data,
    method: 'get'
})
// 加密货币入金申列表
/** id
 *  coinCode 货币代码，必须选择一个加密货币代码(目前只有USDT) 必填
 *  reqValue  申请金额   必填
 *  cryptAdd  钱包地址，入金时填的是转账钱包地址，出金时填的是接收钱包地址 必填
 *  tid  转账交易地址，入金时提交申请时填写，出金时审核出账时填写 
 *  reqType  申请类型 1 入金 2 出金，提交申请时无需填写，不同接口内确定申请的类型
 *  reqStatus 若是入金 1 已提交 2 已入账 若是出金 1 已提交 2 已出账  
 *  reqProof 加密货币申请时的转账凭证，若是出金，则是审批时可以上传的转账截图，可以传jpg,pdf
 *  userId
 *  recorded 用户名
 *  memo  如果驳回，可以在备注字段填写原因，用户查看详情是可以查看到
 *  createTime
 *  modifiedTime 编辑时间
 * */
export const cryptDepositList = (data) => service({
    url: '/cryptDepositList',
    data,
    method: 'post'
})
// 加密货币入金申请
export const putCryptDeposit = (data) => service({
    url: '/putCryptDeposit',
    data,
    method: 'post'
})


// 入金审核提交转账记录
export const perDeposit = (data) => service({
    url: '/perDeposit',
    data,
    method: 'post'
})

// admin 入金审核
export const perCryptDeposit = (data) => service({
    url: '/perCryptDeposit',
    data,
    method: 'post'
})

// 出金审核提交转账记录
export const perWithdraw = (data) => service({
    url: '/perWithdraw',
    data,
    method: 'post'
})

// admin 出金审核加密货币
export const perCryptWithdraw = (data) => service({
    url: '/perCryptWithdraw',
    data,
    method: 'post'
})