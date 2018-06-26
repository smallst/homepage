import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/pages/HomePage';
import User from '@/pages/User';
import Gallery from '@/pages/Gallery';
import BlogList from '@/pages/BlogList';
import Blog from '@/pages/Blog';
import StoryMenu from '@/pages/StoryMenu';
import Story from '@/pages/Story';
import Profile from '@/pages/Profile';
import Upload from '@/pages/Upload';
import Edit from '@/pages/Edit';

Vue.use(Router);

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'homepage',
            // component: HomePage
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
});
