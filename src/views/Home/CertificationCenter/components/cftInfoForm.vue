<template>
	<div class="cft-info-form">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" :disabled="isDisable" :hide-required-asterisk="isDisable" label-width="100px" class="demo-ruleForm" label-position="left">
			<el-form-item label="公司名称" prop="companyName">
				<el-input v-model="ruleForm.companyName"></el-input>
			</el-form-item>
			<el-form-item label="公司地址" prop="companyAddress">
				<el-input v-model="ruleForm.companyAddress"></el-input>
			</el-form-item>
			<el-form-item label="联系电话" prop="phone">
				<el-input v-model="ruleForm.phone"></el-input>
			</el-form-item>
			<el-form-item label="法人名称" prop="legalPerson">
				<el-input v-model="ruleForm.legalPerson"></el-input>
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
					companyName: '1',
					companyAddress:'1',
					phone:'13332123221',
					legalPerson:'1'
				},
				rules: {
					companyName:[{
						required: true,
						message: '请输公司名称',
						trigger: 'blur'
					}],
					companyAddress:[{
						required: true,
						message: '请输公司地址',
						trigger: 'blur'
					}],
					legalPerson:[{
						required: true,
						message: '请输法人名称',
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		},
		mixins:[FormValidationRules],
		props:{
			isDisable:{
				type:Boolean,
				default:false
			}
		}
	}
</script>

<style scoped lang="less">
.cft-info-form{
	width: 450px;
	margin: 0 auto;
}
</style>
