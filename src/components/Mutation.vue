<template>
    <div class="content">
    <div class="container_content" v-if="isCategory">
      <h3>
        <span v-if="create">Nueva Categoría</span>
        <span v-if="!create">Actualizar categoría {{ getCategory }}</span>
      </h3>
      <form
        
        v-on:submit.prevent="saveCategory"
        class="category-form"
      >
        <input
          type="text"
          v-model="category.name"
          placeholder="Name"
          id="categoryName"
        />

        <div class="image_file">
          <label><u>Subir Imágen:</u></label>
          <input type="file" name="" id="categoryImg" />
        </div>
        <button type="submit"><i class="fa fa-floppy-o"></i>Guardar</button>
      </form>
    </div>

    <div class="container_content" v-if="!isCategory">
      <h3>
        <span v-if="create">Nuevo Dispositivo</span>
        <span v-if="!create">Actualizar Dispositivo</span>
      </h3>
      <form
        
        v-on:submit.prevent="saveDevice"
        class="device-form"
      >
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
        <div class="image_file">
          <label><u>Subir Imágen:</u></label>
          <input type="file" name="" id="deviceImg" />
        </div>
        <button type="submit"><i class="fa fa-floppy-o"></i>Guardar</button>
      </form>
    </div>
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
  .content {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container_content {
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px;
  -moz-box-shadow: 0 0 10px;
  -webkit-box-shadow: 0 0 10px;
  -o-box-shadow: 0 0 10px;
  width: 40%;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container_content h3 span {
  color: #5c1c1c;
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 1em;
  text-align: center;
}

.container_content form {
  width: 80%;
}

.container_content input {
  height: 30px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid #5c1c1c;
  padding: 10px 20px;
  margin: 5px 0;
  font-size: 0.9em;
}

.container_content .image_file {
  padding: 5px;
  margin: 5px 2px;
  border: 1px solid #5c1c1c;
  border-radius: 10px;
}

.container_content .image_file label {
  color: #5c1c1c;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-style: italic;
  size: 0.8em;
  margin: 0;
  padding: 0;
}

.container_content .image_file input[type="file"] {
  border: none;
  color: #5c1c1c;
  width: 100%;
  font-style: italic;
  margin: 5px 30px;
  height: 50px;
}

.container_content input[type="file"]::file-selector-button {
  padding: 0.5em;
  border-radius: 5px;
  background-color: #5c1c1c;
  color: white;
  font-weight: bold;
  font-size: 1em;
  text-align: center;
}

.container_content input[type="file"]::file-selector-button:hover {
  background-color: white;
  color: #5c1c1c;
  cursor: pointer;
}

.container_content button {
  width: 40%;
  height: 40px;
  color: white;
  background-color: #5c1c1c;
  border: 2px solid rgb(78, 0, 0);
  border-radius: 10px;
  padding: 10px 25px;
  margin: 10px 8em;
  font-size: 1.1em;
  font-weight: bold;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.container_content button i {
  margin: 0 10px;
}

.container_content button:active {
  transform: scale(0.95);
}

.container_content button:hover {
  background-color: white;
  color: #5c1c1c;
  cursor: pointer;
}
</style>
