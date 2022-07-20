<template>
	<div class="phone-code">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
			label-position="top">
			<el-form-item prop="phoneCode">
				<el-input placeholder="请输入验证码" v-model="ruleForm.phoneCode">
					<template slot="append"><span @click="getCode">{{ruleForm.second}}</span></template>
				</el-input>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'phoneCode',
		data() {
			return {
				ruleForm: {
					phoneCode: '',
					second:0
				},
				rules:  {
					phoneCode:[{
						required: true,
						message: '请输入验证码',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			getCode(){
				if(typeof(this.ruleForm.second)=='string') this.ruleForm.second=59;
			}
		},
		watch: {
			'ruleForm.second':{
				deep:true,
				handler(val){
					if(val>0){
						setTimeout(()=>{
							this.ruleForm.second -=1;
						},1000)
					}else if(val==0){
						this.ruleForm.second = '获取验证码';
					}
				}
			}
		}
	}
</script>

<style scoped lang="less">

</style>
