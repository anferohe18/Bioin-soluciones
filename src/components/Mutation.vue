<template>
  <div class="content">
    <form v-if="isCategory" v-on:submit.prevent="saveCategory" class="category-form">
      <h3>
        <span v-if="create">New</span>
        <span v-if="!create">Update {{getCategory}} </span> Category
      </h3>
      <input type="text" v-model="category.name" placeholder="Name" id="categoryName"/>
      <input type="file" name="" id="categoryImg" />
      <button type="submit">Save</button>
    </form>

    <form v-if="!isCategory" v-on:submit.prevent="saveDevice" class="device-form">
      <h3>
        <span v-if="create">New </span> <span v-if="!create">Update</span>Device
      </h3>
      <input
        type="text"
        v-model="device.name"
        placeholder="Name"
        id="deviceName"
      />
      <input
        type="text"
        v-model="device.description"
        placeholder="Description"
        id="deviceDescription"
      />
      <input
        type="number"
        v-model="device.price"
        placeholder="Price"
        id="devicePrice"
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
  computed: {
    isCategory:{
      get: function(){
        return localStorage.getItem("type") == "category"
      },
      set: function(){}
    },
    create: {
      get: function(){
        return localStorage.getItem("mutation") == "create"   
      },
      set: function(){}
    }
  },
  data: function () {
    return {
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
        categoryName:"",
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
    saveDevice: function(){
      if(this.create){
        this.createDevice();
      } else {
        this.updateDevice();
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

    createDevice: async function(){
      const name = document.getElementById("deviceName").value;
      const file = document.getElementById("deviceImg").files[0];
      this.device.categoryName = localStorage.getItem("categoryName");
      this.device.imagePath = await this.uploadImage(file,name);
      await this.$apollo.mutate({
        mutation: gql`
          mutation CreateDevice($device: DeviceInput!){
            createDevice(device: $device){
              name
              categoryName
            }
          }
        `,
        variables: {
          device: this.device
        }
      }).then((result)=>{
        alert(`El dispositivo ${result.data.createDevice.name} ha sido creado`)
        this.$emit("loadCategory", result.data.createDevice.categoryName);
      }).catch((error)=>{
        alert('Ha ocurrido un error')
        console.log(error)
      })
    },

    updateDevice: async function(){
      const name = document.getElementById("deviceName").value;
      const file = document.getElementById("deviceImg").files[0];
      this.device.categoryName = localStorage.getItem("categoryName");
      this.device.imagePath = await this.uploadImage(file,name);
      await this.$apollo.mutate({
        mutation: gql`
          mutation UpdateDevice($updateDeviceId: String!, $device: DeviceInput!){
            updateDevice(id: $updateDeviceId, device: $device){
              name
              categoryName
            }
          }
        `,
        variables: {
          device: this.device,
          updateDeviceId:localStorage.getItem("deviceId")

        }
      }).then((result)=>{
        alert(`El dispositivo ${result.data.updateDevice.name} ha sido actualizado`)
        this.$emit("loadCategory", localStorage.getItem("categoryName"));
      }).catch((error)=>{
        alert("Ha ocurrido un error")
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
        this.storagePath = `${this.getCategory}/${name}`
      }
    }
  },

 
};
</script>

<style scoped>

</style>
