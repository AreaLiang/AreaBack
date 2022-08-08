import Vue from 'vue'
import App from './App.vue'

//引入axios
import axios from 'axios'
Vue.prototype.axios = axios

//引入router
import VueRouter from 'vue-router'
import router from '@/router'
Vue.use(VueRouter)

//引用 element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入vuex 状态管理模式
import store from '@/store'

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
Vue.prototype.echarts = echarts

//引入全局的函数
import base from '@/utils/base.js'
Vue.use(base);

//引入权限表
import permission from './permission'

//引入 自定义指令
import './utils/customDirective'

// 引入柱状图图表，图表后缀都为 Chart
import {
	BarChart,
	LineChart,
	PieChart
} from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
	TitleComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	TransformComponent,
	LegendComponent
} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import {
	LabelLayout,
	UniversalTransition
} from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {
	CanvasRenderer
} from 'echarts/renderers';

// 注册必须的组件
echarts.use([
	TitleComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	TransformComponent,
	BarChart,
	LineChart,
	PieChart,
	LabelLayout,
	UniversalTransition,
	CanvasRenderer,
	LegendComponent
]);

Vue.config.productionTip = false

new Vue({
	render: h => h(App),
	router: router,
	store,
	beforeCreate() {
		Vue.prototype.$bus = this
	}
}).$mount('#app')
