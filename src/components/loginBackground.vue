<template>
	<div class="login-background">
		<div id="large-header" class="large-header">
			<div class="from-box">
				<p class="title">欢迎来到Area登录界面</p>
				<el-form :model="loginForm" :rules="rules" ref="loginForm" style="width: 320px;">
					<el-form-item prop="accound">
						<el-input placeholder="请输入账号" v-model="loginForm.accound" class="bc-input">
							<el-button slot="prepend" icon="el-icon-user cfu-icon"></el-button>
						</el-input>
					</el-form-item>

					<el-form-item prop="password">
						<el-input placeholder="请输入密码" v-model="loginForm.password" :show-password='true'
							class="bc-input">
							<el-button slot="prepend" icon="el-icon-lock cfu-icon"></el-button>
						</el-input>
					</el-form-item>

					<el-button type="primary" style="width: 100%;" @click="submitForm('loginForm')">登录</el-button>
				</el-form>
			</div>
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
				loginForm: {
					accound: '',
					password: ''
				},
				rules: {
					accound: [{
						required: true,
						message: '请输入账号',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log('submit!');
						this.$router.push('/Home');
					}
				});
			},
		},
		components: {

		},
		mounted() {
			loginBackground(); //动画效果
		}
	}
</script>

<style lang="less">
	@import '/src/styles/loginBackground.css';

	@borderRadius: 21px; //输入框的圆角像素

	.customize_input() {
		background-color: transparent;
		border: 0;
	}

	.login-background {
		.large-header {
			background-image: url('../assets/loginBackground.jpg');
			background-size: 100% 100%;
			background-repeat: no-repeat;
		}

		.from-box {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			.title {
				color: white;
				text-align: center;
			}
		}

		.bc-input {
			border: 2px solid #484848;
			border-radius: @borderRadius;

			.el-input__inner {
				.customize_input
			}

			.el-input-group__prepend {
				.customize_input
			}

			.el-input__inner {
				padding: 0 15px 0 0;
				color: #ffffff;
			}

			.cfu-icon {
				font-size: 1.5vw;
			}
		}

		.el-button {
			border-radius: @borderRadius;
		}
	}

	canvas {
		width: 100%;
		height: 100%;
	}
</style>
