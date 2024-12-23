<script>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
export default{
  components:{
    HelloWorld
  },
  data(){
    return{
      arrOpiniones:[],
      arrJuegosGlobal:[],
      arrLikesGlobal:[],
      apiConsumida: false,
      usuariosPermitidos:{
        nombre:'nombre',
        apellido:'apellido',
      },
      flagAutenticacion: false
    }
  },
  methods:{
    llenarArregloOpiniones(){
      console.log('funciona llenarArregloOpiniones');
      // insertamos un arreglo vacio
      this.arrOpiniones.push([]);
      // llenamos el arreglo de likes con ceros
      this.arrLikesGlobal.push(false);
    },
    notificarApiConsumida(unArreglo){
      console.log('La API fue consumida exitosamente');
      // insertamos un arreglo vacio
      this.apiConsumida = true;
      this.arrJuegosGlobal = unArreglo;
    },
    agregarOpinion(objOpinion){
      console.log('funciona agregarOpinion');
      console.log(objOpinion);
      this.arrOpiniones[objOpinion.idJuego].push(objOpinion);
    },
    eliminarOpinion(objIndices){
      let elementoEliminado = this.arrOpiniones[objIndices.indiceJuego].splice(objIndices.indiceOpinion,1);
      console.log(elementoEliminado);
      alert(`La opinion ${objIndices.indiceOpinion} del juego ${objIndices.indiceJuego} fue Eliminada =>: ${elementoEliminado[0].nombre} - ${elementoEliminado[0].opinion}`);
      
    },
    editarOpinion(objNuevaOpinion){
      console.log('Opinion para editar');
      console.log(objNuevaOpinion);
      
      this.arrOpiniones[objNuevaOpinion.indiceJuego][objNuevaOpinion.indiceOpinion] = objNuevaOpinion.nuevaOpinion;
      alert(`La nueva opinion es  =>: ${objNuevaOpinion.nuevaOpinion.nombre} - ${objNuevaOpinion.nuevaOpinion.opinion}`);
      
    },
    verificarAutenticacion(objAutenticacion){
      if(this.usuariosPermitidos.nombre == objAutenticacion.nombre && this.usuariosPermitidos.apellido == objAutenticacion.apellido ){
        this.flagAutenticacion = true;
      }
      else{
        this.flagAutenticacion=false;
      }
    },
    registrarLike(elIndice){
      console.log('Se ha registrado un like con indice: ', elIndice);
      let valorLike = !this.arrLikesGlobal[elIndice];
      this.arrLikesGlobal[elIndice] = valorLike;
    },
    cantidadArrOpiniones(){
      console.log(this.arrOpiniones.length);
      console.log(this.arrOpiniones);
    },
    cantidadArrLikes(){
      console.log(this.arrLikesGlobal.length);
      console.log(this.arrLikesGlobal);
    }
  }
}
</script>

<template>
  <div id="componenteAppVue">
        <header>
          <div class="logo">
            <img alt="Vue logo" src="@\assets\favicon.png" width="75" height="75" />
            <span>Games Opinion</span>
          </div>


          <div>
            <nav>
              <RouterLink to="/">Inicio</RouterLink> |
              <RouterLink to="/autenticacion">Autenticación</RouterLink> |
              <RouterLink to="/administracion">Administración</RouterLink>
            </nav>
          </div>
        </header>

        <div id="divRouterView">
            <RouterView v-slot="{Component}" 
              v-on:llenar-arreglo-opiniones="llenarArregloOpiniones"
              v-on:api-consumida="notificarApiConsumida"
              v-on:agregar-opinion="agregarOpinion"
              v-on:eliminar-opinion="eliminarOpinion"
              v-on:editar-opinion="editarOpinion"
              v-on:datos-autenticacion="verificarAutenticacion"
              v-on:like-enviado="registrarLike"
              v-bind:arrOpinionJuego ="arrOpiniones"
              v-bind:arregloLleno = "apiConsumida" 
              v-bind:arrJuegosRecibido = "arrJuegosGlobal"
              v-bind:estaRegistradoAutenticacion = "flagAutenticacion"
              v-bind:estaRegistradoJuegos = "flagAutenticacion"
              v-bind:estaRegistradoAdministracion = "flagAutenticacion"
              v-bind:arrJuegos = "arrJuegosGlobal"
              v-bind:arrLikes = "arrLikesGlobal">
                <transition name="router-anim">
                    <component v-bind:is="Component" />
                </transition>
            </RouterView>
        </div>

        
  </div>
</template>

<style scoped>
#componenteAppVue{
  background-color: white;
}
#divRouterView{
  background-color: white;
  margin: 2%;
  text-align: center;
}

header{
  display: flex;
  flex-direction: row;
  background-color: rgb(24, 24, 24);
  justify-content: space-between;
  align-items: center;
  padding: 0 56px;
}

.logo{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
}
.logo img{
  filter: invert(1);
}
.logo span{
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin: 0 !important;
  padding: 0;
}

.router-anim-enter-active{
  animation: coming 1s;
  animation-delay: 1s;
  opacity: 0;
}

.router-anim-leave-active{
  animation: going 1s;
}

@keyframes going {
  0%{
    transform: translateX(0);
  }
  100%{
    transform: translateX(-50px);
    opacity:0;
  }
}

@keyframes coming {
  from{
    transform: translateX(-50px);
    opacity: 0;
  }
  to{
    transform: translateX(0);
    opacity: 1;
  }
}

</style>
