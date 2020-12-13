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
    file: null,
    convex: true,
    contours: false,
    number: false
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
    modifyConvex(state, convex) {
      state.convex = convex
    },
    modifyContour(state, contour) {
      state.contours = contour
    },
    modifyNumber(state, number) {
      state.number = number
    },
    imagenesProcesadas(state, imagenes) {
      state.imagesProcesing.push(imagenes)
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
    quitarCapas({
      commit
    }) {
      const img = Object.assign([], this.state.images)
      commit('imagenesProcesadas', img)
    },
    processImageType1({
      commit
    }, index) {
      let image = this.state.images[index].file
      let form = new FormData()
      form.append('file', image)

      fetch(process.env.VUE_APP_BACK_ROUTE + '/api/process/type2', {
          method: 'post',
          body: form
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          const contours = `data:${data.contourns.type};base64,${data.contourns.data}`
          const convexHull = `data:${data.convexHull.type};base64,${data.convexHull.data}`
          const centers = `data:${data.centers.type};base64,${data.centers.data}`
          const kmeans = `data:${data.kmeans.type};base64,${data.kmeans.data}`
          const data1 = {
            contours,
            convexHull,
            centers,
            kmeans,
            index,
            c_active: false,
            cH_active: false,
            center_active: false,
            kmeans_active: false
          }
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
  modules: {}
})