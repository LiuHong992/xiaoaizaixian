import Vue from 'vue'
import VueRouter from 'vue-router'
import Parent from '../views/Parent/Parent'

Vue.use(VueRouter)

const routes = [{
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/Login/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () =>
            import ('../views/Register/Register.vue')
    },
    {
        path: '/',
        component: Parent,
        children: [{
            path: '',
            name: 'home',
            component: () =>
                import ('../views/Homepage/Home.vue')
        }]
    },
    {
        path: '/paging',
        component: Parent,
        children: [{
            path: '',
            name: 'paging',
            component: () =>
                import ('../views/Paging/Paging.vue')
        }]
    },
    {
        path: '/tab',
        component: Parent,
        children: [{
            path: '',
            name: 'tab',
            component: () =>
                import ('../views/Tab/Tab.vue')
        }]
    },
    {
        path: '/upload',
        component: Parent,
        children: [{
            path: '',
            name: 'upload',
            component: () =>
                import ('../views/Upload/Upload.vue')
        }]
    },
    {
        path: '/alreadypublished',
        component: Parent,
        children: [{
            path: '',
            name: 'alreadypublished',
            component: () =>
                import ('../views/Alreadypublished/Alreadypublished.vue')
        }]
    },
    {
        path: '/markdown',
        component: Parent,
        children: [{
            path: '',
            name: 'markdown',
            component: () =>
                import ('../views/Markdown/Markdown.vue')
        }]
    },
    {
        path: '/statistics',
        component: Parent,
        children: [{
            path: '',
            name: 'statistics',
            component: () =>
                import ('../views/Statistics/Statistics.vue')
        }]
    },
    {
        path: '/export',
        component: Parent,
        children: [{
            path: '',
            name: 'export',
            component: () =>
                import ('../views/Export/Export.vue')
        }]
    },
    {
        path: '/exit',
        component: Parent,
        children: [{
            path: '',
            name: 'exit',
            component: () =>
                import ('../views/Exit/Exit.vue')
        }]
    },
    {
        path: '/check',
        component: Parent,
        children: [{
            path: '',
            name: 'check',
            component: () =>
                import ('../views/Check/Check.vue')
        }]
    },
    {
        path: '/details',
        component: Parent,
        children: [{
            path: '',
            name: 'details',
            component: () =>
                import ('../views/Details/Details.vue')
        }]
    },
    {
        path: '*',
        component: () =>
            import ('../views/Error/Error.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router