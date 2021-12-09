
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
        <button @click="updateCategory(category.name, category.id)">Update</button>
        <button @click="deleteCategory(category.id)" >Delete</button>
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
        return {
          name: null
        }
      }
    }
  },
  methods: {
    selectCategory: function (categoryName, categoryId) {
      this.storageCategory(categoryName, categoryId);
      this.$emit("loadCategory", categoryName);
    },
    // addCategory: function(){
    // localStorage.setItem("add", "categories")
    // this.$emit("loadAdd")
    // },
    updateCategory: function(categoryName, categoryId){
      this.storageCategory(categoryName, categoryId);
      localStorage.setItem("mutation", "update")
      this.$emit("loadMutation")
    },
    deleteCategory: async function(categoryId){
      await this.$apollo.mutate({
        mutation: gql`
          mutation DeleteCategory($categoryId: String!){
            deleteCategory(categoryId: $categoryId){
              name
            }
          }
        `,
        variables: {
          categoryId: categoryId
        }
      }).then((result)=>{
        alert(`La categoria ${result.data.deleteCategory.name} ha sido eliminada`);
        this.$apollo.queries.getAllCategories.refetch();
      }).catch((error)=>{
        alert(error);
        console.log(error)
      })
    },
    addCategory: function(){
      this.storageCategory();
      localStorage.setItem("mutation", "create");
      this.$emit("loadMutation")
    },

    storageCategory: function(categoryName, categoryId){
      localStorage.setItem("categoryName", categoryName);
      localStorage.setItem("categoryId", categoryId);
      localStorage.setItem("type","category");
    }
  },
  created: function(){
    this.$apollo.queries.getAllCategories.refetch();
  }

};
</script>

<style scoped>

</style>
