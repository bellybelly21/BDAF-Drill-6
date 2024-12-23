<script>
export default{
    props:{
        estaRegistradoAdministracion:{
            type:Boolean,
            required:true
        },
        arrLikes:{
            type:Array,
            required: true
        },
        arrJuegos:{
            type:Array,
            required: true
        }
    },
    data(){
        return{
            titulo:'Administración',
            arrNombreJuegos:[],
            cantidadCoins:0,
            claseCoins:'',
            claseColorBarra:''
        }
    },
    methods:{
        incrementarCoins(){
            if(this.cantidadCoins<100){
                        this.cantidadCoins= (this.cantidadCoins + 2);
                        console.log(this.cantidadCoins);
                        this.claseCoins = `width: ${this.cantidadCoins}%`;
                        console.log(this.claseCoins);
                        if(this.cantidadCoins<=20){
                            this.claseColorBarra='progress-bar bg-success';
                        }
                        else if(this.cantidadCoins>20 && this.cantidadCoins<=30){
                            this.claseColorBarra='progress-bar bg-warning';
                        }
                        else{
                            this.claseColorBarra='progress-bar bg-danger'; 
                        }
            }

        }
    },
    computed:{
        cantidadLikes(){
            let losLikes=0;
            for(let i=0; i<this.arrLikes.length; i++){
                if(this.arrLikes[i]==true){
                        losLikes=losLikes+1;
                        this.arrNombreJuegos.push(this.arrJuegos[i].name);
                }// fin if
            }// fin for
            return losLikes;
        }// fin cantidadLikes
    }
}
</script>
<template>
    <div id="divAdministracion">
        <h1 v-html="titulo"></h1>
        <div v-if="estaRegistradoAdministracion">
            <h1>Usted ha dado esta cantidad de likes: {{ cantidadLikes }}</h1>
            <ul>
                <li v-for="nombre in arrNombreJuegos">Le diste me gusta al Juego: {{ nombre }} </li>
            </ul>
                    <div id="divCompraCoins">
                        <p>¿Deseas Comprar Coins para los Juegos?</p>
                        <button class="btn btn-dark" v-on:click="incrementarCoins">Agregar Coins</button>
                        <hr>
                        <!--Progress Bar-->
                        <div class="progress" role="progressbar" aria-label="Basic example" v-bind:aria-valuenow="cantidadCoins" aria-valuemin="0" aria-valuemax="100">
                             <div v-bind:class="claseColorBarra" v-bind:style="claseCoins"></div>
                        </div>
                        <!--fin Progress Bar-->

                    </div>
        </div>
        <div v-else>
            <h1 class="noRegistrado">USTED NO ESTA REGISTRADO</h1>
        </div>
    </div>
</template>

<style scoped>
.registrado{
    color: rgb(0, 0, 0);
    background-color: rgb(51, 255, 0);
}
.noRegistrado{
    color: white;
    background-color: red;
}
#divAdministracion{
    color:black;
}
#divCompraCoins{
    background-color: rgb(169, 169, 169);
    color: black;
    margin: 2%;
}
</style>