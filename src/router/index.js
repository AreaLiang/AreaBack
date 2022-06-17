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
	{
		name: 'Login',
		path: '/Login',
		meta: {
			title: 'Area后台登录'
		},
		component: () => import('@/views/Login')
	},
	{
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
		}]
	},
	{
		name: 'Home',
		path: '/Home',
		meta: {
			title: 'Area后台功能界面'
		},
		component: () => import('@/views/Home/Home'),
		children: [{
			name: 'PublishArticle',
			path: 'publishArticle',
			component: () => import('@/views/Home/PublishArticle/PublishArticle')
		}]
	}
]



// 异步挂载的路由
// 动态需要根据权限加载的路由表
// export const asyncRouter = [{
// 	path: '/Home',
// 	component: () => import('@/views/HomePage'),
// 	children: [{
// 		name: 'businessEntrust',
// 		path: 'businessEntrust',
// 		meta: {
// 			isAuthority: "正常",
// 			headName: ['委托单管理', '/', ' 详细业务'],
// 			title: '业务大厅'
// 		},
// 		component: () => import('@/views/businessEntrust/bsEntrust')
// 	}, {
// 		name: 'mgCertificate',
// 		path: 'mgCertificate',
// 		meta: {
// 			isAuthority: "正常",
// 			headName: ['证书管理', '/', ' 详情'],
// 			title: '业务大厅'
// 		},
// 		component: () => import('@/views/certificateManagement/mgCertificate')
// 	}, {
// 		name: 'entrustTbDownload',
// 		path: 'entrustTb',
// 		meta: {
// 			isAuthority: "正常",
// 			title: '业务大厅'
// 		},
// 		component: () => import('@/views/entrustTbDownload/entrustTbDL')
// 	}]
// }]

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
