<template>
<div class="logIn_user">
        <div class="container_logIn_user">
            <h2>Sign in</h2>
            <form v-on:submit.prevent="processLogIn">
                <input type="text" v-model="user.username" placeholder="Username" />
                <br />
                <input type="password" v-model="user.password" placeholder="Password" />
                <br />
                <button type="submit">Sign In</button>
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
    border: solid #a26464;
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
    color: #a26464;
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
    border: 1px solid #000000;
}
.logIn_user button {
    width: 100%;
    height: 40px;
    color: #ffffff;
    background-image: linear-gradient(180deg, #a26464, #000);
    border: 1px solid #e5e7e9;
    border-radius: 5px;
    padding: 10px 25px;
    margin: 5px 0 25px 0;
    font-weight: bold;
}
.logIn_user button:hover {
    color: #e5e7e9;
    background: rgb(109, 64, 73);
    border: 1px solid #000000;
    cursor: pointer;
}
.logIn_user button:active {
    transform: scale(0.95);
}
</style>
