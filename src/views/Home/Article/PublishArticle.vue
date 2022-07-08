<template>
	<div class="publish-article">
		<div class="warp">
			<div class="ob-btn-list pu-style">
				<el-button type="primary" @click="publish('articleForm')">发表文章</el-button>
				<el-button type="primary" @click="testForm">测试文章</el-button>
			</div>
			<div class="components-container pu-style">
				<div>
					<el-form :model="article" ref="articleForm" :rules="rules">
						<el-form-item label="文章标题" prop="title">
							<el-input v-model="article.title"></el-input>
						</el-form-item>
					</el-form>
					<tinymce v-model="content" :height="400" />
				</div>
			</div>
			<div class="ph-list">
				<div class="ph-box">
					<p>手机端预览（375px * 667px）</p>
					<div class="phone-view pu-style" v-html="content"></div>
				</div>

				<div class="ph-box">
					<p>ipad预览（820px * 1180px）</p>
					<div class="ipad-view pu-style" v-html="content"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Tinymce from '@/components/Tinymce'
	import {
		publishArticleApi,
		queryArticleApi
	} from '@/request/api'

	import {throttle} from '@/utils'

	export default {
		name: 'PublishArticle', //发表文章
		data() {
			return {
				content: '',
				article: {
					title: ''
				},
				rules: {
					title: [{
						required: true,
						message: '请输入文章标题',
						trigger: 'blur'
					}],
				},
				rr:0
			}
		},
		methods: {
			publish(formName) {//发布文章
				this.$refs[formName].validate((valid) => {
					if (valid) {
						
						const publishFun=()=>{
							let date = new Date();
							let year = date.getFullYear();
							let mon = date.getMonth() + 1;
							let day = date.getDate();
							let hours = date.getHours();
							let seconds = date.getSeconds();
							let time = year + '-' + mon + '-' + day + ' ' + hours + ':' + seconds;
							
							publishArticleApi({//发布接口
								content: this.content,
								title:this.article.title,
								press:'迷彩虎',
								time:time
							}).then((res) => {
								console.log(res)
								if(res.code="200"){
									this.$message.success('发布')
								}else{
									this.$message.warning('发布')
								}
							});
						};
						
						this.confirmMes(publishFun,'发布文章')();//提示确认发布操作
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			testForm(){
				this.article.title="沈阳民办中学一学生苦读三年无法参加高考，因三年前学校违规录取致无学籍",
				this.content=`"<p>近日，辽宁省沈阳市有李姓家长反映，在高考期间发现，孩子的高考考生号竟然是学校给的假考生号，无法参加高考。更让家长愤怒的是，他们家孩子根本没有学籍且无法办理毕业证，更没有参加高考的资格，一切都是骗局。只因三年前民办中学沈阳市东兴高级中学违规录取小李，而小李一家对此一无所知。</p>
					<p>6月20日，上游新闻（报料邮箱：cnshangyou@163.com）记者采访了解到，校方负责人表示，当年涉事考生小李的中考分数未达到录取线，该校违规操作录取了。目前该校已受到主管部门处罚，该校2022年的招生计划已经全部取消。</p>
					<p><img src="https://p9.toutiaoimg.com/origin/tos-cn-i-tjoges91tu/T9Ih69NGvumb10?from=pc" alt="" /></p>
					<p>1月初小李曾参加辽宁高中学业水平考试。 图片来源：受访者供图</p>
					<p><strong>校方竟然提供假考生号</strong></p>
					<p>今年18岁的高三毕业生小李，就读于沈阳市东兴高级中学高三二班，和其他考生一样，对于未来的大学生活有着许多的憧憬。</p>
					<p>进入高三后，有关高考的报名、图像采集、指纹录入、文件签字等，相关流程全部按部就班完成，包括小李在内的考生都顺利拿到准考证。</p>
					<p>2022年3月中旬，小李报名参加辽宁省两所高校的提前招考，并上传了自己的相关信息，考试时间为5月19日。就在小李全力以赴备考时，5月11日，上述两所大学招办分别告诉小李，其资格审查无法通过，而未能通过审查的原因是小李的高考考生号有误。</p>
					<p><img src="https://p9.toutiaoimg.com/origin/tos-cn-i-tjoges91tu/T9Ih6AYAJYbpuk?from=pc" alt="" /></p>"`
			}
		},
		components: {
			Tinymce
		},
		mounted() {
			let articleId=this.$route.params.id;
			if(articleId){
				queryArticleApi({
					id:articleId
				}).then((res)=>{
					console.log("66",res)
					if(res.code=='200'){
						this.article.title=res.data.title;
						this.content=`"<p>近日，辽宁省沈阳市有李姓家长反映，在高考期间发现，孩子的高考考生号竟然是学校给的假考生号，无法参加高考。更让家长愤怒的是，他们家孩子根本没有学籍且无法办理毕业证，更没有参加高考的资格，一切都是骗局。只因三年前民办中学沈阳市东兴高级中学违规录取小李，而小李一家对此一无所知。</p>
							<p>6月20日，上游新闻（报料邮箱：cnshangyou@163.com）记者采访了解到，校方负责人表示，当年涉事考生小李的中考分数未达到录取线，该校违规操作录取了。目前该校已受到主管部门处罚，该校2022年的招生计划已经全部取消。</p>
							<p><img src="https://p9.toutiaoimg.com/origin/tos-cn-i-tjoges91tu/T9Ih69NGvumb10?from=pc" alt="" /></p>
							<p>1月初小李曾参加辽宁高中学业水平考试。 图片来源：受访者供图</p>
							<p><strong>校方竟然提供假考生号</strong></p>
							<p>今年18岁的高三毕业生小李，就读于沈阳市东兴高级中学高三二班，和其他考生一样，对于未来的大学生活有着许多的憧憬。</p>
							<p>进入高三后，有关高考的报名、图像采集、指纹录入、文件签字等，相关流程全部按部就班完成，包括小李在内的考生都顺利拿到准考证。</p>
							<p>2022年3月中旬，小李报名参加辽宁省两所高校的提前招考，并上传了自己的相关信息，考试时间为5月19日。就在小李全力以赴备考时，5月11日，上述两所大学招办分别告诉小李，其资格审查无法通过，而未能通过审查的原因是小李的高考考生号有误。</p>
							<p><img src="https://p9.toutiaoimg.com/origin/tos-cn-i-tjoges91tu/T9Ih6AYAJYbpuk?from=pc" alt="" /></p>"`
					}
				});
			}
		}
	}
</script>

<style scoped lang="less">
	.ph_style(@w, @h) {
		width: @w;
		height: @h;
		background-color: white;
		overflow: auto;
		padding: 0 10px;
		border: 1px solid #c5c5c5;
		box-shadow: 0 1px 2px rgba(137, 132, 132, 0.5);
	}

	.publish-article {
		overflow: auto;
		height: 100%;

		.warp {
			width: 98%;
			margin: 15px auto;
		}

		.pu-style {
			margin-top: 15px;
		}
	}

	.editor-content {
		margin-top: 20px;
	}

	.phone-view {
		.ph_style(375px, 667px)
	}

	.ph-box {
		overflow: hidden;
		width: fit-content;

		p {
			text-align: center;
		}
	}

	.ipad-view {
		.ph_style(820px, 1180px)
	}

	.ph-list {
		display: flex;
		justify-content: space-around;
	}
</style>
