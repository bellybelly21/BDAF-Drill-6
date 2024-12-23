<script>
import { toHandlers } from 'vue';

export default{
    props:{
        arregloLleno: {
            type:Boolean,
            required: true
        },
        arrJuegosRecibido:{
            type:Array,
            required: true
        },
        estaRegistradoJuegos:{
            type:Boolean,
            required:true
        }

    },  
    data(){
        return{
            titulo:'Lista de juegos disponibles',
            arrJuegos:[],

            
        }
    },
    methods:{
        enviarOpinion(nombreJuego, unIndice){
            console.log('Nombre Juego Recibido: ', nombreJuego);
            console.log('indice: ', unIndice);
            let nombreCompuesto = `${unIndice}-${nombreJuego}`;
            this.$router.push(`/opinion/${nombreCompuesto}`);
           
        },
        enviarLike(unIndice){
            this.$emit('like-enviado', unIndice);
           
        }

    },
    created(){
        if(this.arregloLleno == false){
                    let url='https://api.rawg.io/api/games?key=014f8d3ee5a0482fb0d940ad79972016';
                    fetch(url)
                    .then((respuesta)=>{
                        // console.log(respuesta);
                        respuesta.json()
                        .then((objRespuesta)=>{
                            // console.log(objRespuesta);
                            // los juegos se encuentran en la propiedad results, y viene en formato array
                            // exploramos el array con un ciclo for
                            // console.log(objRespuesta.results);
                            for(let juego of objRespuesta.results){
                                // console.log(juego);
                                this.arrJuegos.push(juego);
                                this.$emit('llenar-arreglo-opiniones');

                            }
                            console.log('Recorrido de respuesta terminado');
                            console.log(this.arrJuegos);
                            this.$emit('api-consumida', this.arrJuegos);
                        })
                        .catch((errTransf)=>{
                            console.log('Error transformando a json la respuesta: ', errTransf);
                        });

                    })
                    .catch((error)=>{
                        console.log('Error consumiendo endpoint: ', error);
                    });
        }

    }
}

</script>

<template>
    <div id="divJuegos">
        <h1 v-html="titulo"></h1>
        <div class="contenedorFlex">
            <div class="contenidoFlex" v-for="(unJuego, index) in arrJuegosRecibido" v-bind:key="index">
                <figure class="contenedorImagen">
                    <img class="contenidoImagen" v-bind:src="unJuego.background_image" v-bind:alt="unJuego.slug" height="175px">
                </figure>
                <div class="content">
                    <h3 v-html="unJuego.name"></h3>
                <p>Rating: <span v-html="unJuego.rating"></span>⭐</p>
                <p>Released: <span v-html="unJuego.released"></span></p>

                    <div class="buttons">
                        <button class="btnOpinar" v-on:click="enviarOpinion(unJuego.name, index)">Opinar</button>
                        <button class="btnLike" v-if="estaRegistradoJuegos" v-on:click="enviarLike(index)">❤️</button>
                    </div>
                </div>



            </div>
        </div>
    </div>
</template>


<style scoped>
.contenedorFlex{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.contenidoFlex{
    width: 260px;
    margin:2%;
    background-color: white;
    border: 1px #bdbdbd solid;
    border-radius: 4px;
}

.contenedorImagen{
    max-width: auto;
}
.contenidoImagen{
    width:100%;
    object-fit: cover;
}

.btnOpinar{
    background-color: rgb(11, 11, 11);
    color:white;
    border-radius: 24px;
    border: none;
    padding: 4px 16px;
}

.btnLike{
    border: none;
    color: red;
}

#divJuegos{
    margin:2%;
}

#divJuegos h3, h1{
    color: black;
}

.contenedorFlex p{
    color: black;
}

.content{
    padding: 16px;
    display: flex;
    flex-direction: column;

}



</style>