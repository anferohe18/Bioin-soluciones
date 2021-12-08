<template>
  <div class="content">
		{{getDevice.name}}<br>
		{{getDevice.description}}<br>
		{{getDevice.price}}<br>
		{{getDevice.imagePath}}<br>
		{{getDevice.categoryName}}<br>
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
};
</script>

<style>
</style>
