<template>
  <div class="logIn_user">
    <div class="container_logIn_user">
      <h2>Log In</h2>
      <form v-on:submit.prevent="processLogIn">
        <input type="text" v-model="user.username" placeholder="Username" />
        <input type="password" v-model="user.password" placeholder="Password" />
        <div class="remember_me">
          <input type="checkbox" class="checkbox" />
          <span>Remember me</span>
        </div>
        <button type="submit">Log In</button>
        <p>
          ¿New User? <a v-on:click="emitSignUp" href="">Create an account</a>
        </p>
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
  background: linear-gradient(
    #13456a,
    #124064,
    #103c5e,
    #0f3856,
    #0e3350,
    #0d2f4a,
    #0b2a42,
    #0c283e,
    #0a253a
  );
  border-radius: 5px;
  width: 30%;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logIn_user h2 {
  color: white;
  font-size: 2em;
  font-weight: bold;
  margin-top: 2em;
}

.logIn_user form {
  width: 70%;
}

.logIn_user input {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 1em;
  padding: 10px 20px;
  margin: 5px 0;
  font-size: 0.9em;
}

.logIn_user .remember_me {
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.logIn_user input[type="checkbox"] {
  width: 25px;
  height: 22px;
  cursor: pointer;
  margin: 10px 10px;
}

.logIn_user span {
  color: white;
  font-size: 1.05em;
  font-weight: bold;
}

.logIn_user button {
  width: 100%;
  height: 40px;
  color: white;
  background-color: #859b24;
  border: 1px solid #859b24;
  border-radius: 50px;
  padding: 10px 25px;
  margin: 5px 0;
  font-size: 1em;
  font-weight: bold;
}

.logIn_user button:hover {
  background-color: #4d5c0d;
  cursor: pointer;
}

.logIn_user p {
  text-align: center;
  color: white;
  font-weight: bold;
  margin: 20px 0 60px 0;
}

.logIn_user p a {
  color: #859b24;
}
</style>
