import VueRouter from "vue-router"

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

//静态路由
export const constantRoutes = [{
		path: '/',
		redirect: '/Login'
	},
	{ //登录界面
		name: 'Login',
		path: '/Login',
		meta: {
			title: 'Area后台登录'
		},
		component: () => import('@/views/Login')
	},
	{ //主页用户数据
		name: 'Home',
		path: '/Home',
		meta: {
			title: 'Area后台功能界面'
		},
		component: () => import('@/views/Home/Home'),
		children: [{
				name: 'UserData',
				path: 'userData',
				component: () => import('@/views/Home/UserData/UserData')
			},
			{ //发布文章
				name: 'PublishArticle',
				path: 'publishArticle',
				component: () => import('@/views/Home/Article/PublishArticle')
			},
			{ //文章管理
				name: 'ArticleManagement',
				path: 'articleManagement',
				component: () => import('@/views/Home/Article/ArticleManagement')
			},
			{ //评论管理
				name: 'CommentManagement',
				path: 'commentManagement',
				component: () => import('@/views/Home/Article/CommentManagement')
			}
		]
	},
	{ //文章审核
		name: 'Home',
		path: '/Home',
		component: () => import('@/views/Home/Home'),
		children: [{
			name: 'ArticleVerify',
			path: 'articleVerify',
			component: () => import('@/views/Home/Article/articleVerify')
		}]
	},
	{ //用户管理
		name: 'Home',
		path: '/Home',
		component: () => import('@/views/Home/Home'),
		children: [{
			name: 'UserManagement',
			path: 'userManagement',
			component: () => import('@/views/Home/UserManagement/UserManagement')
		}]
	},
	{ //用户权限分配
		name: 'Home',
		path: '/Home',
		component: () => import('@/views/Home/Home'),
		children: [{
			name: 'UserAssignments',
			path: 'userAssignments',
			component: () => import('@/views/Home/UserManagement/UserAssignments')
		}]
	}
]



// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouter = [{
	path: '/Home',
	component: () => import('@/views/Home/Home'),
	children: [{ //用户管理
			name: 'UserManagement',
			path: 'userManagement',
			meta: {
				role: ['admin', 'super_editor']
			},
			component: () => import('@/views/Home/UserManagement/UserManagement')
		},
		{ //用户权限分配
			name: 'UserAssignments',
			path: 'userAssignments',
			meta: {
				role: ['admin']
			},
			component: () => import('@/views/Home/UserManagement/UserAssignments')
		},
		{ //文章审核
			name: 'ArticleVerify',
			path: 'articleVerify',
			meta: {
				role: ['admin', 'super_editor']
			},
			component: () => import('@/views/Home/Article/articleVerify')
		}
	]
}]

//错误提示的路由
// export const errorRouter = [
// 	{
// 		name:'error',
// 		path: "/404",
// 		component: () => import('@/components/error-page/error404')
// 	},
// 	{
// 		name:'error2',
// 		path: "*",
// 		redirect: '404',
// 	},
// 	{
// 		name:'error3',
// 		path: '/Home',
// 		component: () => import('@/views/HomePage'),
// 		children: [{
// 				path: "404",
// 				component: () => import('@/components/error-page/error404')
// 			},
// 			{
// 				path: "*",
// 				redirect: '404',
// 			}
// 		]
// 	}
// ]

const createRouter = () => new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes: constantRoutes
})

const router = createRouter();

//路由守卫后置钩子
router.afterEach((to, from) => {
	//修改标题名称
	document.title = to.meta.title || "Area管理后台"; //如果没有标题名，默认显示“ Area管理后台 ”
})

//重置路由
export function resetRouter() {
	const newRouter = createRouter()
	router.matcher = newRouter.matcher // reset router
}

export default router
