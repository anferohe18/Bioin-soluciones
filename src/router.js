import gql from 'graphql-tag'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'


import { createRouter, createWebHistory } from 'vue-router'
import LogIn from './components/LogIn.vue'
import SignUp from './components/SignUp.vue'
import Categories from './components/Categories.vue'
import Category from './components/Category.vue'

import Device from './components/Device.vue'
import Mutation from './components/Mutation.vue'

const routes = [

  {
    path: '/user/logIn',
    name: "logIn",
    component: LogIn,
    meta: {requiresAuth: false}

  },
  {
    path: '/user/signUp',
    name: "signUp",
    component: SignUp,
    meta: {requiresAuth: false}

  },
  {
    path: '/categories',
    name: "categories",
    component: Categories,
    meta: {requiresAuth: true}

  },
  {
    path: '/:categoryName/devices',
    name: "category",
    component: Category,
    meta: {requiresAuth: true}

  },

  {
    path: '/:categoryName/:deviceName',
    name: "device",
    component: Device,
    meta: {requiresAuth: true}

  },
  {
    path: '/:name/:mutation',
    name: "mutation",
    component: Mutation,
    meta: {requiresAuth: true}
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
    return true;
  }catch{
    localStorage.clear();
    alert("Session Expired");
    return false;
  }
}

router.beforeEach(async(to, from)=>{
  var is_auth = await isAuth();
  if(is_auth==to.meta.requiresAuth) return true
  if(is_auth) return true
  return {name: "logIn"};
})

export default router;
