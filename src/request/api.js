import { get, post ,formDatapost} from './http'

//登录和注册页面
export const uploadApi = p => formDatapost('/upload', p);

//主页
export const publishArticleApi = p => post('/hotList', p);//发布文章