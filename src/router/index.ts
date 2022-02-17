import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/entrepreneurs',
        name: 'Entrepreneurs',
        meta:{layout:"main-layout"},
        component: () => import("../views/Entrepreneurs.vue")
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        meta:{layout:"main-layout"},
        component: () => import("../views/Dashboard.vue")
    },
    {
        path: '/manipulation',
        name: 'FileManipulation',
        meta:{layout:"main-layout"},
        component: () => import("../views/FileManipulation.vue")
    },
]

const router = new VueRouter({
    mode: "history",
    base: '/accounting_fe/',
    routes
})

export default router
