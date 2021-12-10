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

      </div>
    </div>
    <div class="add_category">
        <button @click="addDevice"><i class=" add fas fa-plus fa-3x"></i></button>
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
      this.$emit("loadMutation");
    }
  },
  created: function(){
    localStorage.setItem("type","category");
    this.$apollo.queries.getDevicesByCategoryName.refetch();
  }


};
//PENDIENTE TERMINAR EL SCRIPT
</script>
<style scoped>

@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css");

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
  width: 160px;
  height: 220px;
  margin: 0 8px;
  align-items: end;
}

.container_categorie .item button {
  background: #114358;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  cursor: pointer;
}

.item,
button {
  border-radius: 5px;
  
}

.categorie button img {
  width: 5em;
  height: 7em;
  margin: 8px;
}

.categorie button p {
  text-transform: capitalize;
  margin: 5px;
  color: white;
  font-weight: bold;
  font-size: 1.2em;
}

.categorie button:hover {
  transform: scale(1.1);
  background: #F2AA1F
}
.botones{
  display: inline-flex;
  margin-top: 13px;
  width: 80px;
  height: 35px;
  
}

.add_category button{
  margin:10px;
  padding: 5px;
  justify-content: center;
  background: #114358;
  color: white;
  box-shadow: 1.5px 1.5px 3px black;
}
</style>


