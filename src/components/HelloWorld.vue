<template>
	<div class="hello">
		
		<div id="toolbar-container"></div>
		<div id="editor-container"></div>
	</div>
</template>

<script>
	import '@wangeditor/editor/dist/css/style.css'
	import {uploadApi} from '@/request/api'
	import {
		createEditor,
		createToolbar,
		IEditorConfig,
		IDomEditor
	} from '@wangeditor/editor'
	
	export default {
		name: 'HelloWorld',
		props: {
			msg: String
		},
		mounted() {
		
			// 编辑器配置
			const editorConfig = {
				MENU_CONF: {},
			}

			editorConfig.onChange = (editor) => {
				// 当编辑器选区、内容变化时，即触发
				console.log('content', editor.children)
				console.log('html', editor.getHtml())
			}

			// 修改 uploadImage 菜单配置
			editorConfig.MENU_CONF['uploadImage'] = {
				
				fieldName: 'custom-field-name',
				async customUpload(file, insertFn) {
					// file 即选中的文件
					// 自己实现上传，并得到图片 url alt href
					
					const formData = new FormData();
					
				
					formData.append('file', file);
						console.log(formData)
					uploadApi(formData).then((res)=>{
						console.log(res);
						let host='http://localhost:5000';
						let imgUrl=host+'\\' +res.filename;
						// 最后插入图片
						insertFn(imgUrl, 'imgUrl', 'imgUrl')
					})

					
				}
			}

			// 工具栏配置
			const toolbarConfig = {}

			// 创建编辑器
			const editor = createEditor({
				selector: '#editor-container',
				config: editorConfig,
				mode: 'default' // 或 'simple' 参考下文
			})
			// 创建工具栏
			const toolbar = createToolbar({
				editor,
				selector: '#toolbar-container',
				config: toolbarConfig,
				mode: 'default' // 或 'simple' 参考下文
			})

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.hello {
		background-color: white;
	}
</style>
