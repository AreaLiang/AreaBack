/**
 * 防抖
 * @param {Function} fn [要执行方法]
 * @param {Number} delay [豪秒数，间隔多少秒才允许执行,默认500毫秒]
 * @param {Boolean} isImmediate [函数立刻执行,可能存在一些场景，须要在第一个字符输出时就进行一次调用]
 * 调用方法 (debounce(fn,delay,true))(x,y)，勾销性能 => (debounce(fn,delay).cancel)(x,y)
 */
let timer = null;
export function debounce(fn, delay = 500, isImmediate = false) {
	let isExcute = isImmediate;
	const _debounce = function(...args) {
		if (isExcute) { //判断是否需要第一次调用时候，立即执行
			fn.apply(this, args);
		} else {
			if (timer) clearTimeout(timer)
			timer = setTimeout(() => {
				fn.apply(this, args)
			}, delay);
		}
	};

	_debounce.cancel = function() { //勾销性能,还没执行就关闭窗口，得把勾销性能安顿上
		if (timer) clearTimeout(timer);
	}
	return _debounce;
};

/**
 * 节流
 * @param {Function} fn [要执行方法]
 * @param {Number} interval [豪秒数，规定在一个单位时间内，只能触发一次函数]
 * @param {Object} options [leading表示首次是否触发,trailing 是否只需要有一个定时器]
 * 调用方法 (debounce(fn,delay,true))(x,y)，勾销性能 => (debounce(fn,delay).cancel)(x,y)
 */

// 记录上一次的开始的时间
let lastTime = 0;
export function throttle(fn, interval = 1000, options = {
	leading: true,
	trailing: false
}) {
	const {
		leading,
		trailing
	} = options

	let timer = null;
	// 时间触发时，真正执行的函数
	const _throttle = function() {
		// 获取当前事件触发时的时间
		const nowTime = new Date().getTime();
		// 当最后的时候和当前时间相等的时候(第一次没有触发)
		if (!lastTime && !leading) lastTime = nowTime
		// 使用当前触发的时间和之前的时间间隔以及上一次开始的时间， 计算出还剩余多长事件需要去触发函数
		const remainTime = interval - (nowTime - lastTime)
		if (remainTime <= 0) {
			if (timer) {
				clearTimeout(timer);
				timer = null;
			}
			// 真正触发函数
			fn();
			// 保留上次触发的时间
			lastTime = nowTime;
			// 没有加定时器的时候直接return掉
			return;
		}
		// 只需要有一个定时器即可
		if (trailing && !timer) {
			timer = setTimeout(() => {
				timer = null;
				// 仅仅执行一次
				lastTime = !leading ? 0 : new Date().getTime();
				fn();
			}, remainTime);
		}
	}
	return _throttle
}

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
