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
				<el-button type="primary" @click="permissionsVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'changePermissionsDialog', //更改权限弹窗
		data() {
			return {
				data: [],
				value: [],
				permissionsVisible: false
			}
		}
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
