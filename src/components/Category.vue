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
          <img v-bind:src="device.imagePath" />
          <p>{{ device.name }}</p>
        </button>


        <!-- PENDIENTE PONER LO MISMOH -->
          <button>Update</button>
          <button>Delete</button>
      </div>
      <button @click="addProduct">Add</button>
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
      this.$emit("loadDevice", deviceId, localStorage.getItem("categoryName"));
    },
    // selectProduct: function (productName, id) {
    //   localStorage.setItem("productName", productName);
    //   localStorage.setItem("idProduct", id);
    //   const categoryName = localStorage.getItem("category");

    //   this.$emit("loadProduct", productName, categoryName);
    // },
    // addProduct: function () {
    //   localStorage.setItem("add", localStorage.getItem("category"));
    //   this.$emit("loadAdd");
    // },
  },
  created: function(){

  }


};
//PENDIENTE TERMINAR EL SCRIPT
</script>
<style scoped>

</style>
