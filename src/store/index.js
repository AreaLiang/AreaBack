import Vuex from "vuex"
import Vue from 'vue'
import axios from 'axios'
// import {asyncRouter} from '@/router'
// import {navRouter} from '@/utils/permissionsTb'
// import {ckUserInfoApi} from "@/request/api"


const getters = {

}

const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
	// set './app.js' => 'app'
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
	const value = modulesFiles(modulePath)
	modules[moduleName] = value.default
	return modules
}, {})

Vue.use(Vuex)
export default new Vuex.Store({
	getters,
	modules
})
