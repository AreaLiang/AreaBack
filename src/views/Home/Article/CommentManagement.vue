<template>
	<div class="comment-management">
		<div class="wrap">
			<div class="ob-list">
				<!-- <el-form :inline="true" :model="articelQueryForm" class="demo-form-inline">
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
				</el-form> -->
			</div>
			<el-table :data="tableData" style="width: 100%" 
				@selection-change="handleSelectionChange"
				:header-cell-style="{'text-align':'center'}" 
				:cell-style="{'text-align':'center'}" 
				row-key="id"
				class="article_mag">
				
				<template v-for="(p,index) in tableHeard">
					<!-- 自定义列 -->
					<template v-if="p.customize">
						<!-- 查看原文 -->
						<template>
							<el-table-column v-if="p.prop=='articleLink'" :label="p.laber" :width="p.width" :key="index" :prop="p.prop">
								<template slot-scope="scope">
									<el-link type="primary" :href="scope.row.articleLink">查看原文</el-link>
								</template>
							</el-table-column>
						</template>
						<!-- 操作 -->
						<template>
							<el-table-column v-if="p.prop=='opBtn'" :label="p.laber" :width="p.width" :key="index" :prop="p.prop">
								<template slot-scope="scope">
									<el-button size="mini" type="primary"
										@click="handleExport(scope.$index, scope.row)">导出
									</el-button>
								</template>
							</el-table-column>
						</template>
					</template>
					
					<!-- 正常列 -->
					<template v-if="p.customize ==false">
						<el-table-column :label="p.laber" :type="p.type" :width="p.width" :key="index" :prop="p.prop">
						</el-table-column>
					</template>
				</template>
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
	import {
		fileLinkToStreamDownload
	} from '@/utils'
	import Sortable from 'sortablejs'

	export default {
		name: 'CommentManagement', //评论管理
		data() {
			return {
				tableHeard: [{
					type: "selection",
					width: 55,
					customize: false,
				}, {
					laber: "文章标题",
					prop: "title",
					customize: false, //是否为自定义
					sortable: false, //是否显示排序
					width: 300
				}, {
					laber: "链接",
					prop: "articleLink",
					customize: true,
					sortable: false, //是否显示排序
				}, {
					laber: "类别",
					prop: "classification",
					customize: false, //是否为自定义
					sortable: false, //是否显示排序
				}, {
					laber: "阅读数",
					prop: "reader",
					customize: false, //是否为自定义
					sortable: false, //是否显示排序
				}, {
					laber: "点赞数",
					prop: "like",
					customize: false, //是否为自定义
					sortable: false, //是否显示排序
				}, {
					laber: "评论数",
					prop: "common",
					customize: false, //是否为自定义
					sortable: false, //是否显示排序
				}, {
					laber: "发布日期",
					prop: "publishDate",
					customize: false, //是否为自定义
					sortable: false, //是否显示排序
				}, {
					laber: "操作",
					prop: "opBtn",
					customize: true, //是否为自定义
					sortable: false, //是否显示排序
					width: 100
				}],

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
				let link = `${window.location.origin}/test.pdf`;
				fileLinkToStreamDownload(link, '文件');
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(val)
			},
			// rowDrop() {
			//      const tbody = document.querySelector(".el-table__body-wrapper tbody");
			//      const _this = this;
			//      Sortable.create(tbody, {
			//        onEnd({ newIndex, oldIndex }) {
			//          const currRow = _this.tableData.splice(oldIndex, 1)[0];
			//          _this.tableData.splice(newIndex, 0, currRow);
			//        }
			//      });
			//    },
			// 列拖拽
			columnDrop() {
				
				let wrapperTr = document.querySelector('.el-table__header-wrapper tr')
				console.log(wrapperTr)
				this.sortable = Sortable.create(wrapperTr, {
					animation: 180,
					delay: 0,
					onEnd: evt => {
						console.log(evt)
						let clone = _.cloneDeep(this.tableHeard);//深拷贝
						
						this.tableHeard = [];//自定义列需要设置空数据，否则会乱
						
						let oldItem = clone[evt.oldIndex];
						
						clone.splice(evt.oldIndex, 1);
						
						clone.splice(evt.newIndex, 0, oldItem);
					
						this.$nextTick(() => {
							this.tableHeard = clone;
						})
					}
				})
			}

		},
		components: {
			pagination,
			datePicker
		},
		mounted() {

			this.columnDrop();
			// this.rowDrop();
		}
	}
</script>

<style scoped lang="less">
	@import "@/styles/index";

	.comment-management {
		.artcleMegStyle();
	}
</style>
