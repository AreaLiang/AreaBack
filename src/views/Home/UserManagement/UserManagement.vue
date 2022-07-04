<template>
	<div class="user-management">
		<div class="wrap">
			<div class="ob-list">
				<el-form :inline="true" :model="articleQueryForm" class="demo-form-inline">
					<el-form-item label="文章标题">
						<el-input v-model="articleQueryForm.content" placeholder="请输入搜索内容"></el-input>
					</el-form-item>
					<el-form-item label="文章类别">
						<el-select v-model="articleQueryForm.articleType">
							<el-option label="全部" value="all"></el-option>
							<el-option label="政治" value="zhengzhi"></el-option>
							<el-option label="体育" value="tiyu"></el-option>
							<el-option label="财经" value="caijing"></el-option>
							<el-option label="科技" value="keji"></el-option>
							<el-option label="娱乐" value="yule"></el-option>
							<el-option label="美食" value="meishi"></el-option>
						</el-select>
					</el-form-item>
				
					<el-form-item>
						<el-button type="primary" @click="onSubmit">查询</el-button>
						<el-button type="primary" @click="addUser">添加账号</el-button>
					</el-form-item>
				</el-form>
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
				<el-table-column label="姓名">
					<template slot-scope="scope">
						<span >{{ scope.row.name }}</span>
					</template>
				</el-table-column>
				<el-table-column label="账号">
					<template slot-scope="scope">
						<span >{{ scope.row.account }}</span>
					</template>
				</el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">
						<span >{{ scope.row.status }}</span>
					</template>
				</el-table-column>
				<el-table-column label="账号类型">
					<template slot-scope="scope">
						<span>{{ scope.row.accountType }}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope" v-if="scope.row.id==1?false:true">
						<el-button size="mini" type="primary">修改</el-button>
						<el-button size="mini" type="warning" plain>禁用</el-button>
						<el-button size="mini" type="danger">删除</el-button>
					</template>
				</el-table-column>
			</el-table>

			<div class="pagination">
				<pagination :dataTotal="dataTotal" :pageSize="number" />
			</div>
		</div>
		
		<!-- 添加用户弹窗 -->
		<addAccount ref="addAccount" @getAccountList='getAccountList' />	
	</div>
</template>

<script>
	import pagination from '@/components/pagination'
	import addAccount from './components/addAccount'
	import { getAccountListApi } from '@/request/api'
	
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
				loading:false
			}
		},
		methods: {
			onSubmit(){
				
			},
			handleSelectionChange(val){
				
			},
			addUser(){
				this.$refs['addAccount'].addAccountVisible=true;
			},
			getAccountList(){
				getAccountListApi({
					page: this.page,
					number: this.number
				}).then((res)=>{
					console.log({...res.data})
					this.tableData=Object.values(res.data);
				});
			}
		},
		mounted(){
			this.getAccountList()
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
	}
</style>
