import {checkUserInfoApi} from "@/request/api"
export default {
	namespaced:true,
	actions: {
		checkUserInfo(context,token){
			checkUserInfoApi({token:token}).then((res)=>{
				console.log(res)
			});
		}
	},
	mutations: {
		setUserInfo(state, val) { //设置token和用户信息
			let {token,data} = val;
			if (token) state.token = token;
			if (data) state.userInfo = data;
		}
	},
	state: {
		token: '',
		userInfo: {}
	},
	gutters: {
	
	}
}