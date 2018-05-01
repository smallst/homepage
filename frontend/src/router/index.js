import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/components/HomePage';
import Profile from '@/components/Profile';
import Gallery from '@/components/Gallery';
import BlogList from '@/components/BlogList';
import Upload from '@/components/Upload';
import StoryMenu from '@/components/StoryMenu';
import Story from '@/components/Story';
import Blog from '@/components/Blog';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'homepage',
            component: HomePage
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile
        },
        {
            path: '/gallery',
            name: 'gallery',
            component: Gallery
        },
        {
            path: '/bloglist',
            name: 'bloglist',
            component: BlogList
        },
        {
            path: '/blog/:id',
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
            path:'/story',
            name:'story',
            component: Story
        },
        {
            path: '/upload',
            name: 'upload',
            component: Upload
        }
    ]
});
