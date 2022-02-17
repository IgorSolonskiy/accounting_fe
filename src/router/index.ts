import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        redirect: '/accounting_fe/manipulation'
    },
    {
        path: '/accounting_fe/entrepreneurs',
        name: 'Entrepreneurs',
        meta: {layout: "main-layout"},
        component: () => import("../views/Entrepreneurs.vue")
    },
    {
        path: '/accounting_fe/dashboard',
        name: 'Dashboard',
        meta: {layout: "main-layout"},
        component: () => import("../views/Dashboard.vue")
    },
    {
        path: '/accounting_fe/manipulation',
        name: 'FileManipulation',
        meta: {layout: "main-layout"},
        component: () => import("../views/FileManipulation.vue")
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/accounting_fe/manipulation'
    }
]

const router = new VueRouter({
    mode: "history",
    base: '/accounting_fe/',
    routes
})

export default router
