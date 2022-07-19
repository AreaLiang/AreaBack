<template>
	<div class="cft-info-form">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="left">
			<el-form-item label="公司名称" prop="name">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item label="公司地址" prop="name">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item label="联系电话" prop="name">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item label="法人名称" prop="name">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {FormValidationRules} from '@/mixin'
	export default {
		name: 'cftInfoForm', //信息表单验证
		data() {
			return {
				ruleForm: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				rules: {
				
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		},
		mixins:[FormValidationRules]
	}
</script>

<style scoped lang="less">
.cft-info-form{
	width: 450px;
	margin: 0 auto;
}
</style>
