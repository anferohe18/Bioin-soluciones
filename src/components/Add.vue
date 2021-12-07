<template>
    <div class="conent">
        <form v-on:submit.prevent="saveCategory">
            <input v-model= "text" type="text" class="category_name" id="category_name" placeholder="Name"><br>
            <span>{{type}} Logo </span><input type="file" id="category_img"><br>

            
            <h1>{{text}}</h1>
            <h1>{{tempImgPath}}</h1>
            
        </form>
        <button @click="refreshImage">Refresh Image</button>
    </div>
</template>

<script>
    import axios from 'axios'
    import {getDownloadURL, getStorage,ref,uploadBytes} from 'firebase/storage'

    export default {
        name: "Add",

        data: function() {
            return {
                type: "",
                category: {
                    name: "",
                    imagePath: "",
                },
                product: {
                    name: "",
                    imagePath: "",
                    idCategory: ""
                },
                objectToSave: {},
                storagePath: "",
                text: "",
                tempImgPath: "",
 
            }
        },
        methods: {
            uploadImage: async function(){
                const file = document.getElementById("category_img").files[0]
                const file_name = document.getElementById("category_name").value
                this.setStoragePath(file_name)
                const storage = getStorage();
                if(file){
                    const storageRef = ref(
                        storage,
                        "resources/"+this.storagePath+file_name
                    );
                    alert("Subiendo la imagen\nPor favor espere");
                    await uploadBytes(storageRef, file);
                    const fileURL = await getDownloadURL(storageRef);
                    return fileURL;
                }
                return "https://firebasestorage.googleapis.com/v0/b/bioin-soluciones-bucket.appspot.com/o/resources%2Fgeneral%2FLogo%20BioIn.png?alt=media&token=b82292a2-1465-4715-82ff-0b67f35f5da7";
            },
            saveCategory: async function(){
               
                const imagePath = await this.uploadImage().catch(error=>{console.log(error)});
                const name = document.getElementById("category_name").value;
                if (this.type == "categories"){
                    this.category.name = name;
                    this.category.imagePath = imagePath; 
                    this.objectToSave = this.category;
                } else {
                    this.product.name = name;
                    this.product.imagePath = imagePath;
                    this.product.idCategory = localStorage.getItem("categoryId")
                    this.objectToSave = this.product
                }

                axios.post(
                    `https://bioin-soluciones-be.herokuapp.com/${localStorage.getItem("add")}/add/`,
                    this.objectToSave,
                    {headers: {}},
                ).then(()=>{alert(`${this.type} added`)}).catch(error=>{console.log(error)})
                if(this.type == "Category"){this.$emit("loadHome")}
                else{this.$emit("loadCategory", localStorage.getItem("category"))}
            },
            setStoragePath: function(name){
                if (localStorage.getItem("add") == "categories"){
                     this.storagePath = `${name}/logo/`;
                 }else{
                     this.storagePath = `${localStorage.getItem("category")}/${name}/`
                 }
            },
            refreshImage: function(){
                this.tempImgPath = document.getElementById("category_img").files[0]
                console.log(document.getElementById("category_img").fileURL)
            }

            
            
        },

    }

</script>
