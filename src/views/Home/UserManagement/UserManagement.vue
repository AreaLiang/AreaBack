<template>
	<div class="user-management">
		<div class="wrap">
			<div class="ob-list">
				<el-button type="primary" @click="addUser">添加账号</el-button>
			</div>
			<el-table :data="tableData" style="width: 100%;height: 750px;overflow:auto"
				@selection-change="handleSelectionChange" :header-cell-style="{'text-align':'center'}"
				:cell-style="{'text-align':'center'}" class="article_mag" v-loading='loading'>
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column label="ID" width="80">
					<template slot-scope="scope">
						<span>{{ scope.row.id }}</span>
					</template>
				</el-table-column>
				<el-table-column label="名称">
					<template slot-scope="scope">
						<span >{{ scope.row.name }}</span>
					</template>
				</el-table-column>
				<el-table-column label="账号类型">
					<template slot-scope="scope">
						<span>{{ scope.row.accountType }}</span>
					</template>
				</el-table-column>
				<el-table-column label="账号">
					<template slot-scope="scope">
						<span >{{ scope.row.account }}</span>
					</template>
				</el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">
						<el-tag :type="scope.row.status | banStyle('style')">{{ scope.row.status }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="250">
					<template slot-scope="scope" v-if="scope.row.id==1?false:true">
						<el-button size="mini" type="primary" @click="modifyFun(scope.row)">密码修改</el-button>
						<el-button size="mini" :type="scope.row.status | banStyle('style')" plain @click="banFun(scope.row)">
							{{scope.row.status | banStyle('txt')}}
						</el-button>
						<el-button size="mini" type="danger" @click="delFun(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>

			<div class="pagination">
				<pagination :dataTotal="dataTotal" :pageSize="number" />
			</div>
		</div>
		
		<!-- 添加用户弹窗 -->
		<addAccount ref="addAccount" @getAccountList='getAccountList' :currentRow="currentRow"/>	
	</div>
</template>

<script>
	import pagination from '@/components/pagination'
	import addAccount from './components/addAccount'
	import { getAccountListApi , banAccountApi , delAccount_PERApi} from '@/request/api'
	
	export default {
		name: 'UserManagement', //用户管理
		data() {
			return {
				tableData: [],
				articleQueryForm: {
					content: "",
					articleType: '全部',
					dateRange: ''
				},
				multipleSelection: [],
				page: 1,
				number: 9,
				dataTotal: 0,
				loading:false,
				currentRow:1,
			}
		},
		methods: {
			onSubmit(){
				
			},
			handleSelectionChange(val){
				
			},
			banFun(row){//禁用账号功能
				let opCode=row.status == '正常' ? 0 : 1;
				const banfun= id =>{
					banAccountApi({
						id:id,
						opCode:opCode
					}).then((res)=>{
						this.getAccountList();
					});
				}
				//加入节流函数
				this.throttle(banfun,2000)(row.id);
			},
			addUser(){//添加账号
				this.currentRow={};
				this.$refs['addAccount'].addAccountVisible=true;
				this.$refs['addAccount'].opCode=1;
			},
			modifyFun(row){//修改该账号的密码
				let dialog=this.$refs['addAccount'];
				dialog.addAccountVisible=true;
				this.currentRow=row;
				dialog.opCode=0;
			},
			delFun(row){//删除账号
				const delfun= id => {
					delAccount_PERApi({
						id:id
					}).then((res)=>{
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.getAccountList();
					});
				}
				//确认框
				this.confirmMes(delfun,"该账号删除")(row.id);
			},
			getAccountList(){//获取列表
				getAccountListApi({
					page: this.page,
					number: this.number
				}).then((res)=>{
					this.loading=false;
					this.tableData=Object.values(res.data);
				});
			}
		},
		filters:{
			banStyle:function(val,type){
				if(type=="style"){
					if(val!="正常") return 'info'
					else return 'warning'
				}else{
					if(val!="正常" ) return '启用'
					else return '禁用'
				}
			}
		},
		mounted(){
			this.loading=true;
			this.getAccountList();
		},
		components: {
			pagination,
			addAccount
		}
	}
</script>

<style scoped lang="less">
	@import "@/styles/index";

	.user-management {
		.artcleMegStyle();
		.ob-list{
			margin: 10px 0;
		}
	}
</style>
