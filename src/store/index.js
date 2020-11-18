import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    images: [],
    imagesProcesing: [],
    image: null
  },
  mutations: {
    addImage(state, evt){
      console.log(state)
      const file = evt.target.files[0];
      const url = URL.createObjectURL(file);
      const content = {
        url,
        name: file.name
      }
      state.images.push(content)
    },
    imagenesProcesadas(state, imagenes){
      state.imagesProcesing = imagenes
    }
  },
  actions: {
    quitarCapas({ commit }){
      const img = Object.assign([], this.state.images)
      commit('imagenesProcesadas', img)
    }
  },
  modules: {
  }
})
