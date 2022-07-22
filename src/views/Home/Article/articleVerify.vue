<template>
	<div class="article-verify">
		<div class="wrap">
			<div class="ob-list">
				<serachBox ref="serachBox" statustype='shz' @search="searchSubmit"></serachBox>
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
	import {getVerifyArticleListApi,articleVerifyApi,articleMgeSearchApi} from '@/request/api'
	import serachBox from './components/serachBox'
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
					this.$refs['serachBox'].searchSubmit();
				})
			},
			searchSubmit(searchList){
				this.loading = true;
				
				const searchFun= () => {//搜索接口调用
					articleMgeSearchApi({
						page: this.page,
						number: this.number,
						searchList: JSON.stringify(searchList)
					}).then((res) => {
						this.tableData = Object.values(res.data);
						this.dataTotal = parseInt(res.list) * this.number;
						this.loading = false;
					}).catch(e => this.loading = true)
				}
				//加入防抖函数
				this.debounce(searchFun)();
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
			checkOriginal,
			serachBox
		}
	}
</script>

<style scoped lang="less">
@import "@/styles/index";
.article-verify {
	.artcleMegStyle();
}
</style>
