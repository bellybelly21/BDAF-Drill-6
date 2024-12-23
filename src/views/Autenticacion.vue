<script>
export default{
    props:{
        estaRegistradoAutenticacion:{
            type:Boolean,
            required:true
        }
    },
    data(){
        return{
            titulo:'Autenticación',
            form:{
                nombre:'',
                apellido:''
            },
            mensaje:''
        }
    },
    methods:{
        atraparDatosAutenticacion(){
            console.log('emitimos datos de autenticacion al padre');
            alert('Vamos a enviar los datos al Padre');
            // creamos un objeto temporal para enviar al padre, de manera que podamos limpiar el formulario sin problemas
            let elNombre = this.form.nombre;
            let elApellido = this.form.apellido;
            let objTempAutenticacion={
                nombre: elNombre,
                apellido: elApellido
            }

            this.$emit('datos-autenticacion', objTempAutenticacion);
            this.form.nombre='';
            this.form.apellido='';
        }
    },
    computed:{
        estaAutenticado(){
            if(this.estaRegistradoAutenticacion){
                return 'EL USUARIO ESTÁ AUTENTICADO';
            }
            else{
                return 'el usuario NO ESTÁ autenticado';
            }
            
        }
    }
}
</script>

<template>
    <div id="divAutenticacion">
        <h1 v-html="titulo"></h1>
        <hr>
        <h2>{{ estaAutenticado }}</h2>
        <div class="container">
            <form>
                <div class="mb-3">
                    <label for="txtNombre" class="form-label">Nombre</label>
                    <input type="text" class="form-control" id="txtNombre" v-model="form.nombre">
                </div>
                <div class="mb-3">
                    <label for="txtApellido" class="form-label">Apellido</label>
                    <input type="text" class="form-control" id="txtApellido" v-model="form.apellido">
                </div>
                <button type="button" class="btn btn-dark" v-on:click="atraparDatosAutenticacion">Autenticar</button>
            </form>
        </div>

    </div>
</template>

<style scoped>
#divAutenticacion{
    width: 100%;
    color:black;
}
h2{
    color: white;
    background-color: rgb(0, 0, 0);
}
</style>