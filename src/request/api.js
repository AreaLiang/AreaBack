import { get, post ,formDatapost} from './http'

//登录和注册页面
export const loginApi = p => post('/areaBackLogin', p);

/*主页*/
//校验用户信息
export const checkUserInfoApi = p => post('/areaBackCheckUserInfo', p);//发布文章
export const userExitApi = p => get('/areaBackuserExit', p);//发布文章

//文章管理
export const publishArticleApi = p => post('/hotList', p);//发布文章
export const articleManagementApi = p => post('/articleManagement', p);//文章管理数据
export const articleMgeSearchApi = p => post('/articleMgeSearch', p);//文章管理 搜索功能
export const artMegDownApi = p => post('/artMegDown', p);//文章管理 下架功能
export const artMegDelApi = p => post('/artMegDel', p);//文章管理 删除功能
export const queryArticleApi = p => post('/queryArticle', p);//查询文章 功能
export const getVerifyArticleListApi = p => post('/getVerifyArticleList', p);//获取审核文章列表 功能
export const articleVerifyApi = p => post('/articleVerify', p);//获取审核文章列表 功能

//机构管理
export const addAccountApi = p => post('/addAccount', p);//添加账号 功能
export const getAccountListApi = p => post('/getAccountList', p);//获取审核文章列表 功能
export const getPermissionInfoApi = p => get('/getPermissionInfo', p);//获取账号列表和用户权限 功能
export const banAccountApi = p => post('/banAccount', p);//用户管理禁用账号 功能
export const delAccount_PERApi = p => post('/delAccount_PER', p);//删除账号 功能
export const modifyAccount_PERApi = p => post('/modifyAccount_PER', p);//删除账号 功能





