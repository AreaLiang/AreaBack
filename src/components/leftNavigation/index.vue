<template>
	<div class="homeNavigation">
		<el-menu default-active="2" class="h-style" background-color="#545c64" text-color="#fff"
			active-text-color="#ffd04b" :router="true">
			<template v-for="(p,index) in navData">
				<el-menu-item :index="p.url" v-if="p.type=='single'" :key="index">
					<i :class="p.icon"></i>
					<span slot="title">{{p.title}}</span>
				</el-menu-item>
				
				<el-submenu :index='index | toString' v-if="p.type=='more' && p.childrens.length > 0" :key="index">
					<template slot="title">
						<i :class="p.icon"></i>
						<span slot="title">{{p.title}}</span>
					</template>
					<template v-for="(item,i) in p.childrens">
						<el-menu-item :index="item.url" >{{item.title}}</el-menu-item>
					</template>
				</el-submenu>
			</template>
		</el-menu>
	</div>
</template>

<script>
	import {getPermissionInfoApi} from "@/request/api"
	import {mapState} from 'vuex'
	export default {
		name: 'leftNavigation', //主页导航
		data() {
			return {
				navData:[{
					type:'single',
					title:'首页',
					icon:'el-icon-house',
					url:'/Home/userData'
				},{
					type:'more',
					title:'文章管理',
					icon:'el-icon-tickets',
					childrens:[{
						title:'发表文章',
						url:'/Home/publishArticle'
					},
					{
						title:'文章管理',
						url:'/Home/articleManagement'
					},
					{
						title:'评论管理',
						url:'/Home/commentManagement'
					},
					{
						title:'文章审核',
						url:'/Home/articleVerify',
						roleID: 101
					}]
				},
				{
					type:'more',
					title:'机构管理',
					icon:'el-icon-user',
					childrens:[{
						title:'用户管理',
						url:'/Home/userManagement',
						roleID:201
					},
					{
						title:'角色管理',
						url:'/Home/userAssignments',
						roleID: 202
					},
					{
						title:'账号申请',
						url:'/Hom',
						roleID: 204
					}]
				},
				{
					type:'single',
					title:'认证中心',
					icon:'el-icon-s-check',
					url:'/Home/certificationCenter'
				},
				{
					type:'single',
					title:'公告发布',
					icon:'el-icon-bell',
					url:'#￥'
				},
				{
					type:'single',
					title:'公司信息',
					icon:'el-icon-info',
					url:'#2'
				}]
			}
		},
		computed:{
			...mapState('user',['userInfo','permissionList'])
		},
		filters:{
			toString(val) {
				return val.toString()
			}
		},
		methods: {
			generateNavigation(){//生成导航，根据权限过滤导航				
				let newNav=JSON.parse(JSON.stringify(this.navData));
				newNav=newNav.filter((p) => {
					if(p.roleID){//判断是否有roleID，如果没有，则默认不需要权限
						if (this.permissionList.includes(p.roleID)) return true
						else return false
					}else{
						if(p.childrens){
							p.childrens=p.childrens.filter((item)=>{
								if(item.roleID) {
									if (this.permissionList.includes(item.roleID)) return true
									else return false
								}else return true
							});
						}
						return true
					}
				});
				this.navData=newNav;
			}
		},
		mounted() {
			this.generateNavigation();
		}
	}
</script>

<style scoped lang="less">
	@import '@/styles';

	.homeNavigation {
		height: 100%;

		.h-style {
			height: @h-height;
		}

		.el-submenu .el-menu-item,
		.el-menu {
			min-width: 180px;
		}
	}
</style>
