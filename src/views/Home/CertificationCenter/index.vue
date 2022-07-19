<template>
	<div class="certification-center" >
		<div class="step-box">
			<el-steps :space="200" :active="1" finish-status="success" :align-center="true">
				<el-step title="填写信息"></el-step>
				<el-step title="验证码"></el-step>
				<el-step title="等待审核"></el-step>
				<el-step title="认证结果"></el-step>
			</el-steps>
		</div>
		<div class="content">
			<div class="main">
				<cftInfoForm />
			</div>
		</div>
	</div>
</template>

<script>
	import cftInfoForm from './components/cftInfoForm.vue'
	export default {
		name: 'CertificationCenter',
		data() {
			return {

			}
		},
		methods: {

		},
		components: {
			cftInfoForm
		}
	}
</script>

<style scoped lang="less">
.certification-center{
	background-color: white;
	margin-top: 15px;
	.step-box{
		width: 65%;
		margin: 0 auto;
	}
	.content{
		margin-top: 20px;
	}
	.main{
		padding: 10px 0;
	}
}

</style>
