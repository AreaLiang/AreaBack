<template>
	<div class="homeNavigation">
		<el-menu default-active="2" class="h-style" background-color="#545c64" text-color="#fff"
			active-text-color="#ffd04b" :router="true">
			<el-menu-item index="/Home/userData" >
				<i class="el-icon-document"></i>
				<span slot="title">首页</span>
			</el-menu-item>
			<el-submenu index="2">
				<template slot="title">
					<i class="el-icon-location"></i>
					<span>文章管理</span>
				</template>
				<el-menu-item index="/Home/publishArticle">发表文章</el-menu-item>
				<el-menu-item index="2-2">文章管理</el-menu-item>
				<el-menu-item index="2-3">评论管理</el-menu-item>
			</el-submenu>

			<el-menu-item index="3" disabled>
				<i class="el-icon-document"></i>
				<span slot="title">用户管理</span>
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
