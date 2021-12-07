import gql from 'graphql-tag'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'


import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import LogIn from './components/LogIn.vue'
import SignUp from './components/SignUp.vue'
import Categories from './components/Categories.vue'
import Category from './components/Category.vue'
import Product from './components/Product.vue'
import ProductInfo from './components/ProductInfo.vue'
import Add from './components/Add.vue'


const routes = [
  {
    path: '/',
    name: 'root',
    component: App
  },
  {
    path: '/user/logIn',
    name: "logIn",
    component: LogIn
  },
  {
    path: '/user/signUp',
    name: "signUp",
    component: SignUp
  },
  {
    path: '/categories',
    name: "categories",
    component: Categories
  },
  {
    path: '/:category',
    name: "category",
    component: Category
  },
  {
    path: '/:category/:product',
    name: "product",
    component: Product
  },
  {
    path: '/:category/:product/:type',
    name: "productinfo",
    component: ProductInfo
  },
  {
    path: '/:type/add',
    name: "add",
    component: Add
  }
]



const router = createRouter({
  history: createWebHistory(),
  routes,
});

const apolloClient = new ApolloClient({
  link: createHttpLink({uri: "https://bioin-api-gateway.herokuapp.com/"}),
  cache: new InMemoryCache()
});

async function isAuth(){
  if(localStorage.getItem("token_access")===null || localStorage.getItem("token_refresh")===null){
    return false;
  }

  try{
    var result = await apolloClient.mutate({
      mutation: gql`
        mutation($refresh: String!){
          refreshToken(refresh: $refresh){
            access
          }
        }
      `,
      variables: {
        refresh: localStorage.getItem("token_refresh"),
      }
    })
    localStorage.setItem("token_access", result.data.refreshToken.access);
  }catch{
    localStorage.clear();
    alert("Session Expired");
    return false;
  }
}

router.beforeEach(async(to, from)=>{
  var is_auth = await isAuth();
  if(is_auth==to.meta.requiresAuth) return true
  if(is_auth) return {name: "home"}
  return {name: "logIn"};
})

export default router;
