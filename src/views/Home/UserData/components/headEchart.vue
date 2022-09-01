<template>
	<div class="echart-list">
		<div ref="chart" style="width: 100%;height: 400px;background-color: white;"></div>
	</div>
</template>

<script>
	export default {
		name: 'headEchart', //头部图表
		data() {
			return {
				chartList: [{
						name: '当日浏览量',
						data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
						series: [{
								name: '销量',
								type: 'line',
								data: [235, 180, 111, 210, 310, 320, 350],
								smooth: true
							},
							{
								name: 'UnionAds',
								type: 'line',
								stack: 'Total',
								data: [220, 182, 191, 234, 290, 330, 310]
							}
						]
					},
					{
						name: '评论信息',
						data: ['周一', '周二', '周三', '周四', '周五', '周六','周日'],
						series: [{
							name: '评论数',
							type: 'line',
							data: [15, 120, 136, 210, 310, 420],
							smooth: false
						}]
					},
					{
						name: '收入',
						data: ['周一', '周二', '周三', '周四', '周五', '周六','周日'],
						series: [{
							name: '人民币',
							type: 'line',
							data: [10, 11, 12, 13, 14, 10]
						}]
					},
					{
						name: '当天发布文章数量',
						data: ['周一', '周二', '周三', '周四', '周五', '周六','周日'],
						series: [{
							name: '发布量',
							type: 'line',
							data: [5, 4, 8, 5, 14, 10],
							smooth: true
						}]
					}
				]
			}
		},
		watch: {
			currentCardPanel() {
				//点击切换渲染图表
				this.initCharts(this.currentCardPanel);
			}
		},
		methods: {
			//渲染图表方法，i是数组的索引
			initCharts(i) {
				// 初始化图表，设置配置项
				var myChart = window.echarts.init(this.$refs.chart);
				myChart.clear(); //清除数据重新渲染
				myChart.setOption({
					title: {
						text: this.chartList[i].name,
						left: "2%",
						top: "3%",
					},
					legend: {
						show:true,
					},
					animationDuration: 2000,
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross'
						},
						padding: [5, 10],
						animationDuration: function(idx) {
							// 越往后的数据时长越大
							return idx * 100;
						}
					},

					xAxis: {
						data: this.chartList[i].data
					},
					yAxis: {},
					series: this.chartList[i].series
				});
			}
		},
		mounted() {
			//初始化图表
			this.initCharts(this.currentCardPanel);
			
			//当宽度变化时候，图标自适应跟着变化
			window.onresize=()=>{
				let chart=this.echarts.init(this.$refs.chart);
				chart.resize();
			}
		},
		components: {

		},
		props: ['currentCardPanel']
	}
</script>

<style scoped lang="less">

</style>
