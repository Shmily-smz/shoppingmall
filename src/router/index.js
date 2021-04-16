import vue from 'vue';
import Vuerouter from 'vue-router'

vue.use(Vuerouter)

const Home = () =>  import('../view/home/Home')
const Catgeory = () => import('../view/catgeory/Catgeory')
const Profile = () => import('../view/profile/Profile')
const Shopcart = () => import('../view/shopcart/Shopcart')
const Detial = () => import('../view/detial/Detial')

const routes = [{
  path: '',
  redirect: '/home'
},
{
    path:'/home',
    component:Home
},
{
    path:'/catgeory',
    component:Catgeory
},
{
    path:'/profile',
    component:Profile
},
{
    path:'/shopcart',
    component:Shopcart
},
{
  path:'/detial/:iid',
  component:Detial
}]

const router = new Vuerouter({
  routes,
  mode:'history'
})
export default router
