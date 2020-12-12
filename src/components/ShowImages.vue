<template>
  <div>
    <b-row>
      <b-col sm="4" v-for="(image, index) in images" :key="image.id">
        <b-img :src="image.url" fluid @click="showModal(image)"></b-img>
        <div class="mt-3">Nombre: {{ image.name }}</div>
          <b-form-checkbox v-model="convex" name="convex" switch>
            Convex? <b>(Checked: {{ convex }})</b>
          </b-form-checkbox>
          <b-form-checkbox v-model="contours" name="contours" switch>
            Contours? <b>(Checked: {{ contours }})</b>
          </b-form-checkbox>
          <b-form-checkbox v-model="number" name="number" switch>
            Number? <b>(Checked: {{ number }})</b>
          </b-form-checkbox>
        <b-button variant="success" @click="processImageType1(index)">Procesar forma 1</b-button>
      </b-col>
      <b-col>
        
      </b-col>
    </b-row>

    <b-modal
      ref="my-modal"
      title="Show image"
      :hide-header="true"
      :hide-footer="true"
      :fluid="true"
      :center="true"
      size="xl"
    >
      <b-img :src="showImage" fluid></b-img>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {

  name: "ShowImages",
  data() {
    return {
      showImage: null,
    };
  },
  props: {
    images: Array,
  },
  computed:{
    convex: {
      get () {
        return this.$store.state.convex
      },
      set (value) {
        this.$store.commit('modifyConvex', value)
      }
    },
    contours: {
      get () {
        return this.$store.state.contours
      },
      set (value) {
        this.$store.commit('modifyContour', value)
      }
    },
    number: {
      get () {
        return this.$store.state.number
      },
      set (value) {
        this.$store.commit('modifyNumber', value)
      }
    },
  },
  methods: {
    ...mapActions([
      'processImageType1'
    ]),
    showModal(image) {
      this.$refs["my-modal"].show();
      this.showImage = image.url;
    },
  },
};
</script>