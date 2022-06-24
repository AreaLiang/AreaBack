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
						<datePicker ref="datePicker"></datePicker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="searchSubmit">查询</el-button>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="tableData" style="width: 100%;height: 750px;overflow:auto"
				@selection-change="handleSelectionChange" :header-cell-style="{'text-align':'center'}"
				:cell-style="{'text-align':'center'}" class="article_mag">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column label="id" width="50">
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
	import {dateFormat} from '@/utils'
	import {
		articleManagementApi
	} from '@/request/api'
	export default {
		name: 'ArticleManagement', //文章管理
		data() {
			return {
				tableData: [],
				articelQueryForm: {
					content: "",
					statusType: "全部",
					articleType: '全部',
					dateRange: ''
				},
				multipleSelection: [],
				page: 1,
				number: 9
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
			searchSubmit() {
				this.articelQueryForm.dateRange=[...this.$refs['datePicker'].dateRange];
				console.log({...this.articelQueryForm})
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(val)
			},
			getArtcleMgeData() { //获取页面的文章管理数据
				articleManagementApi({
					page: this.page,
					number: this.number,
				}).then((res) => {
					console.log(res);
					this.tableData = Object.values(res.data);
				});
			}
		},
		filters: {
			tagStatusType: function(value) {//文章状态转换对应标签的颜色
				let tag={
					"审核中":'warning',
					"已发布":'success',
					"已下架":'info'
				};
				let map=new Map(Object.entries(tag));
				if (map.has(value)){
					return map.get(value)
				}else ''
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
			this.$bus.$off('pageNumber');//解绑页码点击事件
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

		.article_mag {
			.title {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
		}
	}
</style>
