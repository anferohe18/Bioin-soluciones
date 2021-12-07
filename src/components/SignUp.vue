<template>
  <div class="signUp_user">
    <div class="container_signUp_user">
      <h2>Sign Up</h2>
      <form v-on:submit.prevent="processSignUp">
        <input type="text" v-model="user.username" placeholder="Username" />
        <input type="password" v-model="user.password" placeholder="Password" />
        <input type="text" v-model="user.name" placeholder="Name" />
        <input type="email" v-model="user.email" placeholder="E-mail" />
        <button type="submit">Sign in</button>
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
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.signUp_user h2 {
  color: white;
  font-size: 2em;
  font-weight: bold;
  margin: 0.5em 0;
}

.signUp_user form {
  width: 70%;
}

.signUp_user input {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 1em;
  padding: 10px 20px;
  margin: 5px 0;
  font-size: 0.9em;
}

.signUp_user button {
  width: 100%;
  height: 40px;
  color: white;
  background-color: #859b24;
  border: 1px solid #859b24;
  border-radius: 50px;
  padding: 10px 25px;
  margin: 10px 0;
  font-size: 1em;
  font-weight: bold;
}

.signUp_user button:hover {
  background-color: #4d5c0d;
  cursor: pointer;
}

.signUp_user p {
  text-align: center;
  color: white;
  font-weight: bold;
  margin: 20px 0 50px 0;
}

.signUp_user p a {
  color: #859b24;
}
</style>