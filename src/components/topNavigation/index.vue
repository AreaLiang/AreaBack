<template>
	<div class="top-navigation">
		<div class="left"></div>
		<div class="right">
			<el-avatar :src="portraitUrl" :size='60' class="r-item"></el-avatar>
			<el-dropdown class="r-item dropdown" trigger="click">
				<span class="el-dropdown-link">
					{{userInfo.account}}<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item @click.native="exitFun">退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
	import {userExitApi} from '@/request/api'
	import {mapState} from 'vuex'
	export default {
		name: 'topNavigation', //顶部导航栏
		data() {
			return {
				portraitUrl: require('@/assets/portrait.gif')
			}
		},
		computed:{
			...mapState('user',['userInfo'])
		},
		methods: {
			exitFun(){
				userExitApi().then((res)=>{
					this.$message.success('退出成功');
					localStorage.removeItem('token');
					setTimeout(()=>{
						this.$router.push('/Login');
					},1000)
				});
			}
		}
	}
</script>

<style scoped lang="less">
	.top-navigation {
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		width: 100%;
		display: flex;
		justify-content: space-between;
		background-color: white;

		.right {
			margin: 5px 15px;
			display: flex;
			align-items: center;
		}

		.r-item {
			margin: 0 5px;
		}
		.dropdown{
			cursor: pointer;
		}
	}
</style>
