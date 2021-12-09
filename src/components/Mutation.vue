<template>
  <div class="content">
    <form v-if="category" v-on:submit.prevent="saveCategory" class="category-form">
      <h3>
        <span v-if="create">New</span>
        <span v-if="!create">Update {{getCategory}} </span> Category
      </h3>
      <input type="text" v-model="category.name" placeholder="Name" id="categoryName"/>
      <input type="file" name="" id="categoryImg" />
      <button type="submit">Save</button>
    </form>

    <form v-if="!category" v-on:submit.prevent="hola" class="device-form">
      <h3>
        <span v-if="create">New </span> <span v-if="!create">Update</span>Device
      </h3>
      <input
        type="text"
        v-model="category.name"
        placeholder="Name"
        id="deviceName"
      />
      <input
        type="text"
        v-model="category.description"
        placeholder="Description"
        id="deviceDescription"
      />
      <input
        type="number"
        v-model="category.price"
        placeholder="Price"
        id="devicePrice"
      />
      <input
        type="text"
        v-model="category.categoryName"
        placeholder="Category"
        id="deviceCategoryName"
      />
      <input type="file" name="" id="deviceImg" />
      <button type="submit">Save</button>
    </form>
  </div>
</template>



<script>
import gql from "graphql-tag";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

export default {
  name: "mutation",
  data: function () {
    return {
      create: localStorage.getItem("mutation") == "create",
      category: localStorage.getItem("type") == "category",
      getCategory: localStorage.getItem("categoryName"),
      category: {
        name: "",
        imagePath: "",
      },
      device: {
        name: "",
        imagePath: "",
        description: "",
        price: 0,
        categoryName: "",
      },
      storagePath: ""
    };
  },

  methods: {
    saveCategory: function(){
      if (this.create){
        this.createCategory();
      } else {
        this.updateCategory();
      }
    },
    createCategory: async function(){
      const name = document.getElementById("categoryName").value;
      const file = document.getElementById("categoryImg").files[0];
      this.category.imagePath = await this.uploadImage(file,name);
      await this.$apollo.mutate({
        mutation: gql`
            mutation CreateCategory($category: CategoryInput!) {
             createCategory(category: $category) {
              id
              name
              imagePath
            }
          }
        `,
        variables: {
          category: this.category
        }
      }).then((result) =>{
        alert(`La categoria ${result.data.createCategory.name} ha sido creada`);
        this.$emit("loadHome");
      }).catch((error)=>{
        alert(`Ha orurrido un error`)
        console.log(error)
      })
    },

    updateCategory: async function(){
      const name = document.getElementById("categoryName").value;
      const file = document.getElementById("categoryImg").files[0];
      this.category.imagePath = await this.uploadImage(file,name);
      await this.$apollo.mutate({
        mutation: gql`
          mutation UpdateCategory($category: CategoryInput!, $updateCategoryId: String!) {
            updateCategory(category: $category, id: $updateCategoryId) {
              name
           }
         }
         `,
        variables: {
          category: this.category,
          updateCategoryId: localStorage.getItem("categoryId")
        }
      }).then((result) =>{
        alert(`La categoria ${result.data.updateCategory.name} ha sido actualizada`);
        this.$emit("loadHome");
      }).catch((error)=>{
        alert(`Ha orurrido un error`)
        console.log(error)
      })
    },
    

    uploadImage: async function(file,name){
      if(file){
        const fileName = file.name;
        this.setStoragePath(name);
        const storage = getStorage();

        const storageRef = ref(
          storage,
          "resources/"+this.storagePath+fileName
        );
        alert("Subiendo imagen");
        await uploadBytes(storageRef, file);
        const fileURL = await getDownloadURL(storageRef);
        return fileURL
      }
      return "sinPath"
    },
    setStoragePath: function(name){
      //name corresponde al nombre del dispositivo o de la categoria
      if(this.category){
        this.storagePath = `${name}/logo/`
      } else {
        this.storagePath = `${getCategory}/${name}`
      }
    }
  },

 
};
</script>

<style scoped>
</style>
