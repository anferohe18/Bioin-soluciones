
Muestra las categorias disponibles
  - Smarttiva
  - Masimo
  - calentadores
Al seleccionar una categoria, se pasa al componente "Category.vue"

<template>
  <div class="categories">
    <div class="title">
      <h1>CATEGORIES</h1>
    </div>
    <div class="container_categories">
      <div
        id="categories__list"
        class="categorie"
        v-for="category in getAllCategories"
        :key="category.name"
      >
        <button @click="selectCategory(category.name, category.id)">
          <img v-bind:src="category.imagePath" />
          <p>{{ category.name }}</p>
        </button>
      </div>
      <div class="add_category">
        <button @click="addCategory">New</button>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: "Categories",
  data: function () {
    return {
      getAllCategories: [],
    };
  },

  apollo: {
    getAllCategories: {
      query: gql`
        query GetAllCategories($name: String) {
          getAllCategories(Name: $name) {
            id
            name
            imagePath
           }
        }
      `,
      variables(){
        name: null;
      }
    }
  },
  methods: {
    selectCategory: function (name, id) {
      localStorage.setItem("category", name);
      localStorage.setItem("categoryId", id);
      this.$emit("loadCategory", name);
    },
    addCategory: function(){
    localStorage.setItem("add", "categories")
    this.$emit("loadAdd")
    },

  },

};
</script>

<style scoped>
.categories {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.categories .title {
  text-align: center;
  color: #0a253a;
  font-size: 1.2em;
}

.container_categories {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: flex-start;
  justify-content: center;
}

.container_categories .categorie {
  width: 20%;
  height: 43%;
  margin: 0 8px;
  align-items: end;
}

.container_categories .categorie button {
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
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.categorie,
button {
  border-radius: 5px;
}

.categories button img {
  width: 5em;
  height: 7em;
  margin: 5px;
}

.categories button p {
  text-transform: capitalize;
  margin: 5px;
  color: white;
  font-weight: bold;
  font-size: 1.2em;
}

.categories button:hover {
  transform: scale(1.1);
  background: linear-gradient(#859b24, #5e700d);
}
</style>
