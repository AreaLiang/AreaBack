<template>
	<div class="login">
		<loginBackground>
			<div class="from-box">
				<p class="title">欢迎来到Area登录界面</p>
				<el-form :model="loginForm" :rules="rules" ref="loginForm" style="width: 320px;">
					<el-form-item prop="accound">
						<el-input placeholder="请输入账号" v-model="loginForm.account" class="bc-input" v-focus>
							<el-button slot="prepend" icon="el-icon-user cfu-icon"></el-button>
						</el-input>
					</el-form-item>

					<el-form-item prop="password">
						<el-input placeholder="请输入密码" v-model="loginForm.password" :show-password='true'
							class="bc-input" @keyup.enter.native="submitForm('loginForm')">
							<el-button slot="prepend" icon="el-icon-lock cfu-icon"></el-button>
						</el-input>
					</el-form-item>

					<el-button type="primary" style="width: 100%;" @click="submitForm('loginForm')">登录</el-button>
				</el-form>
			</div>
		</loginBackground>
	</div>
</template>

<script>
	import loginBackground from '@/components/loginBackground'
	import {
		loginApi
	} from '@/request/api'
	import {
		resetRouter
	} from '@/router'
	export default {
		name: 'Login', //登录界面
		data() {
			return {
				loginForm: {
					account: 'admin',
					password: '1'
				},
				rules: {
					account: [{
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
						loginApi({
							account: this.loginForm.account,
							password: this.loginForm.password
						}).then((res) => {
							console.log(res);
							if (res.code == "200") {
								(async () => {
									let {
										token,
										data
									} = res;
									localStorage.setItem('token', token); //获取token
									this.$store.commit('user/setUserInfo', res); //保存用户信息在Vuex
									resetRouter(); //路由重置
									let routesList = await this.$store.dispatch(
										'user/generateRoutes', data.accountType); //动态路由表申请
									routesList.forEach(p => this.$router.addRoute(p)) //添加路由表

									this.$router.push('/Home/userData');
								})()
							} else {
								this.$message.warning(res.mes);
							}
						}).catch((e) => {
							console.log(e)
							this.$message.error('服务出错');
						});
					}
				});
			},
		},
		components: {
			loginBackground
		}
	}
</script>

<style lang="less">
	@borderRadius: 21px; //输入框的圆角像素

	.login {
		.customize_input() {
			background-color: transparent;
			border: 0;
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

			.el-input__inner,
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
</style>
