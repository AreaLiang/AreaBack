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
	import {getPermissionInfoApi} from '@/request/api'
	export default {
		name: 'UserAssignments', //用户分配
		data() {
			return {
				roleTable:[],
				resData:[]
			};
		},
		methods: {
			changeRole(row){
				const permissionsDialog=this.$refs['changePermissions'];
				permissionsDialog.permissionsVisible=true;
				
				//显示可以分配的权限列表
				const option = this.resData.permissionNameList;
				let set = new Set();
				for (let i = 0; i < option.length; i++) {
					set.add({
						key: i + 1,
						label: option[i]
					})
				}
				permissionsDialog.data= Array.from(set);
				
				for(let item of this.resData.roleList){//循环获取 所选的角色拥有的权限 
					if(item.accountType==row.role){
						permissionsDialog.value=item.permissionList;//赋值已经拥有的权限
					}
				}
			},
			initRoleInfo(){//初始化数据
				getPermissionInfoApi().then((res)=>{
					let data=res.data.roleList;
					//中文转义
					let changeChineseName={"admin":"超级管理员","manager":"普通管理员","editor":"编辑者"};
					const map=new Map(Object.entries(changeChineseName));//存储中文转义的数组方便查找
					
					let roleTable=[];
					for(let i=0;i<data.length;i++){//重组数据结构，为页面渲染准备
						roleTable.push({
							roleKey:i+1,
							role: data[i].accountType,
							permissionList:data[i].permissionList,
							name: map.get(data[i].accountType),
							Description:data[i].Description
						})
					}
					this.roleTable=roleTable;
					this.resData=res.data;
				});
			}
		},
		mounted() {
			this.initRoleInfo();
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
