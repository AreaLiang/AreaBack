<template>
	<div class="article-management">
		<div class="wrap">
			<div class="ob-list">
				<el-form :inline="true" :model="articleQueryForm" class="demo-form-inline">

					<el-form-item label="文章标题">
						<el-input v-model.trim="articleQueryForm.content" placeholder="请输入搜索内容"></el-input>
					</el-form-item>
					<el-form-item label="状态">
						<el-select v-model="articleQueryForm.statusType">
							<el-option label="全部" value="all"></el-option>
							<el-option label="已发布" value="yfb"></el-option>
							<el-option label="审核中" value="shz"></el-option>
							<el-option label="已下架" value="yxj"></el-option>
						</el-select>
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
						<datePicker ref="datePicker"></datePicker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="searchSubmit">查询</el-button>
						<el-button type="danger" @click="batchDeletion">批量删除</el-button>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="tableData" style="width: 100%;height: 750px;overflow:auto"
				@selection-change="handleSelectionChange" :header-cell-style="{'text-align':'center'}"
				:cell-style="{'text-align':'center'}" class="article_mag" v-loading="loading">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column label="ID" width="50">
					<template slot-scope="scope">
						<span>{{ scope.row.id }}</span>
					</template>
				</el-table-column>
				<el-table-column label="文章标题" width="300" prop="title">
					<template slot-scope="scope">
						<span class="title">{{ scope.row.title }}</span>
					</template>
				</el-table-column>
				<el-table-column label="置顶" width="50">
					<template slot-scope="scope">
						<el-checkbox-group v-model="scope.row.top">
							<el-checkbox name="type"></el-checkbox>
						</el-checkbox-group>
					</template>
				</el-table-column>
				<el-table-column label="文章分类">
					<template slot-scope="scope">
						<span>{{ scope.row.articleType }}</span>
					</template>
				</el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">
						<div slot="reference" class="name-wrapper">
							<el-tag size="medium" :type='scope.row.status|tagStatusType'>{{ scope.row.status }}</el-tag>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="浏览量" sortable prop="pageviews">
					<template slot-scope="scope">
						<span>{{ scope.row.pageviews }}</span>
					</template>
				</el-table-column>
				<el-table-column label="发布日期" sortable prop="publishDate" width="180">
					<template slot-scope="scope">
						<span>{{ scope.row.publishDate }}</span>
					</template>
				</el-table-column>
				<el-table-column label="姓名">
					<template slot-scope="scope">
						<span>{{ scope.row.name }}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="250">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button size="mini" type="primary" @click="handleDown(scope.$index, scope.row)"
							v-text="$options.filters.filterDown(scope.row.status)"
							v-if="$options.filters.filterDown(scope.row.status)"></el-button>

						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<pagination :dataTotal="dataTotal" :pageSize="number" />
			</div>
		</div>
	</div>
</template>

<script>
	import pagination from '@/components/pagination'
	import datePicker from '@/components/datePicker'
	import {
		dateFormat
	} from '@/utils'
	import {
		articleManagementApi,
		articleMgeSearchApi,
		artMegDownApi,
		artMegDelApi
	} from '@/request/api'
	export default {
		name: 'ArticleManagement', //文章管理
		data() {
			return {
				tableData: [],
				articleQueryForm: {
					content: "",
					statusType: "all",
					articleType: 'all',
					dateRange: ''
				},
				multipleSelection: [],
				page: 1,
				number: 9,
				dataTotal: 0,
				loading: true
			}
		},
		methods: {
			handleEdit(index, row) {
				this.$router.push({
					name: 'PublishArticle',
					params: {
						id: row.id
					}
				})
			},
			handleDelete(index, row) {//单项文章删除
				
			},
			batchDeletion() {//批量删除
			
				if (this.multipleSelection.length > 0) {
					let set=new Set();
					let multipleSelection=JSON.parse(JSON.stringify(this.multipleSelection));
					for(let item of multipleSelection){
						set.add(item.id)
					}
					set=JSON.stringify(Array.from(set));
				
					this.deleteFun({delList: set})
				} else {
					this.$message({
						message: '没有选中任何选项',
						type: 'warning'
					});
				}
			},
			handleDown(index, row) {
				//opcode操作码，-1 是下架，1是重新发布
				let opcode = row.status == '已发布' ? -1 : 1;
				let mes = row.status == '已发布' ? '下架' : '重新发布'

				this.$confirm(`此操作将${mes}该文章, 是否继续?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					artMegDownApi({
						id: row.id,
						opcode: opcode
					}).then((res) => {
						if (res.code == '200') {
							this.getArtcleMgeData();
							this.$message({
								type: 'success',
								message: `${mes}成功!`
							});
						} else {
							this.$message({
								type: 'warning',
								message: `${mes}失败!`
							});
						}
					});
				}).catch(e => e);
			},
			searchSubmit() {//搜索提交 功能
				this.articleQueryForm.dateRange = [...this.$refs['datePicker'].dateRange];
				articleMgeSearchApi({
					page: this.page,
					number: this.number,
					searchList: JSON.stringify(this.articleQueryForm)
				}).then((res) => {
					this.tableData = Object.values(res.data);
					this.dataTotal = parseInt(res.list) * this.number;
				});
			},
			handleSelectionChange(val) { //点击多选按钮
				this.multipleSelection = val;
			},
			getArtcleMgeData() { //获取页面的文章管理数据
				articleManagementApi({
					page: this.page,
					number: this.number,
				}).then((res) => {
					this.tableData = Object.values(res.data);
					this.dataTotal = parseInt(res.list) * this.number;
					this.loading = false;
				}).catch((e) => {
					this.loading = false
				});
			},
			deleteFun(data){//删除功能
				this.$confirm(`此操作将删除该文章, 是否继续?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					artMegDelApi(data).then((res) => {
						if (res.code == '200') {
							this.searchSubmit();
							this.$message({
								type: 'success',
								message: `删除成功!`
							});
						} else {
							this.$message({
								type: 'warning',
								message: `删除失败!`
							});
						}
					});
				}).catch(e => e);
			}
		},
		filters: {
			tagStatusType: function(value) { //文章状态转换对应标签的颜色
				let tag = {
					"审核中": 'warning',
					"已发布": 'success',
					"已下架": 'info',
					"审核失败": 'danger'
				};
				let map = new Map(Object.entries(tag));

				return map.has(value) ? map.get(value) : '';
			},
			filterDown: function(value) {

				let text = {
					"审核中": false,
					"已发布": '下架',
					"已下架": '重新发布',
					"审核失败": '重新发布'
				};

				let map = new Map(Object.entries(text));
				return map.has(value) ? map.get(value) : '';
			}
		},
		mounted() {
			this.getArtcleMgeData(); //初始化数据
			this.$bus.$on('pageNumber', (val) => {
				this.page = val;
				this.getArtcleMgeData(); //页面改变重新请求数据
			});
		},
		components: {
			pagination,
			datePicker
		},
		beforeDestroy() {
			this.$bus.$off('pageNumber'); //解绑页码点击事件
		}
	}
	
</script>

<style scoped lang="less">
	@import "@/styles/index";

	.article-management {
		.artcleMegStyle();
	}
</style>
