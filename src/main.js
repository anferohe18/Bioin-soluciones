import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import { setContext } from 'apollo-link-context'

//CONFIGURACION DE FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyAVXDUBYDKa2eeW4i-_HP07mVnFwpOnmWg",
    authDomain: "bioin-soluciones-bucket.firebaseapp.com",
    projectId: "bioin-soluciones-bucket",
    storageBucket: "bioin-soluciones-bucket.appspot.com",
    messagingSenderId: "107358040887",
    appId: "1:107358040887:web:8dfa4be64caf27985620b2",
    measurementId: "G-X820HMG1MY",
    storageBucket: "gs://bioin-soluciones-bucket.appspot.com/",
  };
  const firebaseApp = initializeApp(firebaseConfig);
  const storage = getStorage(firebaseApp);

//CONFIGURACION APOLLO
const httpLink = createHttpLink({
  uri: 'https://bioin-api-gateway.herokuapp.com/'
});

const authLink = setContext((_,{headers})=>{
  return {
    headers: {
      ... headers,
      "Authorization": localStorage.getItem("token_access") || ""
    }
  }
})

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const apolloProvider = new createApolloProvider({
  defaultClient: apolloClient
})



createApp(App).use(router, firebaseApp, storage).use(apolloProvider).mount('#app')