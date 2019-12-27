import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const User = ()=>import("@/views/User");
const Gallery = ()=>import("@/views/Gallery");
const BlogList = ()=>import("@/views/BlogList");
const Blog = ()=>import('@/views/Blog');
const StoryMenu = ()=>import("@/views/StoryMenu");
const Story = ()=>import("@/views/Story");
const Profile = ()=>import("@/views/Profile");
const Upload = ()=>import(/*webpackChunkName: 'group-auth'*/'@/views/Upload');
const Edit = ()=>import(/*webpackChunkName: 'group-auth'*/'@/views/Edit');


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homepage',
    component: Profile
  },
        {
            path:'/user/:initInfo',
            name: 'user',
            props: true,
            component: User,
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile
        },
        {
            path: '/gallery/:pId?',
            name: 'photo',
            props: true,
            component: Gallery
        },

        {
            path: '/bloglist',
            name: 'bloglist',
            component: BlogList
        },
        {
            path: '/blog/:id/:cId?',
            name: 'blog',
            props:true,
            component: Blog
        },
        {
            path:'/storymenu',
            name:'storymenu',
            component: StoryMenu
        },
        {
            path:'/story/:id/:cId?',
            name:'story',
            props: true,
            component: Story
        },
        {
            path: '/upload',
            name: 'upload',
            component: Upload
        },
        {
            path: '/edit/:type/:id',
            name: 'edit',
            props: true,
            component: Edit
        }
]

const router = new VueRouter({
  routes
})

export default router
