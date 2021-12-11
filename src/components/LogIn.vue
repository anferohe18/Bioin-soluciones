<template>
<div class="logIn_user">
        <div class="container_logIn_user">
            <h2>Iniciar Sesión</h2>
            <form v-on:submit.prevent="processLogIn">
                <input type="text" v-model="user.username" placeholder="Usuario" />
                <br />
                <input type="password" v-model="user.password" placeholder="Contraseña" />
                <br />
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "LogIn",
  data: function () {
    //Necesaria para que se muestre la vista
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    processLogIn: async function () {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation ($credentials: CredentialsInput!) {
              logIn(credentials: $credentials) {
                refresh
                access
              }
            }
          `,
          variables: {
            credentials: this.user,
          },
        })
        .then((result) => {
          let dataLogIn = {
            username: this.user.username,
            token_access: result.data.logIn.access,
            token_refresh: result.data.logIn.refresh,
          };
          this.$emit("completedLogIn", dataLogIn);
        })
        .catch((error) => {
          alert("ERROR 401: Wrong username or email");
          console.log(error);
        });
    },
    emitSignUp: function () {
      this.$emit("loadSignUp");
    },
  },
};
</script>

<style scoped>
.logIn_user {
    margin: 0;
    padding: 0%;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.container_logIn_user {
    border: solid #5c1c1c;
    border-radius: 10px;
    width: 25%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px;
    -moz-box-shadow: 0 0 10px;
    -webkit-box-shadow: 0 0 10px;
    -o-box-shadow: 0 0 10px;
    
}
.logIn_user h2 {
    color: #5c1c1c;
}
.logIn_user form {
    width: 70%;
}
.logIn_user input {
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 20px;
    margin: 5px 0;
    border: 1px solid rgb(78, 0, 0);
    border-radius: 10px;

}
.logIn_user button {
    width: 100%;
    height: 40px;
    color: #ffffff;
    background-image: linear-gradient(180deg, #5c1c1c, #000);
    border: 1px solid #e5e7e9;
    border-radius: 10px;
    padding: 10px 25px;
    margin: 10px 0 25px 0;
    font-weight: bold;

}
.logIn_user button:hover {
    color: black;
    background: linear-gradient(180deg, rgb(180, 180, 180),rgb(17, 17, 17));
    border: 1px solid #000000;
    cursor: pointer;
}
.logIn_user button:active {
    transform: scale(0.95);
}
</style>
