<template>
	<div class="article-management">
		<div class="wrap">
			<div class="ob-list">
				<serachBox @search="searchSubmit" ref="serachBox">
					<template slot="batchDeletion">
						<el-button type="danger" @click="batchDeletion">批量删除</el-button>
					</template>
				</serachBox>
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
	import serachBox from './components/serachBox'
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
				multipleSelection: [],
				page: 1,
				number: 9,
				dataTotal: 0,
				loading: true
			}
		},
		methods: {
			searchSubmit(searchList) {//搜索提交 功能
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
					});
				}
				//加入防抖函数
				this.debounce(searchFun)();
			},
			handleEdit(index, row) {//点击修改文章事件，转跳到发布页面修改
				this.$router.push({
					name: 'PublishArticle',
					params: {
						id: row.id
					}
				})
			},
			handleDelete(index, row) {//单项文章删除
				this.deleteFun({id:row.id})
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
					this.$message.warning('没有选中任何选项');
				}
			},
			handleDown(index, row) {
				//opcode操作码，-1 是下架，1是重新发布
				let opcode = row.status == '已发布' ? -1 : 1;
				let mes = row.status == '已发布' ? '下架' : '重新发布'

				const downFun= () =>{
					artMegDownApi({
						id: row.id,
						opcode: opcode
					}).then((res) => {
						if (res.code == '200') {
							this.$refs['serachBox'].searchSubmit();//页面重新渲染
							
							this.$message.success(mes);//提示信息
						} else this.$message.warning(mes)
					});
				}
				
				//确认 发布和下架 提示框
				this.confirmMes(downFun,mes)();
			},
			
			handleSelectionChange(val) { //点击多选按钮
				this.multipleSelection = val;
			},
			getArtcleMgeData() { //获取页面的文章管理数据
				
				articleManagementApi({
					page: this.page,
					number: this.number,
				}).then((res) => {
					console.log(res)
					if(res.code=="-1"){
						this.$message.warning(res.mes);
						localStorage.removeItem('token');
						setTimeout(()=>{
							this.$router.push("/Login")
						},500)
					}else if(res.code=="200"){
						this.tableData = Object.values(res.data);
						this.dataTotal = parseInt(res.list) * this.number;
						this.loading = false;
					}
				}).catch((e) => {
					this.loading = false
				});
			},
			deleteFun(data){//删除功能
				const delfun=() => {
					this.loading = true;
					artMegDelApi(data).then((res) => {
						if (res.code == '200') {
							this.$refs['serachBox'].searchSubmit();
							this.$message.success('删除');//提示信息
						} else {
							this.$message.warning('删除');
						}
						this.loading = false;
					});
				}
				//确认删除提示框
				this.confirmMes(delfun,"删除该文章")();
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
			serachBox
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
