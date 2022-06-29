import { get, post ,formDatapost} from './http'

//登录和注册页面
export const uploadApi = p => formDatapost('/upload', p);

//主页
export const publishArticleApi = p => post('/hotList', p);//发布文章
export const articleManagementApi = p => post('/articleManagement', p);//文章管理数据
export const articleMgeSearchApi = p => post('/articleMgeSearch', p);//文章管理 搜索功能
export const artMegDownApi = p => post('/artMegDown', p);//文章管理 下架功能
export const artMegDelApi = p => post('/artMegDel', p);//文章管理 删除功能
export const queryArticleApi = p => post('/queryArticle', p);//查询文章 功能
export const articleVerifyApi = p => post('/articleVerify', p);//审核文章 功能
