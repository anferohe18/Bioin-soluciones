Muestra los productos asociados a la categoria seleccionada en "Categories.vue"
(Ejemplo: al seleccionar 'calentadores')
	- CM-103
	- CM-105
	- CM-106
Al seleccionar un producto, se pasa al componente de "Product.vue"

<template>
  <div class="categorie">
    <div class="title">
      <h1>{{ category }}</h1>
    </div>
    <div class="container_categorie">
      <div
        id="categories__list"
        class="item"
        v-for="device in getDevicesByCategoryName"
        :key="device.name"
      >
        <button @click="selectDevice(device.id, device.name)">
          <!-- Change the src -->
          <img v-bind:src="device.imagePath" style="width: 100px"/>
          <p>{{ device.name }}</p>
        </button>

      </div>
      <button @click="addDevice">Add</button>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: "Category",
  data: function () {
    return {
      category: localStorage.getItem("categoryName"),
      getDevicesByCategoryName: [],
    };
  },

  apollo: {
    getDevicesByCategoryName: {
      query: gql`
        query GetDevicesByCategoryName($categoryName: String!) {
          getDevicesByCategoryName(categoryName: $categoryName) {
            id
            name
            description
            price
            imagePath
            categoryName
          }
        }
      `,
      variables() {
        return {
					categoryName: this.category
				}
      },
    },
  },
  methods: {
    selectDevice: function(deviceId, deviceName){
      localStorage.setItem("deviceId", deviceId)
      localStorage.setItem("deviceName", deviceName)
      localStorage.setItem("type","device")
      this.$emit("loadDevice", deviceId, localStorage.getItem("categoryName"));
    },
    addDevice: function(){
      localStorage.setItem("type","device")
      localStorage.setItem("mutation","create")
      this.$emit("loadMutation");
    }
  },
  created: function(){
    localStorage.setItem("type","category");
    this.$apollo.queries.getDevicesByCategoryName.refetch();
  }


};

</script>
<style scoped>

</style>
