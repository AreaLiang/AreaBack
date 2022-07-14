<template>
	<div class="top-navigation">
		<div class="left"></div>
		<div class="right">
			46
		</div>
	</div>
</template>

<script>
	export default{
		name:'topNavigation',//顶部导航栏
		data(){
			return{
				
			}
		},
		methods:{
		
		},
		components:{
			
		}
	}
</script>

<style scoped lang="less">
	.top-navigation{
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		width: 100%;
		display: flex;
		justify-content: space-between;
		height: 100px;
	}
</style>