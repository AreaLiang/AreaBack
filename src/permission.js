import router from './router'
import store from './store'
import axios from 'axios'
import NProgress from 'nprogress' // 引入头部进度条
import 'nprogress/nprogress.css' // 进度条样式
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
			console.log("565",{...store.state.user})
			if(hasRole){
				store.dispatch('user/checkUserInfo',hasToken);
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
