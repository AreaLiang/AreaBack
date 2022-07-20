export const FormValidationRules = {//表单常用的验证规则
	data() {
		let validatePhone = (rule, value, callback) => {
			if (!value) {
				callback(new Error('手机号不能为空！'));
			}
			//使用正则表达式进行验证手机号码
			if (!/^1[3456789]\d{9}$/.test(value)) {
				callback(new Error('手机号不正确！'));
			}
			callback()
		};
		return {
			rules:{
				account: [{
						required: true,
						message: '请输入账号',
						trigger: 'blur'
					},
					{
						min: 3,
						message: '长度在3字符以上',
						trigger: 'blur'
					}
				],
				password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					},
					{
						min: 6,
						message: '长度在6个字符',
						trigger: 'blur'
					}
				],
				phone: [{
					validator: validatePhone,
					trigger: 'blur',
					required: true
				}]
			}
		}
	}
}
