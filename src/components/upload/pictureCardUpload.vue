<template>
	<div class="picture-card-upload">
		<el-upload action="#" list-type="picture-card" ref="pictureCard" :limit="1" :http-request="upLoadFun" :auto-upload="isAutoUpload" >
			<i slot="default" class="el-icon-plus"></i>
			<div slot="file" slot-scope="{file}">
				<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
				<span class="el-upload-list__item-actions">
					<span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
						<i class="el-icon-zoom-in"></i>
					</span>
					<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
						<i class="el-icon-download"></i>
					</span>
					<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
						<i class="el-icon-delete"></i>
					</span>
				</span>
			</div>
		</el-upload>
		<el-dialog :visible.sync="dialogVisible">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'pictureCardUpload',//文件缩略图上传
		data() {
			return {
				dialogImageUrl: '',
				dialogVisible: false,
				disabled: false
			}
		},
		methods: {
			handleRemove(file) {//点击删除
				let uploadFiles= this.$refs['pictureCard'].uploadFiles;
				let index = uploadFiles.indexOf(file);
				uploadFiles.splice(index, 1); //删除照片
			},
			handlePictureCardPreview(file) {//点击放大
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleDownload(file) {//点击下载
				console.log(file);
			},
			upLoadFun(res){//覆盖默认的上传行为，可以自定义上传的实现
				this.$emit('autoUploadFun',res);//调用父组件的上传方法
			},
			sumbitFile(){//点击上传
				this.$refs['pictureCard'].submit();
			}
		},
		props:{
			autoUploadFun:{//自定义上传方法
				type: Function
			},
			isAutoUpload:{//是否自动上传
				type:Boolean,
				default:false
			}
		}
	}
</script>

<style scoped lang="less">

</style>
