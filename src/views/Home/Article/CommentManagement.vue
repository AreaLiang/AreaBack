<template>
	<div class="comment-management">
		<div class="wrap">
			<div class="ob-list">
				<el-form :inline="true" :model="articelQueryForm" class="demo-form-inline">
					<el-form-item label="文章标题">
						<el-input v-model="articelQueryForm.content" placeholder="请输入搜索内容"></el-input>
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
				:header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" class="article_mag">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column label="文章标题" width="300">
					<template slot-scope="scope">
						<span>{{ scope.row.title }}</span>
					</template>
				</el-table-column>
				<el-table-column label="链接">
					<template slot-scope="scope">
						<el-link type="primary" :href="scope.row.articleLink">查看原文</el-link>
					</template>
				</el-table-column>
				<el-table-column label="类别">
					<template slot-scope="scope">
						<span>{{ scope.row.classification }}</span>
					</template>
				</el-table-column>
				<el-table-column label="阅读数">
					<template slot-scope="scope">
						<span>{{ scope.row.reader }}</span>
					</template>
				</el-table-column>
				<el-table-column label="点赞数">
					<template slot-scope="scope">
						<span>{{ scope.row.like }}</span>
					</template>
				</el-table-column>
				<el-table-column label="评论数">
					<template slot-scope="scope">
						<span>{{ scope.row.common }}</span>
					</template>
				</el-table-column>
				<el-table-column label="发布日期" sortable>
					<template slot-scope="scope">
						<i class="el-icon-time"></i>
						<span>{{ scope.row.publishDate }}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="100">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" @click="handleExport(scope.$index, scope.row)">导出
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
		name: 'CommentManagement', //评论管理
		data() {
			return {
				tableData: [{
						title: '德国队因故弃权，中国男排被判3比0赢球，获得世界联赛第二场胜利',
						publishDate: '2016-05-02',
						reader: 52,
						like: 10,
						common: 5,
						articleLink: '#',
						classification: '体育'
					},
					{
						title: '“清华才女”李一诺：27岁博士毕业，4年生3个娃，替世界首富花钱',
						publishDate: '2016-05-02',
						reader: 52,
						like: 10,
						common: 5,
						articleLink: '#',
						classification: '财经'
					},
					{
						title: '任正非：华为一定会倒下，这是个哲学命题',
						publishDate: '2016-05-02',
						reader: 52,
						like: 10,
						common: 5,
						articleLink: '#',
						classification: '科技'
					},
					{
						title: 'FIFA排名：国足跌出亚洲前10，仅位列第11，世界排名再下跌1位',
						publishDate: '2016-05-02',
						reader: 52,
						like: 10,
						common: 5,
						articleLink: '#',
						classification: '体育'
					}
				],
				articelQueryForm: {
					content: "",
					articleType: '全部',
					dateRange: ''
				},
				multipleSelection: []
			}
		},
		methods: {
			handleExport(index, row) {
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
	@import "@/styles/index";
	.comment-management {
		.artcleMegStyle();
	}
</style>
