<template>
  <div>
    <b-row>
      <b-col sm="4" v-for="image in images" :key="image.id">
        <b-img :src="image.kmeans" fluid @click="showModal(image)"></b-img>
        <div class="mt-3">Nombre: {{ image.name }}</div>
      </b-col>
      <b-col> </b-col>
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
      <b-row align-v="center" style="min-height: 100vh">
        <b-col sm="10">
          <div style="position: relative; min-height: 90vh" fluid>
            <div style="position: absolute; left: 0; top: 0">
              <b-img :src="kmeans" fluid style="max-height: 90vh"></b-img>
            </div>
            <div style="position: absolute; left: 0; top: 0" v-if="c_active">
              <b-img :src="contours" fluid style="max-height: 90vh"></b-img>
            </div>
            <div style="position: absolute; left: 0; top: 0" v-if="cH_active">
              <b-img :src="convexHull" fluid style="max-height: 90vh"></b-img>
            </div>
            <div style="position: absolute; left: 0; top: 0" v-if="center_active">
              <b-img :src="centers" fluid style="max-height: 90vh"></b-img>
            </div>
          </div>
        </b-col>
        <b-col sm="2" class="h-100">
          <b-form-checkbox v-model="c_active" name="convex" switch>
            Contornos <b>(Checked: {{ c_active }})</b>
          </b-form-checkbox>
          <b-form-checkbox v-model="cH_active" name="convex" switch>
            convexHull <b>(Checked: {{ cH_active }})</b>
          </b-form-checkbox>
          <b-form-checkbox v-model="center_active" name="convex" switch>
            Imagen segmentada <b>(Checked: {{ center_active }})</b>
          </b-form-checkbox>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ProcesedImages",
  data() {
    return {
      contours: null,
      convexHull: null,
      centers: null,
      kmeans: null,
      c_active: false,
      cH_active: false,
      center_active: false,
      kmeans_active: false,
    };
  },
  props: {
    images: Array,
  },
  methods: {
    showModal(image) {
      this.$refs["my-modal"].show();
      this.contours = image.contours;
      this.convexHull = image.convexHull;
      this.centers = image.centers;
      this.kmeans = image.kmeans;
      this.c_active = image.c_active;
      this.cH_active = image.cH_active;
      this.center_active = image.center_active;
      this.kmeans_active = image.kmeans_active;
    },
  },
};
</script>
