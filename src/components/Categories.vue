
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
          <img v-bind:src="category.imagePath" style="width: 100px" />
          <p>{{ category.name }}</p>
          <div class="botones">        
            <button @click="updateCategory(category.name, category.id)"><i class="bo fa-solid fa-pen-to-square"></i></button>
            <button @click="deleteCategory(category.id)" ><i class=" bo fa-solid fa-trash-can"></i></button> 
          </div>     
        </button>

      </div>
    </div>
    <div class="add_category">
        <button @click="addCategory"><i class=" add fas fa-plus fa-3x"></i></button>
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
  width: 160px;
  height: 220px;
  margin: 0 8px;
  align-items: end;
}

.container_categories .categorie button {
  background: #114358;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  box-shadow: 1.5px 1.5px 3px black;
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
  text-transform: capitalize;
  margin: 5px;
  color: white;
  font-weight: bold;
  font-size: 1.2em;
}

.categories button:hover {
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
