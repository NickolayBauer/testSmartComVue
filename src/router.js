import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Page404 from '@/components/Page404'
import Dashboard from '@/components/Dashboard'
import DataTable from '@/components/DataTable'


Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '*',
            name: 'Page404',
            component: Page404
        },
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard
        },
        {
            path: '/datatable/:table_name',
            name: 'DataTable',
            component: DataTable
        },
    ],
    scrollBehavior: function (to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash
            }
        }
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    },
})
