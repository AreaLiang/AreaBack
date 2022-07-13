import {checkUserInfoApi,getPermissionInfoApi} from "@/request/api"
import {asyncRouter,errorRouter} from '@/router'

export default {
	namespaced: true,
	actions: {
		checkUserInfo(context, token) { //校验用户的token
			return checkUserInfoApi({
				token: token
			}).then((res) => {
				context.commit('setUserInfo', res);
			});
		},
		generateRoutes(context, roles) { //生成路由表
			getPermissionInfoApi().then((res)=>{
				console.log("ser",res.data.roleList)
			});
			const accessRoutes=filterAsyncRoutes(asyncRouter, roles);
			accessRoutes.push(...errorRouter);

			context.commit('GenerateRoutes',accessRoutes);
			return Promise.resolve(accessRoutes);
		}
	},
	mutations: {
		setUserInfo(state, val) { //设置token和用户信息
			let {token,data} = val;
			if (token) state.token = token;
			if (data) state.userInfo = data;
		},
		GenerateRoutes(state, val){
			state.routesList=val;
		}
	},
	state: {
		token: '',
		userInfo: {},
		routesList:{},
	},
	gutters: {

	}
}

/**
 * 过滤 路由权限表
 * @param {Array} routes [动态路由表]
 * @param {String} roles [身份权限]
 */
function filterAsyncRoutes(routes, roles) {
	
	let routesList,isRole;
	routesList = routes.filter((p) => {//第一层过滤是否有权限的访问的路由
		isRole=p.meta.role.includes(roles);
		if(isRole){
			if(p.children){//判断是否有children
				p.children=p.children.filter((item)=>{//children再次过滤是否有权限的访问的路由
					return item.meta.role.includes(roles);
				})
			}
			return true;
		}else false
	});
	
	return routesList;
}
