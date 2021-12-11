AQUI SE ENCUENTRA EL HEADER Y FOOTER, QUE SON GENERALES PARA LOS DEMAS COMPONENTES
<template>

  <div id="app" class="app">
    <div class="header">
      <div>
        <!-- <img src="https://firebasestorage.googleapis.com/v0/b/bioin-soluciones-bucket.appspot.com/o/assets%2FBIOIN-SIN.png?alt=media&token=1de4bf6a-4b28-42f3-9b79-4a5298e1e2b3"/> -->
      </div>
      <nav>
        <button v-if="is_auth" v-on:click="loadHome">Categories</button>
        <button v-if="is_auth" v-on:click="logOut">Cerrar Sesión</button>
        <button v-if="!is_auth" v-on:click="loadLogIn">Iniciar Sesion</button>
        <button v-if="!is_auth" v-on:click="loadSignUp">Registrarse</button>
      </nav>
    </div>

    <div class="main-component">
      <div class="main-component">
          <router-view
            v-on:completedLogIn="completedLogIn"
            v-on:completedSignUp="completedSignUp"
            v-on:loadCategory="loadCategory"
            v-on:loadSignUp="loadSignUp"
            v-on:loadHome="loadHome"
            v-on:loadDevice="loadDevice"
            v-on:loadMutation="loadMutation"
          ></router-view>
        </div>
    </div>

    <div class="footer">
      <div></div>
      <div class="footer-links">
        <img src="https://firebasestorage.googleapis.com/v0/b/bioin-soluciones-bucket.appspot.com/o/assets%2FBIOIN-SIN.png?alt=media&token=1de4bf6a-4b28-42f3-9b79-4a5298e1e2b3" />

        <div id="Email">
          <span>Email</span>
        </div>
        <div id="Help">
          <span>Help</span>
        </div>
        <div id="Social_networks">
          <span>Social networks:</span>
        </div>
      </div>
      <div>
        <span>Todos los derechos reservados MINTIC 2022.</span>
      </div>
    </div>
  </div>
  
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
      this.loadLogIn();
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

    completedLogIn: function (data) {
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
    },
    loadMutation: function(){
      this.$router.push({
        name: "mutation",
        params: {
          name: localStorage.getItem("categoryName"),
          mutation: localStorage.getItem("mutation")
        }
      })
    }
  },
 
};
</script>

<style>
* {
font-family: 'Roboto', sans-serif;
}
body {
  margin: 0 0 0 0;
}
body {
  margin: 0 0 0 0;
}
.header {
  margin: 0%;
  padding: 0;
  width: 100%;
  height: 10vh;
  min-height: 100px;
  color: #e5e7e9;
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(180deg, #a26464, #000);
  align-items: center;
}
.header h1 {
  width: 20%;
  text-align: center;
}
.header nav {
  width: 100%;
  display: flex;
  justify-content: inherit;
  font-size: 20px;
  padding: 0px 30px;
}
.header nav button {
  background-image: linear-gradient(180deg, #a26464, #000);
  border: 1px solid #e5e7e9;
  color: #e5e7e9;
  border-radius: 10px;
  padding: 10px 20px;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
}
.header nav button:hover {
  color: #000000;
  background: #e5e7e9;
  border: 1px solid #e5e7e9;
  font-weight: bold;
}
.main-component {
  height: 67vh;
  margin: 0%;
  padding: 0%;
  background: #fdfefe;
}
.footer {
  width: 100%;
  height: 100%;
  min-height: 100px;
  background-image: linear-gradient(180deg, #a26464, #000);
  color: #e5e7e9;
}
.footer span {
  display: flex;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  width: 100%;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
  justify-content: center;
  align-items: center;
}

.footer-links {
  display: flex;
}

#Help {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  font-family: Segoe UI;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  color: rgba(255, 255, 255, 1);
  margin-top: 10px;
}

#help {
  fill: rgba(255, 255, 255, 1);
}
.help {
  overflow: visible;
  margin-top: 10px;
}
#Email {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  font-family: Segoe UI;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  color: rgba(255, 255, 255, 1);
  margin-top: 10px;
}

#email-solid {
  overflow: visible;
}
#Social_networks {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  text-align: left;
  font-family: Segoe UI;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  color: rgba(255, 255, 255, 1);
  margin-top: 10px;
}
#n_Todos_los_derechos_reservado {
  width: 100%;
  height: 100%;
  display: flex;
  text-align: bottom;
  white-space: nowrap;
  font-family: Segoe UI;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  color: rgba(255, 255, 255, 1);
}
.header img {
  max-height: 80%;
  min-height: 40%;
  width: 35%;
  margin-left: 20px;
}
.footer img {
  max-height: 40%;
  min-height: 40%;
  width: 11%;
  margin-left: 20px;
  margin-top: 10px;
}
</style>
