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
		generateRoutes(context, roleID) { //生成路由表
			return getPermissionInfoApi().then((res)=>{
				let roleList=res.data.roleList;
				
				roleList=roleList.filter((p)=>{
					return p.accountType==roleID;
				});
				let permissionList=Object.assign({},...roleList).permissionList;
				
				const accessRoutes=filterAsyncRoutes(asyncRouter, permissionList);
				accessRoutes.push(...errorRouter);
				
				context.commit('SavePermissionList',permissionList);
				context.commit('GenerateRoutes',accessRoutes);
				return Promise.resolve(accessRoutes);
			});
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
		},
		SavePermissionList(state, val){
			state.permissionList=val;
		}
	},
	state: {
		token: '',
		userInfo: {},
		routesList:{},
		permissionList:{}
	},
	gutters: {

	}
}

/**
 * 过滤 路由权限表
 * @param {Array} routes [动态路由表]
 * @param {Array} permissionList [身份权限表]
 */

function filterAsyncRoutes(routes,permissionList) {
	let routesList=new Set(permissionList);
	let newRoutes,isRole;
	newRoutes=routes.filter((p)=>{//第一层过滤是否有权限
		isRole=routesList.has(p.meta.roleID);
		if(isRole){
			if(p.children){//判断是否有children
				p.children=p.children.filter((item)=>{//children再次过滤是否有权限的访问的路由
					return routesList.has(item.meta.roleID);
				})
			}
			return true;
		}else false;
	});
	
	return newRoutes;
}