import Vue from 'vue'
import Router from 'vue-router'
import pos from '@/components/page/Post'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'pos',
        component: pos
    }]
})