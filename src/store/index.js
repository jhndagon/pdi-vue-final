import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    images: [],
    imagesProcesing: [],
    image: null,
    image1: null,
    file: null
  },
  mutations: {
    addImage(state, evt) {
      const file = evt.target.files[0];
      const url = URL.createObjectURL(file);
      const content = {
        url,
        name: file.name,
        file: file
      }
      state.file = file;
      state.images.push(content)
    },
    imagenesProcesadas(state, imagenes) {
      state.imagesProcesing = imagenes
    },
    imagenesProcesada(state, data) {
      console.log("data ", data)
      let data1 = {
        url: data.url,
        name: ""
      }
      if (state.imagesProcesing[data.index] != undefined) {
        state.imagesProcesing[data.index] = data1
      } else {
        state.imagesProcesing.push(data1)
      }
    }
  },
  actions: {
    quitarCapas({ commit }) {
      const img = Object.assign([], this.state.images)
      commit('imagenesProcesadas', img)
    },
    processImageType1({ commit }, index) {
      let image = this.state.images[index].file
      let form = new FormData()
      form.append('file', image)

      fetch(process.env.VUE_APP_BACK_ROUTE + '/api/process/base',
        {
          method: 'post',
          body: form
        }
      )
      .then(response => response.json())
      .then(data => {
        
        let data1 = data.map(data1 => {
          let b64 = `data:${data1.type};base64,${data1.data}`
          let data = {
            url: b64,
            index
          }
          return data
        })
        commit('imagenesProcesadas', data1)
      })
      // .then(response => response.blob())
      // .then(function(myBlob) {

      //   // var objectURL = URL.createObjectURL(myBlob);
      //   // let data = {
      //   //   url: objectURL,
      //   //   index
      //   // }
      //   // commit('imagenesProcesada', data)
      // });


    }
  },
  modules: {
  }
})
