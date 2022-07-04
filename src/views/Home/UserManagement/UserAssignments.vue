<template>
	<div class="user-assignments">
		<div class="wrap">
			<div class="op-box">
				<el-button type="primary">新增角色</el-button>
			</div>
			<div>
				<el-table :data="roleTable" border style="width: 100%">
					<el-table-column prop="roleKey" label="roleKey"></el-table-column>
					<el-table-column prop="role" label="角色"></el-table-column>
					<el-table-column prop="name" label="名字" ></el-table-column>
					<el-table-column prop="Description" label="描述"></el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope" v-if="scope.row.roleKey==1 ?false:true">
							<el-button type="primary" @click="changeRole(scope.row)">编辑权限</el-button>
							<el-button type="danger">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			
		</div>
		
		<!-- 改变权限 Dialog弹窗 -->
		<changePermissionsDialog ref="changePermissions"></changePermissionsDialog>
	</div>
</template>

<script>
	import changePermissionsDialog from './components/changePermissionsDialog'
	export default {
		name: 'UserAssignments', //用户分配
		data() {
			return {
				roleTable: [{
					roleKey:1,
					role: 'admin',
					name: '超级管理员',
					Description: '超级管理员，拥有所有权限的，唯一的账号'
				},
				{
					roleKey:2,
					role: 'manager',
					name: '普通管理员',
					Description: '普通管理员，拥有文章审批，用户密码修改，发布文章权限'
				},
				{
					roleKey:3,
					role: 'editor',
					name: '编辑者',
					Description: '作者，发表文章权限'
				}]
			};
		},
		methods: {
			changeRole(row){
				console.log(row)
				this.$refs['changePermissions'].permissionsVisible=true;
			}
		},
		components: {
			changePermissionsDialog
		}
	}
</script>

<style scoped lang="less">
	.user-assignments {
		overflow: hidden;

		.wrap {
			background-color: white;
			margin: 10px;
			padding: 10px;
		}

		.op-box {
			margin: 10px 0;
		}
	}
</style>
