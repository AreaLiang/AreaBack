<template>
	<div class="check-original">
		<el-dialog title="添加账户" :visible.sync="addAccountVisible" width="40%" center :destroy-on-close="true">
			<div class="show-box">
				<el-form :model="addInfoForm" :rules="rules" ref="addInfoForm" label-position="left">
					<el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
						<el-input v-model="addInfoForm.name" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="账号" :label-width="formLabelWidth" prop="account">
						<el-input v-model="addInfoForm.account" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="密码" :label-width="formLabelWidth" prop="password">
						<el-input v-model="addInfoForm.password" autocomplete="off" show-password></el-input>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addAccountVisible = false">取 消</el-button>
				<el-button type="primary" @click="addAcount('addInfoForm')">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import {
		addAccountApi
	} from '@/request/api'
	import {
		nanoid
	} from 'nanoid'
	export default {
		name: 'addAccount', //添加账号
		data() {
			return {
				addAccountVisible: false,
				addInfoForm: {
					name: '',
					account: '',
					password: ''
				},
				formLabelWidth: '60px',
				rules: {
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}],
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
			addAcount(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						addAccountApi({
							account: this.addInfoForm.account,
							password: this.addInfoForm.password,
							name: this.addInfoForm.name,
							id: nanoid(4)
						}).then((res) => {
							if (res.code = "200") {
								this.addAccountVisible = false;
								this.$emit('getAccountList');
								this.$refs['addInfoForm'].resetFields();
								this.$message({
									type: 'success',
									message: '添加成功'
								})
							} else {
								this.$message({
									type: 'danger',
									message: '添加失败'
								})
							}
						});
					}
				});
			}
		},
		mounted() {
			
		},
		props: ['articleInfo']

	}
</script>

<style scoped lang="less">

</style>
