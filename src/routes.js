import ShowBlogs from './components/ShowBlogs.vue'
import SingleBlog from './components/SingleBlog.vue'
import ListBlog from './components/ListBlog.vue'
import ClassBlog from './components/ClassBlog.vue'
import Login from './components/Login.vue'
import Aside from './components/Aside.vue'
import Edit from './components/Edit.vue'
export default[
    {path:"/index",component:ShowBlogs},
    {path:"/list",component:ListBlog},
    {path:"/login",component:Login},
    {path:"/class",component:ClassBlog},
    {path:"/article/:id",component:SingleBlog},
    {path:"/aside",component:Aside},
    {path:"/edit",component:Edit},
]