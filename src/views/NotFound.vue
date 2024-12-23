<script>
export default{
    data(){
        return{
            titulo:'ERROR 404 - NOT FOUND - Ruta No encontrada'
        }
    }
}
</script>

<template>
    <div id="divNotFound">
        <h1 v-html="titulo"></h1>
    </div>
</template>

<style scoped>
#divNotFound{
    background-color: red;
    color: white;
}

</style>