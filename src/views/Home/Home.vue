<template>
	<div class="home">
		<el-row class="h-style">
			<!-- 左边导航栏 -->
			<el-col :span="3" class="h-style" >
				<homeNavigation />
			</el-col>
			
			<!-- 右边主体部分，二级路由的显示区域 -->
			<el-col :span="21" class="h-style">
				<div class="content">
					<router-view></router-view>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import homeNavigation from '/src/components/homeNavigation'
	export default {
		name: 'home',
		data() {
			return {

			}
		},
		methods: {

		},
		components: {
			homeNavigation
		}
	}
</script>

<style scoped lang="less">
	@import '@/styles';
	.home {
		min-width: 1380px;
		height: 100%;
		width: 100%;
		.h-style {
			height: @h-height;
		}
		.content{
			height: 100%;
			background-color: #f0f2f5;
		}
	}
</style>
