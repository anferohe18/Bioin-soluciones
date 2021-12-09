<template>
  <div class="content">
		{{getDevice.name}}<br>
		{{getDevice.description}}<br>
		{{getDevice.price}}<br>
		{{getDevice.imagePath}}<br>
		{{getDevice.categoryName}}<br>
    <button @click="updateDevice">Update</button>
    <button @click="deleteDevice">Delete</button>
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
</style>
