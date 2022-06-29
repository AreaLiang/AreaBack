<template>
	<div class="login-background">
		<div id="large-header" class="large-header">
			<slot></slot>
			<canvas id="bc-canvas"></canvas>
		</div>
	</div>
</template>

<script>
	import loginBackground from '@/utils/loginBackground.js'
	export default {
		name: 'loginBackground', //登录背景动画
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		components: {

		},
		mounted() {
			loginBackground(); //动画效果
		}
	}
</script>

<style scoped lang="less">

	.login-background {
		.large-header {
			background-image: url('../assets/loginBackground.jpg');
			background-size: 100% 100%;
			background-repeat: no-repeat;
		}
	}

	canvas {
		width: 100%;
		height: 100%;
	}
</style>
