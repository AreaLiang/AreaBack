import router from './router'
import store from './store'
import axios from 'axios'
import NProgress from 'nprogress' // 引入头部进度条
import 'nprogress/nprogress.css' // 进度条样式
import {Message} from 'element-ui';
import set from 'core-js/fn/reflect/set'
// import {} from "@/utils"

const whiteList = new Set(['/Login']);//白名单

NProgress.configure({
	showSpinner: false
}) // 进度条

router.beforeEach(async (to, from, next) => {
	NProgress.start() //开启进度条
	
	//获取用户 token
	const hasToken=localStorage.getItem('token');
	
	if(hasToken){//如果token存在，则跳过登录界面，直接进去后台主页

		//用户权限判断
		if (to.path === "/Login") {
			next()
		} else {
			//判断vuex里面是否有存在用户信息，没有则重新请求发送获取和验证
			const hasRole= JSON.stringify(store.state.user.userInfo) === '{}';
			
			if(hasRole){
				(async ()=> {
					//校验用户token
					await store.dispatch('user/checkUserInfo',hasToken);
					let data={...store.state.user};
					
					if(data.token){//如果token正确且没过期
						let routesList=await store.dispatch('user/generateRoutes',data.userInfo.accountType);//动态路由表申请
						routesList.forEach( p => router.addRoute(p)) //添加路由表
						next({...to,replace: true});
					}else{
						Message.warning("登录失效,正在为你转跳登录页面");
						setTimeout(()=>{router.push('/Login')},1000)
					}
				})();
			}else next();
		}
		NProgress.done();
	}else{
		if (whiteList.has(to.path)) {//如果在白名单内则通过
		  next();
		} else {
		  router.push('/Login');
		}
		NProgress.done();
	}
	
});
