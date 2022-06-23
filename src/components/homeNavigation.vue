<template>
	<div class="homeNavigation">
		<el-menu default-active="2" class="h-style" background-color="#545c64" text-color="#fff"
			active-text-color="#ffd04b" :router="true">
			<el-menu-item index="/Home/userData" >
				<i class="el-icon-house"></i>
				<span slot="title">首页</span>
			</el-menu-item>
			<el-submenu index="2">
				<template slot="title">
					<i class="el-icon-tickets"></i>
					<span>文章管理</span>
				</template>
				<el-menu-item index="/Home/publishArticle">发表文章</el-menu-item>
				<el-menu-item index="/Home/articleManagement">文章管理</el-menu-item>
				<el-menu-item index="/Home/CommentManagement">评论管理</el-menu-item>
				<el-menu-item index="/Home/CommentManagement">文章审核</el-menu-item>
			</el-submenu>
			<el-submenu index="3">
				<template slot="title">
					<i class="el-icon-user"></i>
					<span>机构管理</span>
				</template>
				<el-menu-item index="/Home/publishArticle">用户管理</el-menu-item>
				<el-menu-item index="/Home/articleManagement">角色管理</el-menu-item>
				<el-menu-item index="/Home/publishArticle">账号申请</el-menu-item>
			</el-submenu>
			<el-menu-item index="#">
				<i class="el-icon-s-check"></i>
				<span slot="title">认证中心</span>
			</el-menu-item>
			<el-menu-item index="#">
				<i class="el-icon-bell"></i>
				<span slot="title">公告发布</span>
			</el-menu-item>
			<el-menu-item index="#">
				<i class="el-icon-info"></i>
				<span slot="title">公司信息</span>
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	export default {
		name: 'homeNavigation', //主页导航
		data() {
			return {

			}
		},
		methods: {

		},
		components: {

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
