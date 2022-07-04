<template>
	<div class="article-verify">
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
					<el-form-item label="日期范围">
						<datePicker></datePicker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit">查询</el-button>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="tableData"  style="width: 100%;height: 750px;overflow:auto" @selection-change="handleSelectionChange"
				:header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" class="article_mag" v-loading='loading'>
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column label="ID" width="50">
					<template slot-scope="scope">
						<span>{{ scope.row.id }}</span>
					</template>
				</el-table-column>
				<el-table-column label="文章标题" width="300">
					<template slot-scope="scope">
						<span class="title">{{ scope.row.title }}</span>
					</template>
				</el-table-column>
				<el-table-column label="链接">
					<template slot-scope="scope">
						<el-link type="primary" @click.native="checkOrigial(scope.row)" >查看原文</el-link>
					</template>
				</el-table-column>
				<el-table-column label="类别">
					<template slot-scope="scope">
						<span>{{ scope.row.articleType }}</span>
					</template>
				</el-table-column>
				<el-table-column label="作者">
					<template slot-scope="scope">
						<span>{{ scope.row.name }}</span>
					</template>
				</el-table-column>
				
				<el-table-column label="发布日期" sortable>
					<template slot-scope="scope">
						<span>{{ scope.row.publishDate }}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="180">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" @click="verifyFun(scope.row,1)">通过</el-button>
						<el-button size="mini" type="warning" @click="verifyFun(scope.row,0)">不通过</el-button>
					</template>
				</el-table-column>
			</el-table>

			<div class="pagination">
				<pagination :dataTotal="dataTotal" :pageSize="number" />
			</div>
			
			<!-- 查看原文弹窗 -->
			<checkOriginal ref="checkOriginal" :articleInfo="articleInfo" />
		</div>
	</div>
</template>

<script>
	import pagination from '@/components/pagination'
	import datePicker from '@/components/datePicker'
	import checkOriginal from './components/checkOriginal'
	import {getVerifyArticleListApi,articleVerifyApi} from '@/request/api'
	export default {
		name: 'articleVerify', //文章审核
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
				articleInfo:{
					title:'',
					content:''
				},
				loading:false
			}
		},
		methods: {
			onSubmit() {

			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(val)
			},
			checkOrigial(row){//点击 查看原文 触发事件
				this.$refs['checkOriginal'].originalDialogVisible=true;
				this.articleInfo.content=row.content;
				this.articleInfo.title=row.title;
			},
			getData(){//获取审核文章列表
				getVerifyArticleListApi({
					page: this.page,
					number: this.number,
				}).then((res) => {
					console.log(res)
					this.tableData= Object.values(res.data);
				
					this.dataTotal = parseInt(res.list) * this.number;
					this.loading = false;
				}).catch((e) => {
					this.loading = false
				});
			},
			verifyFun(row,opcode){//审核功能和审核失败功能
				articleVerifyApi({
					id:row.id,
					opcode:opcode
				}).then((res)=>{
					this.getData();
				});
			}
		},
		mounted() {
			this.getData();
			this.$bus.$on('pageNumber', (val) => {
				this.page = val;
				this.getData(); //页面改变重新请求数据
			});
		},
		beforeDestroy() {
			this.$bus.$off('pageNumber'); //解绑页码点击事件
		},
		components: {
			pagination,
			datePicker,
			checkOriginal
		}
	}
</script>

<style scoped lang="less">
@import "@/styles/index";
.article-verify {
	.artcleMegStyle();
}
</style>
