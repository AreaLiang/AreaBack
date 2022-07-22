/**
 * 日期转换
 * @param {Number} fmt [日期格式，YYYY-mm-dd HH:MM]
 * @param {Object} date [要转换的日期，如let date = new Date()]
 */
export function dateFormat(fmt, date) {
	let ret;
	const opt = {
		"Y+": date.getFullYear().toString(), // 年
		"m+": (date.getMonth() + 1).toString(), // 月
		"d+": date.getDate().toString(), // 日
		"H+": date.getHours().toString(), // 时
		"M+": date.getMinutes().toString(), // 分
		"S+": date.getSeconds().toString() // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		};
	};
	return fmt;
}

/**Start
 * 下载单个pdf文件
 * @param {String} url [文件链接]
 * @param {String} name [文件名字]
 */
export function fileLinkToStreamDownload(url, name) {
	let fileName = name;
	let reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~\/])+$/;
	if (!reg.test(url)) {
		throw new Error('传入参数不合法,不是标准的文件链接')
	} else {
		let xhr = new XMLHttpRequest()
		xhr.open('get', url, true)
		xhr.setRequestHeader('Content-Type', `application/pdf`)
		xhr.responseType = 'blob'
		let that = this
		xhr.onload = function() {
			if (this.status == 200) {
				//接受二进制文件流
				var blob = this.response
				downloadExportFile(blob, fileName)
			}
		}
		xhr.send()
	}
}

function downloadExportFile(blob, tagFileName) {
	let downloadElement = document.createElement('a')
	let href = blob
	if (typeof blob == 'string') {
		downloadElement.target = '_blank'
	} else {
		href = window.URL.createObjectURL(blob) //创建下载的链接
	}
	downloadElement.href = href
	downloadElement.download = tagFileName
	//下载后文件名
	document.body.appendChild(downloadElement)
	// 判断是否是 IE
	if (navigator.msSaveOrOpenBlob) {
		navigator.msSaveOrOpenBlob(blob, tagFileName)
	} else {
		downloadElement.click()
	}
	// downloadElement.click() //点击下载
	document.body.removeChild(downloadElement) //下载完成移除元素
	if (typeof blob != 'string') {
		window.URL.revokeObjectURL(href) //释放掉blob对象
	}
}
/*End*/

/**Start
 * 批量下载pdf文件并打包成一个zip文件
 * @param {Array} arr [多个pdf文件路径的数组]
 */
export function BatchPdfDownload(arr) {
	const zip = new JSZip()
	const cache = {}
	const promises = []
	arr.forEach(item => {
		const promise = getFile(item).then(data => {
			const arr_name = item.split('/') // 下载文件, 并存成ArrayBuffer对象
			const file_name = arr_name[arr_name.length - 1] // 获取文件名
			// .folder("name")这个是把文件放在一个文件夹，不需要可以删去
			zip.folder("证书文件夹").file(file_name, data, {
				binary: true
			}) // 逐个添加文件
			cache[file_name] = data
		})
		promises.push(promise)
	})
	Promise.all(promises).then(() => {
		zip.generateAsync({
			type: 'blob'
		}).then(content => {
			// 生成二进制流
			saveAs(content, '证书文件.zip') // 利用file-saver保存文件  自定义文件名
		})
	})
}

function getFile(url) {
	return new Promise((resolve, reject) => {
		let obj = {
			method: 'get',
			url,
			// responseType: 'blob'
			responseType: 'arraybuffer'
		}
		axios(obj).then(data => {
			resolve(data.data)
		})
		.catch(error => {
			reject(error.toString())
		})
	})
}
/*End*/