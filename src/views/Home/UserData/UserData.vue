<template>
	<div class="user-data">
		<el-container>
			<el-header>
				<div class="type-item">
					<el-row :gutter="30">
						<el-col :span="6" v-for="(p,index) in cardPanel" :key="index">
							<el-card shadow="hover" body-style="padding:0">
								<div class="card-panel">
									<div class="card-panel-icon">
										<svg class="icon" aria-hidden="true">
											<use :xlink:href="p.icon"></use>
										</svg>
									</div>
									<div class="card-panel-text">
										<h3 class="title">{{p.name}}</h3>
										<h3 class="pageviews">{{p.number}}</h3>
									</div>
								</div>
							</el-card>
						</el-col>
					</el-row>
				</div>
			</el-header>
			<el-main>Main</el-main>
			<el-footer>Footer</el-footer>
		</el-container>

	</div>
</template>

<script>
	export default {
		name: 'UserData', //用户数据
		data() {
			return {
				cardPanel:[{
					name:'当日浏览量',
					number:'52550',
					icon:'#icon-yonghu',
				},
				{
					name:'评论信息',
					number:'12550',
					icon:'#icon-pinglun',
				},
				{
					name:'收入',
					number:'550',
					icon:'#icon-renminbi',
				},
				{
					name:'当日发布文章数量',
					number:'11',
					icon:'#icon-zuixinwenzhang_huaban',
				}]
			}
		},
		methods: {

		},
		components: {

		}
	}
</script>

<style scoped lang="less">
	@iconSize:3em;
	
	.type-item {
		margin-top: 20px;
		.icon {
			width: @iconSize;
			height: @iconSize;
		}
		.card-panel{
			display: flex;
			justify-content: space-around;
			align-items: center;
		}
		.pageviews{
			text-align: center;
			color:#666;
		}
		.card-panel-text{
			.title{
				text-align: center;
				color: #343434;
			}
		}
	}
</style>
