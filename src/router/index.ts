import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
// COMPONENTS
import Dashboard from '../views/Dashboard.vue'
import Entrepreneurs from '../views/Entrepreneurs.vue'
import FileManipulation from '../views/FileManipulation.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/entrepreneurs',
        name: 'Entrepreneurs',
        component: Entrepreneurs
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/manipulation',
        name: 'FileManipulation',
        component: FileManipulation
    },
]

const router = new VueRouter({
    routes
})

export default router
