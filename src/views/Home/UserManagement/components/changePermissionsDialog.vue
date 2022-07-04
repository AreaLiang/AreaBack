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
			const generateData = _ => {
				const option = ["审核文章", "添加账号", "发布文章", "所有文章管理", "账号申请审批"];
				let set = new Set();
				for (let i = 0; i < option.length; i++) {
					set.add({
						key: i + 1,
						label: option[i]
					})
				}
				return Array.from(set);
			};
			return {
				data: generateData(),
				value: [],
				permissionsVisible: false
			}
		},
		methods: {

		},
		components: {

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
