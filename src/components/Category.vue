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
        v-for="product in getDevicesByCategoryName"
        :key="product.name"
      >
        <button @click="selectDevice(product.name)">
          <!-- Change the src -->
          <img v-bind:src="product.imagePath" />
          <p>{{ product.name }}</p>
        </button>
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
					categoryName: localStorage.getItem("categoryName")
				}
      },
    },
  },
  methods: {
    selectDevice: function(deviceName){
      localStorage.setItem("deviceName", deviceName)
      this.$emit("loadDevice", deviceName, localStorage.getItem("categoryName"));
    },
    selectProduct: function (productName, id) {
      localStorage.setItem("productName", productName);
      localStorage.setItem("idProduct", id);
      const categoryName = localStorage.getItem("category");

      this.$emit("loadProduct", productName, categoryName);
    },
    addProduct: function () {
      localStorage.setItem("add", localStorage.getItem("category"));
      this.$emit("loadAdd");
    },
  },
  created: function(){

  }


};
//PENDIENTE TERMINAR EL SCRIPT
</script>
<style scoped>
.categorie {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.categorie .title {
  text-align: center;
  color: #0a253a;
  font-size: 1.2em;
  text-transform: capitalize;
}

.container_categorie {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: flex-start;
  justify-content: center;
}

.container_categorie .item {
  width: 20%;
  height: 35%;
  margin: 0 8px;
  align-items: end;
}

.container_categorie .item button {
  background: white;
  width: 100%;
  height: 100%;
  cursor: pointer;
  padding: 0;
}

.item,
button {
  border-radius: 5px;
}

.item button img {
  width: 5em;
  height: 7em;
  margin: 5px;
}

.item button p {
  text-transform: capitalize;
  margin: 5px 0;
  color: white;
  font-weight: bold;
  font-size: 1.2em;
  width: 100%;
  height: 20%;
  background: #0a253a;
  border-radius: 0 0 5px 5px;
  border: 1px solid #0a253a;
}

.item button:hover {
  transform: scale(1.1);
  background: linear-gradient(#859b24, #5e700d);
}
</style>
