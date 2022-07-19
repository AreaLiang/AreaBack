<template>
	<div class="change-permissions">
		<el-dialog title="权限配置" :visible.sync="permissionsVisible" width="60%" >
			<div class="content">
				<div class="transfer">
					<el-transfer v-model="value" :data="data" :titles="['未配置权限', '已拥有权限']"></el-transfer>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="permissionsVisible = false">取 消</el-button>
				<el-button type="primary" @click="confirmChange">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import {modifyUser_PERApi} from '@/request/api'
	export default {
		name: 'changePermissionsDialog', //更改权限弹窗
		data() {
			return {
				data: [],
				value: [],
				permissionsVisible: false
			}
		},
		methods:{
			confirmChange(){//更改权限
				let perList=JSON.parse(JSON.stringify(this.value));
				perList.push(1);
			
				modifyUser_PERApi({
					id:this.currentRoleKey,
					newPm:JSON.stringify(perList)
				}).then((res)=>{
					if(res.code="200"){
						this.$message.success("更改成功");
						this.$emit('initRoleInfo');
					}
					
				});
				this.permissionsVisible = false
			}
		},
		props:['currentRoleKey']
	}
</script>

<style scoped lang="less">
.change-permissions{
	.transfer{
		margin: auto ;
		width: fit-content;
	}
}
</style>
