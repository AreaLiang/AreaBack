<template>
	<div class="check-original">
		<el-dialog :title="articleInfo.title" :visible.sync="originalDialogVisible" width="1000px" center :destroy-on-close="true">
			<div class="show-box">
				<el-row :gutter="20">
					<el-col :span="10">
						<div class="phone-view" v-html="articleInfo.content"></div>
					</el-col>
					<el-col :span="14">
						<div class="ipad-view" v-html="articleInfo.content"></div>
					</el-col>
				</el-row>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="originalDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="originalDialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'checkOriginal', //查看原文弹窗
		data() {
			return {
				originalDialogVisible: false
			}
		},
		methods: {

		},
		props: ['articleInfo']
	}
</script>

<style scoped lang="less">
	.ph_style(@w, @h) {
		width: @w;
		height: @h;
		background-color: white;
		overflow: auto;
		border: 1px solid #c5c5c5;
		box-shadow: 0 1px 2px rgba(137, 132, 132, 0.5);
	}

	.phone-view {
		.ph_style(375px,667px);
	}
	.ipad-view{
		.ph_style(100%,667px);
	}
</style>
