<template>
	<div class="article-management">
		<div class="wrap">
			<div class="ob-list">
				<el-form :inline="true" :model="articelQueryForm" class="demo-form-inline">
					<el-form-item label="文章标题">
						<el-input v-model="articelQueryForm.content" placeholder="请输入搜索内容"></el-input>
					</el-form-item>
					<el-form-item label="状态">
						<el-select v-model="articelQueryForm.statusType">
							<el-option label="全部" value="all"></el-option>
							<el-option label="已发布" value="yfb"></el-option>
							<el-option label="审核中" value="shz"></el-option>
							<el-option label="已下架" value="yxj"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="文章类别">
						<el-select v-model="articelQueryForm.articleType">
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
			<el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange"
				:header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column label="文章标题" width="300">
					<template slot-scope="scope">
						<span>{{ scope.row.title }}</span>
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
						<span>{{ scope.row.classification }}</span>
					</template>
				</el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">
						<span>{{ scope.row.status }}</span>
					</template>
				</el-table-column>
				<el-table-column label="浏览量">
					<template slot-scope="scope">
						<span>{{ scope.row.pageviews }}</span>
					</template>
				</el-table-column>
				<el-table-column label="发布日期" sortable>
					<template slot-scope="scope">
						<i class="el-icon-time"></i>
						<span>{{ scope.row.publishDate }}</span>
					</template>
				</el-table-column>
				<el-table-column label="姓名">
					<template slot-scope="scope">
						<div slot="reference" class="name-wrapper">
							<el-tag size="medium">{{ scope.row.name }}</el-tag>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="230">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button size="mini" type="primary" @click="handleDown(scope.$index, scope.row)">下架
						</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>

			<div class="pagination">
				<pagination :dataTotal="55" :pageSize="15" />
			</div>
		</div>
	</div>
</template>

<script>
	import pagination from '@/components/pagination'
	import datePicker from '@/components/datePicker'
	export default {
		name: 'ArticleManagement', //文章管理
		data() {
			return {
				tableData: [{
						publishDate: '2016-05-02',
						name: '王小虎',
						title: '上海市普陀区金沙江路 1518 弄',
						top: false,
						classification: '政治',
						status: '已发布',
						pageviews:520
					},
					{
						publishDate: '2016-05-01',
						name: '小虎',
						title: '上海市普陀区金沙江路 1518 弄',
						top: false,
						classification: '政治',
						status: '审核中',
						pageviews:0
					},
					{
						publishDate: '2016-04-02',
						name: '赖少',
						title: '上海市普陀区金沙江路 1518 弄',
						top: false,
						classification: '体育',
						status: '已发布',
						pageviews:9860
					},
					{
						publishDate: '2016-06-02',
						name: '王小虎',
						title: '上海市普陀区金沙江路 1518 弄',
						top: false,
						classification: '财经',
						status: '已下架',
						pageviews:660
					},
					{
						publishDate: '2016-06-02',
						name: '江弄小',
						title: '上海市普陀区金沙江路 1518 弄',
						top: false,
						classification: '体育',
						status: '审核中',
						pageviews:0
					},
					{
						publishDate: '2016-06-02',
						name: '普小市',
						title: '上海市普陀区金沙江路 1518 弄',
						top: false,
						classification: '政治',
						status: '已发布',
						pageviews:166
					},
					{
						publishDate: '2016-06-02',
						name: '美海',
						title: '上海市普陀区金沙江路 1518 弄',
						top: false,
						classification: '美食',
						status: '已发布',
						pageviews:19
					}
				],
				articelQueryForm: {
					content: "",
					statusType: "全部",
					articleType: '全部',
					dateRange: ''
				},
				multipleSelection: []
			}
		},
		methods: {
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);

			},
			handleDown(index, row) {
				console.log(index, row);
			},
			onSubmit() {

			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(val)
			}
		},
		components: {
			pagination,
			datePicker
		}
	}
</script>

<style scoped lang="less">
	.article-management {
		overflow: hidden;

		.wrap {
			margin: 10px
		}

		.pagination {
			text-align: right;
			margin-top: 10px;
		}
	}
</style>
