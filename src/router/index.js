import Vue from 'vue'
import VueRouter from 'vue-router'
import Parent from '../views/Parent/Parent'

Vue.use(VueRouter)

const routes = [{
        path: '/login',
        name: 'login',
        meta: {
            title: '登录'
        },
        component: () =>
            import ('../views/Login/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        meta: {
            title: '注册'
        },
        component: () =>
            import ('../views/Register/Register.vue')
    },
    {
        path: '/',
        component: Parent,
        children: [{
            path: '',
            name: 'home',
            meta: {
                title: '首页'
            },
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
            meta: {
                title: '分页'
            },
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
            meta: {
                title: '标签页'
            },
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
            meta: {
                title: '图片上传'
            },
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
            meta: {
                title: '已发布'
            },
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
            meta: {
                title: '发布文章'
            },
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
            meta: {
                title: '统计'
            },
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
            meta: {
                title: '导出excel'
            },
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
            meta: {
                title: '退出'
            },
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
            meta: {
                title: '查看详情'
            },
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
            meta: {
                title: '编辑页'
            },
            component: () =>
                import ('../views/Details/Details.vue')
        }]
    },
    {
        path: '*',
        meta: {
            title: '404 Not Found'
        },
        component: () =>
            import ('../views/Error/Error.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    let users = sessionStorage.getItem('users')
    if (to.path === '/login' || to.path === '/register') {
        next()
    } else {
        users ? next() : next('/login')
    }
})
export default router