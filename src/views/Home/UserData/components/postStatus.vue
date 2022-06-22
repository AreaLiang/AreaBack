<template>
	<div class="post-status">
		<el-table :data="tableData" height="460px" style="width: 100%" :header-cell-style="{'text-align':'center'}"
			:cell-style="{'text-align':'center'}">
			<el-table-column prop="id" label="文章ID">
			</el-table-column>
			<el-table-column prop="date" label="时间">
			</el-table-column>
			<el-table-column prop="status" label="状态">
				<template slot-scope="scope">
					<el-tag :type="scope.row.status === '审核中' ? 'primary' : 'success'" disable-transitions>
						{{scope.row.status}}</el-tag>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		name: 'postStatus',
		data() {
			return {
				tableData: [{
						date: '2016-05-02',
						id: 'xs64sdad6w12sad',
						status: '审核中'
					}, {
						date: '2016-05-02',
						id: 'xs64sdad6w14sad',
						status: '已发布'
					},
					{
						date: '2016-05-02',
						id: 'xs64sdad6w52sad',
						status: '已发布'
					},
					{
						date: '2016-05-02',
						id: 'xs64sdad6w82sad',
						status: '已发布'
					},
					{
						date: '2016-05-02',
						id: 'xs64sdad6w82sad',
						status: '已发布'
					},
					{
						date: '2016-05-02',
						id: 'xs64sdad6w82sad',
						status: '已发布'
					},
					{
						date: '2016-05-02',
						id: 'xs64sdad6w82sad',
						status: '已发布'
					},
					{
						date: '2016-05-02',
						id: 'xs64sdad6w82sad',
						status: '已发布'
					}
				]
			}
		},
		methods: {

		},
		components: {

		}
	}
</script>

<style scoped lang="less">

</style>
