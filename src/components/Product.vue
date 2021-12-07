Muestra las diferentes secciones asociadas a un producto especifico
Todos los productos muestran las mismas secciones, las cuales son:
  - Clinical evidence
  - Documents
  - Multimedia
Al seleccionar una de estas tres opciones, se pasa al componente
"ProductInfo.vue", el cual mostrará la seccion elegida (clinical_evidence,
documents o multimedia) del producto que se está consultando.

Nota: El componente de "ProductInfo.vue" es general tanto para evidencia clinica, 
como para documents y multimedia. Por esta razón no hay tres componentes diferentes
para cada una de estas secciones.

<template>
  <div class="info_product">
    <div class="title">
      <h1>{{ product }}</h1>
    </div>
    <div class="container_info_product">
      <div class="item">
        <button id="clinical_evidence" @click="selectItem($event)">
          <img
            v-bind:src="clinicalEvidenceIconPath"
          />
          <p>Clinical Evidence</p>
        </button>
      </div>
      <div div class="item">
        <button id="documents" @click="selectItem($event)">
          <img
            v-bind:src="documentsIconPath"
          />
          <p>Documents</p>
        </button>
      </div>
      <div div class="item">
        <button id="multimedia" @click="selectItem($event)">
          <img
            v-bind:src="multimediaIconPath"
          />
          <p>Multimedia</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Product",
  data: function () {
    return {
      product: "",
      documentsIconPath: "https://firebasestorage.googleapis.com/v0/b/bioin-soluciones-bucket.appspot.com/o/resources%2Fgeneral%2FDocuments.png?alt=media&token=22f34a08-d036-4e39-af93-39e1d1266be5",
      multimediaIconPath: "https://firebasestorage.googleapis.com/v0/b/bioin-soluciones-bucket.appspot.com/o/resources%2Fgeneral%2FMultimedia.png?alt=media&token=69ea8ec2-9d0c-41cd-9ebc-6568ab3f83ea",
      clinicalEvidenceIconPath: "https://firebasestorage.googleapis.com/v0/b/bioin-soluciones-bucket.appspot.com/o/resources%2Fgeneral%2FClinical_Evidence.png?alt=media&token=e0ae8c8a-9348-4a5c-b06a-2bbd2d807591"
    };
  },
  methods: {
    selectItem: function (event) {
      const id = event.currentTarget.id;
      const path = '#'+id+' img';
      const imagePath = document.querySelector(path).getAttribute("src")
      localStorage.setItem("type", id);
      localStorage.setItem("fileIconPath", imagePath);
      this.$emit(
        "loadProductInfo",
        localStorage.getItem("category"),
        localStorage.getItem("product"),
        id
      );
    },
  },
  created: function () {
    const product = localStorage.getItem("product").toUpperCase();
    this.product = product;
  },
};
</script>

<style scoped>
.info_product {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.info_product .title {
  text-align: center;
  color: #0a253a;
  font-size: 1.2em;
  text-transform: capitalize;
}

.container_info_product {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: flex-start;
  justify-content: center;
}

.container_info_product .item {
  width: 20%;
  height: 43%;
  margin: 0 8px;
  align-items: end;
}

.container_info_product .item button {
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
  margin: 5px;
  color: white;
  font-weight: bold;
  font-size: 1.2em;
}

.item button:hover {
  transform: scale(1.1);
  background: linear-gradient(#859b24, #5e700d);
}
</style>
