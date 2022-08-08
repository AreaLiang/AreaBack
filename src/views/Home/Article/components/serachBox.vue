<template>
	<div class="serach-box">
		<el-form :inline="true" :model="articleQueryForm" class="demo-form-inline">
			<el-form-item label="文章标题">
				<el-input v-model.trim="articleQueryForm.content" placeholder="请输入搜索内容"></el-input>
			</el-form-item>
			<el-form-item label="状态">
				<el-select v-model="articleQueryForm.statusType" :disabled="statustype | statusDisable">
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
				<el-button type="primary" @click="searchSubmit" v-throttle>查询</el-button>
				<slot name="batchDeletion"></slot>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import datePicker from '@/components/datePicker'
	export default {
		name: 'serachBox',
		data() {
			return {
				articleQueryForm: {
					content: "",
					statusType: this.statustype,
					articleType: 'all',
					dateRange: ''
				},
			}
		},
		filters:{
			statusDisable(val){
				if(val=='shz') return true;
			}
		},
		methods: {
			searchSubmit(){
				this.articleQueryForm.dateRange = this.$refs['datePicker'].dateRange;
				this.$emit('search',this.articleQueryForm);
			}
		},
		components: {
			datePicker
		},
		props:{
			statustype:{
				type:String,
				default:'all'
			}
		}
	}
</script>

<style scoped lang="less">

</style>
