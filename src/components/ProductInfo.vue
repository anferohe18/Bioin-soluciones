Se muestra la seccion seleccionada en "Product.vue", la cual va relacionada
al producto, que se almacena en el localStorage del navegador.

Ejemplo completo (asumiendo que el dominio es www.bioin.com)
Supongamos que:
  -En Categories.vue (www.bioin.com/categories) se selecciona "calentadores"
  -En Category.vue (www.bioin.com/calentadores) se selecciona "CM-105"
  -En Product.vue (www.bioin.com/calentadores/CM-105) se selecciona "Documents"
En este contexto, el componente ProductInfo.vue se vera nutrido con todos los documentos
asociados a CM-105, el cual pertenece a la categoria de calentadores

<template>
  <div class="info">
    <div class="title">
      <h1>{{ type }}</h1>
    </div>
    <div class="container_table_info">
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="file in files" :key="file.name">
            <td class="icon">
              <img v-bind:src="iconPath" alt=""/>
            </td>
            <td>
              <a v-bind:href="file.path" target="blank">{{ file.name }}</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="post_file">

      <form v-on:submit.prevent="saveFile">
        <input type="text" placeholder="File Name" class="filename" id="file_name"/>
        <input type="file" id="file" />
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  name: "ProductInfo",
  data: function () {
    return {
      type: "",
      files: [],
      file: {
        name: "",
        path: "",
        idProduct: "",
      },
      iconPath: ""
    };
  },
  methods: {
    verifyToken: function () {
      return axios
        .post(
          "https://bioin-soluciones-be.herokuapp.com/refresh/",
          { refresh: localStorage.getItem("token_refresh") },
          { headers: {} }
        )
        .then((result) => {
          localStorage.setItem("token_access", result.data.access);
        })
        .catch(() => {
          this.$emit("logOut");
        });
    },

    getItems: async function () {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logout");
        return;
      }
      await this.verifyToken();

      let categoryName = localStorage.getItem("category");
      let productName = localStorage.getItem("product");
      let typeName = localStorage.getItem("type");

      let result = await axios
        .get(
          `https://bioin-soluciones-be.herokuapp.com/${categoryName}/${productName}/${typeName}/`,
          { headers: {} }
        )
        .catch((error) => {
          alert(error);
        });
      this.files = result.data.data;
    },

    uploadFile: async function (id) {
      const file = document.getElementById(id).files[0]
      const file_name = document.getElementById("file_name").value
      const storage = getStorage();
      if (file) {
        const storageRef = ref(
          storage,
          "resources/" +
            localStorage.getItem("category") +
            "/" +
            localStorage.getItem("product") +
            "/" +
            file_name
        );
        alert("Subiendo archivo\nPor favor espere un momento")
        await uploadBytes(storageRef, file);
        const fileURL = await getDownloadURL(storageRef);
        return fileURL;
      }
    },
    saveFile: async function () {
      const filePath = await this.uploadFile("file").catch(error=>{console.log(error)});
      this.file.name = document.getElementById("file_name").value;
      this.file.path = filePath;
      this.file.idProduct = localStorage.getItem("idProduct");
      console.log(this.file.name);
      console.log(this.file.path);
      console.log(this.file.idProduct)
      axios
        .post(
          `https://bioin-soluciones-be.herokuapp.com/upload/${localStorage.getItem("type")}/`,
          this.file,
          { headers: {} }
        )
        .then(() => {
          alert(`El archivo ${this.file.name} ha sido subido`);
        })
        .catch((error) => {
          alert(error);
        });
      this.getItems();
    },
  },
  created: function () {
    this.type = localStorage.getItem("type").toUpperCase();
    this.iconPath = localStorage.getItem("fileIconPath")
    this.getItems();
  },

  thanks: function(){
    console.log("Gracias por su atencion :')")
  }


};
</script>

<style scoped>
.info {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 5px;
}

.info .title {
  margin: 0;
  padding: 0;
  text-align: center;
  color: #0a253a;
  font-size: 1.2em;
  text-transform: capitalize;
}

.container_table_info {
  margin: 0;
  padding: 0;
}

.table {
  border-collapse: collapse;
  margin: 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.table thead tr {
  background-color: #0a253a;
  color: #ffffff;
  text-align: left;
}

.table th,
.table td {
  padding: 12px 15px;
}

.table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.icon {
  text-align: center;
}

img {
  width: 1.1em;
  height: 1.1em;
  background-color: #0a253a;
  padding: 3px;
  border-radius: 5px;
}

th:first-of-type {
  border-top-left-radius: 10px;
}

th:last-of-type {
  border-top-right-radius: 10px;
}

.table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.table tbody tr:last-of-type {
  border-bottom: 2px solid #0a253a;
}

.post_file {
  border: 2px solid #0a253a;
  padding: 10px;
  margin: 1em 0;
  border-radius: 10px;
}

.post_file input,
.post_file button {
  margin: 2px 5px;
  font-size: 0.9em;
  font-family: sans-serif;
  border-color: #0a253a;
}

.post_file button,
.post_file input[type="text"] {
  border-radius: 5px;
  font-style: italic;
}

.post_file button {
  padding: 1em 1.5em;
  background: #0a253a;
  color: white;
  cursor: pointer;
}

.post_file button:active {
  transform: scale(0.9);
}
</style>