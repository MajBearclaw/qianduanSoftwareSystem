import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '../components/Login'
import Regist from '../components/Regist'
import Search from '../components/search/Search'
import Write from '../components/write/Write'
import Index from '../components/index/index'
import Admin from '../components/admin/Admin'
import BlogListRecommend from '../components/blog/BlogListRecommend'
import BlogListFollow from '../components/blog/BlogListFollow'
import BlogListSearch from '../components/blog/BlogListSearch'
import BlogListSearch1 from '../components/blog/BlogListSearch1'
import UserSearch from '../components/user/UserSearch'
import Blog from '../components/blog/Blog'
import BlogListType from '../components/blog/BlogListType'
import MyFollowing from '../components/admin/myfollowing/MyFollowing'
import MyProfile from '../components/admin/myprofile/MyProfile'
import Author from '../components/author/author'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      redirect: '/index/blogList/listRecommend',
      children: [
        {
          path: '/index',
          name: 'Index',
          component: Index,
          children: [
            {
              path: 'blogList/listRecommend',
              name: 'BlogListRecommend',
              component: BlogListRecommend
            },
            {
              path: 'blogList/listFollow',
              name: 'BlogListFollow',
              component: BlogListFollow,
              meta: {
                requireAuth: true
              }
            },
            {
              path: 'blogList/:blogType',
              name: 'BlogListType',
              component: BlogListType
            },
            {
              path: 'blog/:blogNo',
              name: 'blog',
              component: Blog
            }
          ]
        },
        {
          path: '/search',
          name: 'Search',
          component: Search,
          children: [
            {
              path: 'listSearch/:input',
              name: 'BloglistSearch',
              component: BlogListSearch
            },
            {
              path: 'listSearch1/:input',
              name: 'BloglistSearch1',
              component: BlogListSearch1
            },
            {
              path: 'userSearch/:input',
              name: 'UserSearch',
              component: UserSearch
            }
          ]
        },
        {
          path: '/write',
          name: 'Write',
          component: Write,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/author/:auid',
          name: 'Author',
          component: Author
        },
        {
          path: '/admin',
          name: 'Admin',
          component: Admin,
          redirect: '/admin/myProfile',
          meta: {
            requireAuth: true
          },
          children: [
            {
              path: 'myFollowing',
              name: 'MyFollowing',
              component: MyFollowing,
              meta: {
                requireAuth: true
              }
            },
            {
              path: 'myProfile',
              name: 'MyProfile',
              component: MyProfile,
              meta: {
                requireAuth: true
              }
            },
            {
              path: 'myFavor',
              name: 'MyFavor',
              component: BlogListFollow,
              meta: {
                requireAuth: true
              }
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/regist',
      name: 'Regist',
      component: Regist
    }
  ]
})
