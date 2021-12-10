<template>
    <div class="signUp_user">
        <div class="container_signUp_user">
            <h2>Create an Account</h2>
            <form v-on:submit.prevent="processSignUp">
                <input type="text" v-model="user.username" placeholder="Username" />
                <br />
                <input type="password" v-model="user.password" placeholder="Password" />
                <br />
                <input type="text" v-model="user.name" placeholder="Name" />
                <br />
                <input type="email" v-model="user.email" placeholder="Email" />
                <button type="submit">Submit</button>
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
    border: solid #a26464;
    border-radius: 10px;
    width: 35%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.signUp_user h2 {
    color: #a26464;
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
    border: 1px solid #283747;
}
.signUp_user button {
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
.signUp_user button:hover {
    color: #e5e7e9;
    background: rgb(109, 64, 73);
    border: 1px solid #000000;
}
</style>