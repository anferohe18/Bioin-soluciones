<template>
      <div class="description">
        <div style="width:30%;display:inline-block !important;">
            <img class="Description" v-bind:src="getDevice.imagePath" id="Device" />
        </div>

        <div
            class="container_description inline"
            style="width:60%;display:inline-block !important;"
        >
            <h2>{{getDevice.name}}</h2>
            <h4>Details</h4>
            <div>
                <p>
                    {{getDevice.description}}
                    <br />
                    <br /><b>Price:</b> $ {{getDevice.price}} COP
                </p>
            </div>
            <div>
                <button @click="updateDevice"><i class="bo fa-solid fa-pen-to-square"></i></button>
                <button @click="deleteDevice"><i class=" bo fa-solid fa-trash-can"></i></button>
            </div>
        </div>
    </div>
</template>
	
<script>
import gql from "graphql-tag";

export default {
  name: "Device",
  data: function () {
    return {
      getDevice: []
    };
  },
  apollo: {
    getDevice: {
      query: gql`
        query GetDevice($deviceName: String!) {
          getDevice(deviceName: $deviceName) {
						id
            name
            description
            price
            imagePath
            categoryName
          }
        }
      `,
			variables(){
				return{
					deviceName: localStorage.getItem("deviceName")
				}
			}
    },
  },
  methods: {
    updateDevice:  function(){
      localStorage.setItem("mutation", "update");
      this.$emit("loadMutation");
    },

    deleteDevice: async function(){
      await this.$apollo.mutate({
        mutation: gql`
          mutation DeleteDevice($deviceId: String!){
            deleteDevice(deviceId: $deviceId){
              name
            }
          }
        `,
        variables: {
          deviceId: localStorage.getItem("deviceId")
        }
      }).then((result)=>{
        alert(`El dispositivo ${result.data.deleteDevice.name} ha sido eliminado`);
        this.$emit("loadCategory", localStorage.getItem("categoryName"))
      }).catch((error)=>{
        alert("Ha ocurrido un error");
        console.log(error);
      })
    }
  }
};
</script>

<style>

@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css");

  .container_description {
    border: solid #5c1c1c;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    float: right;
    margin: 75px 40px 0px 0px;
}
.container_description h2 {
    color: #5c1c1c;
    text-align: center;
}
.container_description h4 {
    margin: 0px 15px 10px 15px;
    text-align: justify;
}
.container_description button {
    color: #ffffff;
    background-image: linear-gradient(180deg, #5c1c1c, #000);
    border: 1px solid #e5e7e9;
    border-radius: 5px;
    padding: 8px 15px;
    margin: 25px 0 5px 0;
    font-weight: bold;
}
.container_description div {
    display: flex;
    align-items: center;
    justify-content: center;
}
.container_description button:hover {
    cursor: pointer;
    color: #5c1c1c;
    background: white;
    border: 1px solid #000000;
}
.container_description p {
    margin: 0px 15px 10px 15px;
    text-align: justify;
}
.Description {
    width: 80%;
    margin: 66px 0px 0px 90px;
}
.inline {
    display: inline !important;
}
</style>
