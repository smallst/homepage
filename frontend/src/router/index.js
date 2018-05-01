import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/pages/HomePage';
import Gallery from '@/pages/Gallery';
import BlogList from '@/pages/BlogList';
import Blog from '@/pages/Blog';
import StoryMenu from '@/pages/StoryMenu';
import Story from '@/pages/Story';
import Profile from '@/pages/Profile';
import Upload from '@/pages/Upload';

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
            path:'/story/:number',
            name:'story',
            props: true,
            component: Story
        },
        {
            path: '/upload',
            name: 'upload',
            component: Upload
        }
    ]
});
