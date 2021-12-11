
<template>
  <div class="categories">
    <div class="title">
      <h1>CATEGORÍAS</h1>
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
        <div class="botones">        
            <button @click="updateCategory(category.name, category.id)"><i class="bo fa-solid fa-pen-to-square"></i></button>
            <button @click="deleteCategory(category.id)" ><i class=" bo fa-solid fa-trash-can"></i></button> 
        </div>   

      </div>
    </div>
    <div class="add_category">
        <button v-on:click="addCategory"><i class=" add fas fa-plus fa-3x"></i></button>
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
      localStorage.setItem("categoryName", "category")
      localStorage.setItem("categoryId", "")  
      localStorage.setItem("mutation", "create");
      localStorage.setItem("type","category")
      this.$emit("loadMutation")
    },

    storageCategory: function(categoryName, categoryId){
      localStorage.setItem("categoryName", categoryName);
      localStorage.setItem("categoryId", categoryId)  
    }
  },
  created: function(){
    this.$apollo.queries.getAllCategories.refetch();
    
  }

};
</script>


<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css");
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
  color: #5c1c1c;
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
  width: 150px;
  height: 160px;
  margin: 0 8px;
  align-items: end;
}

.container_categories .categorie button {
  background: white;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  color:#5c1c1c;
  cursor: pointer;
  box-shadow: 0 0 10px;
    -moz-box-shadow: 0 0 10px;
    -webkit-box-shadow: 0 0 10px;
    -o-box-shadow: 0 0 10px;
  justify-content: center;
  align-content: center;
}

.container_categories .categorie button:hover {
  transform: scale(1.1);
  background: #5c1c1c;
  color: white;
}

.categorie,
button {
  border-radius: 5px;
  
}

.categories button img {
  width: 5em;
  height: 7em;
  margin: 8px;
}

.categories button p {
  text-transform: uppercase;
  margin: 5px;
  font-weight: bold;
  font-size: 1.2em;
}



.botones{
  display: inline-flex;
  margin-top: 13px;
  width: 80px;
  height: 35px;
  padding: 10px 36px;
}

.add_category button{
  margin:10px;
  padding: 5px;
  justify-content: center;
  background: #5c1c1c;
  color: white;
  box-shadow: 0 0 10px;
    -moz-box-shadow: 0 0 10px;
    -webkit-box-shadow: 0 0 10px;
    -o-box-shadow: 0 0 10px;
}
.add_category button:hover{
  cursor: pointer;
  background: white;
  color: #5c1c1c;
}
</style>
