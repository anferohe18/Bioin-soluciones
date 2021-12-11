<template>
    <div class="signUp_user">
        <div class="container_signUp_user">
            <h2>Crear una Cuenta</h2>
            <form v-on:submit.prevent="processSignUp">
                <input type="text" v-model="user.username" placeholder="Usuario" />
                <br />
                <input type="password" v-model="user.password" placeholder="Contraseña" />
                <br />
                <input type="text" v-model="user.name" placeholder="Nombre" />
                <br />
                <input type="email" v-model="user.email" placeholder="Email" />
                <button type="submit">Registrarse</button>
            </form>
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag'
//Space in export default
export default {
  name: "SignUp",
  data: function () {
    return {
      user: {
        username: "",
        password: "",
        name: "",
        email: "",
      },
    };
  },
  methods: {
    processSignUp: async function () {
      await this.$apollo.mutate({
        mutation: gql`
          mutation($userInput: SignUpInput!){
            signUpUser(userInput:$userInput){
              refresh
              access
            }
          }
        `,
        variables: {
          userInput: this.user
        }
      }).then((result)=>{
        let dataLogin = {
          username: this.user.username,
          token_access: result.data.signUpUser.access,
          token_refresh: result.data.signUpUser.refresh
        };
        this.$emit("completedSignUp", dataLogin);
      }).catch((error)=>{
        alert("ERROR: Sign Up failed");
      });
    },
  },
};
</script>

<style scoped>
.signUp_user {
    margin: 0;
    padding: 0%;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.container_signUp_user {
    border: solid #5c1c1c;
    border-radius: 10px;
    width: 35%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px;
    -moz-box-shadow: 0 0 10px;
    -webkit-box-shadow: 0 0 10px;
    -o-box-shadow: 0 0 10px;
}
.signUp_user h2 {
    color: #5c1c1c;
}
.signUp_user form {
    width: 70%;
}
.signUp_user input {
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 20px;
    margin: 5px 0;
    border: 1px solid rgb(78, 0, 0);
    border-radius: 10px;
}
.signUp_user button {
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
.signUp_user button:hover {
    color: black;
    background: linear-gradient(180deg, rgb(180, 180, 180),rgb(17, 17, 17));
    border: 1px solid #000000;
    cursor: pointer;
}
.signUp_user button:active {
    transform: scale(0.95);
}
</style>