<template>
	<div class="certification-center">
		<div class="step-box">
			<el-steps :space="200" :active="stepIndex" finish-status="success" :align-center="true">
				<el-step title="填写信息"></el-step>
				<el-step title="验证码"></el-step>
				<el-step title="等待审核"></el-step>
				<el-step title="认证结果"></el-step>
			</el-steps>
		</div>
		<div class="content">
			<div class="main">
				<div class="step1" v-show="stepIndex==0">
					<div class="item">
						<cftInfoForm ref="CertificationInfo"/>
					</div>
					<div class="item">
						<p>上传公司营业执照</p>
						<pictureCardUpload />
					</div>
				</div>
				<div class="step2" v-show="stepIndex==1">
					<phoneCode ref="phoneCode"/>
				</div>
				<div class="step3" v-show="stepIndex==2">
					<p style="color: #eb2121;">正在审核中，请耐心等候</p>
					<cftInfoForm  :isDisable="true" />
				</div>
				<div class="step4"></div>
			</div>
			<div class="btn-box">
				<el-button type="primary" class="sub-btn" v-show="stepIndex==1" @click="back">返回</el-button>
				<el-button type="primary" class="sub-btn" v-show="stepIndex==0" @click="submitForm('CertificationInfo')">提交</el-button>
				<el-button type="primary" class="sub-btn" v-show="stepIndex==1" @click="checkCode">提交</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import cftInfoForm from './components/cftInfoForm.vue'
	import pictureCardUpload from '@/components/upload/pictureCardUpload'
	import phoneCode from './components/phoneCode'
	
	export default {
		name: 'CertificationCenter',
		data() {
			return {
				stepIndex:0
			}
		},
		methods: {
			submitForm(formName) {//表单提交
				let sonComponent=this.$refs[formName];
				sonComponent.$refs['ruleForm'].validate((valid) => {
					if (valid) {
						if(this.stepIndex ==0) this.stepIndex += 1;//步骤条进度加一
						this.$refs['phoneCode'].ruleForm.second = 59;//设置验证码秒数
					} else return false
				});
			},
			checkCode(){//校验验证码
				if(this.stepIndex ==1) this.stepIndex +=1;
			},
			back(){//后退
				if(this.stepIndex >0 && this.stepIndex <3)  this.stepIndex -= 1;
			}
		},
		components: {
			cftInfoForm,
			pictureCardUpload,
			phoneCode
		}
	}
</script>

<style scoped lang="less">
	.certification-center {
		background-color: white;
		margin-top: 15px;
		overflow: hidden;

		.step-box {
			width: 65%;
			margin: 0 auto;
			margin-top: 20px;
		}

		.content {
			margin-top: 20px;
			padding: 20px 0px
		}

		.main {
			padding: 10px 0;
			display: flex;
			justify-content: center;
			.step1{
				display: flex;
				justify-content: center;
			}
			.item {
				margin: 0 5px;
			}
		}

		.btn-box {
			text-align: center;
		}

		.sub-btn {
			width: 200px;
		}
	}
</style>
