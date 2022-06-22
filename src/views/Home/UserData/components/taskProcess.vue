<template>
	<div class="task-process">
		<div>
			<el-card :body-style="{ padding: '0px' ,height:'460px'}">
				<img src="@/assets/Task.png" class="image">
				<div style="padding: 14px;">
					<div class="bottom clearfix">
						<div class="progress-item">
							<span>当日发布量 -- <span style="color:#45c2df">10</span></span>
							<el-progress :percentage="30" color="#f56c6c"></el-progress>
						</div>
						<div class="progress-item">
							<span>当日浏览量 -- <span style="color:#45c2df">50000</span></span>
							<el-progress :percentage="86" color="#5cb87a"></el-progress>
						</div>
						<div class="progress-item">
							<span>近7天发布量 -- <span style="color:#45c2df">70</span></span>
							<el-progress :percentage="100" color="#f56c6c"></el-progress>
						</div>
						<div class="progress-item">
							<span>近7天浏览量 -- <span style="color:#45c2df">350000</span></span>
							<el-progress :percentage="100" color="#5cb87a"></el-progress>
						</div>
					</div>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'taskProcess', //任务进程
		data() {
			return {

			}
		},
		methods: {

		},
		components: {

		}
	}
</script>

<style scoped lang="less">

.task-process{
	.el-progress{
		margin: 5px 0;
	}
}
</style>
