AQUI SE ENCUENTRA EL HEADER Y FOOTER, QUE SON GENERALES PARA LOS DEMAS COMPONENTES
<template>
  <html>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    </head>
    <body>
      <div id="app" class="app">
        <div class="header">
          <h1>SA<span>LES SHOW</span>PAD</h1>
          <!-- Change the src -->
          <img src="https://firebasestorage.googleapis.com/v0/b/bioin-soluciones-bucket.appspot.com/o/resources%2Fgeneral%2Fimagen-3-1.png?alt=media&token=36c9dbce-8ab6-479a-bccb-97b3ca09101d" />
        </div>

        <div class="main-component">
          <router-view
            v-on:completedLogIn="completedLogIn"
            v-on:completedSignUp="completedSignUp"
            v-on:loadCategory="loadCategory"
            v-on:loadProduct="loadProduct"
            v-on:loadProductInfo="loadProductInfo"
            v-on:loadSignUp="loadSignUp"
            v-on:loadAdd="loadAdd"
            v-on:loadHome="loadHome"

            v-on:loadDevice="loadDevice"
          ></router-view>
        </div>

        <div class="footer">
          <button v-if="is_auth" v-on:click="loadHome">
            <img src="https://firebasestorage.googleapis.com/v0/b/bioin-soluciones-bucket.appspot.com/o/resources%2Fgeneral%2FHome.png?alt=media&token=1223813c-031d-48c5-b905-74dee19d1a95" alt="" />
            <p>Home</p>
          </button>
          <button v-if="is_auth" v-on:click="logOut">
            <img src="https://firebasestorage.googleapis.com/v0/b/bioin-soluciones-bucket.appspot.com/o/resources%2Fgeneral%2FLogout.png?alt=media&token=6b8d3506-2657-4047-b7a5-32029b2e4b22" alt="" />
            <p>Log Out</p>
          </button>
          <button v-if="!is_auth" v-on:click="loadLogIn">
            <img src="https://firebasestorage.googleapis.com/v0/b/bioin-soluciones-bucket.appspot.com/o/resources%2Fgeneral%2FLogin.png?alt=media&token=ae70a240-40d2-4424-aa74-2041e8703635" alt="" />
            <p>Login</p>
          </button>
          <button v-if="!is_auth" v-on:click="loadSignUp">
            <img src="https://firebasestorage.googleapis.com/v0/b/bioin-soluciones-bucket.appspot.com/o/resources%2Fgeneral%2FSignup.png?alt=media&token=62e77714-5872-490a-b333-2869092f63a3" alt="" />
            <p>Sign Up</p>
          </button>
        </div>
      </div>
    </body>
  </html>
</template>


<script>
export default {
  name: "App",
  computed: {
    is_auth:{
      get: function(){
        return this.$route.meta.requiresAuth; //ojo
      },
      set: function(){

      }
    }
  },
  methods: {
    
    logOut: function () {
      localStorage.clear();
      alert("Logged Out");
      this.verifyAuth();
    },
    loadHome: function(){
      this.$router.push({name: "categories"})
    },
    loadLogIn: function () {
      this.$router.push({ name: "logIn" });
    },
    loadSignUp: function () {
      this.$router.push({ name: "signUp" });
    },
    loadCategory: function (categoryName) {
      this.$router.push({
        name: "category",
        params: {
          categoryName,
        },
      });
    },
    loadProduct: function (product, category) {
      this.$router.push({
        name: "product",
        params: {
          category: category,
          product: product,
        },
      });
    },
    loadProductInfo: function (category, product, type) {
      this.$router.push({
        name: "productinfo",
        params: {
          category: category,
          product: product,
          type: type,
        },
      });
    },
    loadAdd: function(){
      this.$router.push({
        name: "add",
        params : {
          type: localStorage.getItem("add")
        }
      })
    },
    completedLogIn: function (data) {
      //Almacenar aqui la variable is_admin cuando se implemente esta funcionalidad
      localStorage.setItem("isAuth", true);
      localStorage.setItem("username", data.username);
      localStorage.setItem("token_access", data.token_access);
      localStorage.setItem("token_refresh", data.token_refresh);
      alert("Autenticacion Exitosa");
      this.loadHome();
    },
    completedSignUp: function () {
      alert("Registro Exitoso");
      this.loadLogIn();
    },


    loadDevice: function(deviceName, categoryName){
      this.$router.push({
        name: "device",
        params: {
          categoryName,
          deviceName
        }
      })
    }
  },
 
};
</script>

<style>
body {
  margin: 0 0 0 0;
  font-family: 'Roboto', sans-serif;
}

.header {
  margin: 0%;
  padding: 0;
  width: 100%;
  height: 8vh;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c7c7c7;
  border-bottom: 1px solid #868686;
}

.header h1 {
  
  font-size: 2.5em;
  color: #0a253a;
  margin: 0 0.6em;
}

.header h1 span {
  color: #859b24;
}

.header img {
  width: 3.5em;
  height: 3.5em;
}

.footer {
  margin-top: 10px;
  padding: 0;
  width: 100%;
  height: 15vh;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c7c7c7;
  border-top: 1px solid #868686;
}

.footer button {
  background: linear-gradient(#859b24, #5e700d);
  width: 10%;
  height: 80%;
  margin: 0 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
  border: 2px solid #5e700d;
}

.footer button img {
  width: 3.5em;
  height: 3.5em;
  margin: 5px;
}

.footer button p {
  margin: 0;
  color: white;
  font-weight: bold;
}

.footer button:hover {
  transform: scale(1.1);
  background-color: #51610a;
}

.main-component {
  height: 68vh;
  margin: 0%;
  padding: 0%;
  overflow-y:scroll
}
</style>
