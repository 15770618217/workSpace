import Vue from 'vue'
import VueRouter from 'vue-router'
import fullGasRecordSearch from '../view/fullGasRecordSearch.vue'
import sendGasRecordSearch from '../view/sendGasRecordSearch.vue'
import stickCodeRecord from '../view/stickCodeRecord.vue'
import customerInformation from '../view/customerInformation.vue'
import gasInformation from '../view/gasInformation.vue'
import workerInformation from '../view/workerInformation.vue'
import storeManagement from '../view/storeManagement.vue'
import AccountManagement from '../view/AccountManagement.vue'
import LogManagement from '../view/LogManagement.vue'
import gasFile from '../view/gasFile.vue'

Vue.use(VueRouter);

export default new VueRouter({
	routes: [
		{
			path:'/fullGasRecordSearch',
			name:'fullGasRecordSearch',
			component:fullGasRecordSearch
		},
		{
			path:'/sendGasRecordSearch',
			name: 'sendGasRecordSearch',
			component:sendGasRecordSearch
		},
		{
			path:'/stickCodeRecord',
			name: 'stickCodeRecord',
			component:stickCodeRecord
		},
		{
			path:'/customerInformation',
			name:'customerInformation',
			component:customerInformation
		},
		{
			path:'/gasInformation',
			name:'gasInformation',
			component:gasInformation
		},
		{
			path:'/workerInformation',
			name:'workerInformation',
			component:workerInformation
		},
		{
			path:'/storeManagement',
			name:'storeManagement',
			component:storeManagement
		},
		{
			path:'/AccountManagement',
			name:'AccountManagement',
			component:AccountManagement
		},
		{
			path:'/LogManagement',
			name:'LogManagement',
			component:LogManagement
		},
		{
			path: '/gasFile',
			name: 'gasFile',
			component: gasFile
		}
	]
});