<template>
  <div>
    <b-row>
      <b-col sm="4" v-for="(image, index) in images" :key="image.id">
        <template v-if="image.isloading">
          <div
            style="
              position: absolute;
              top: 10px;
              left: 30px;
              color: white;
              vertical-align: middle;
            "
            class="bg-dark"
          >
            Procesando imagen <b-spinner small variant="success" style="ml-2"></b-spinner>
          </div>
          <b-img :src="image.url" fluid></b-img>
        </template>
        <template v-else>
          <div
            style="position: absolute; top: 10px; right: 20px"
            @click="deleteImage(image.index)"
          >
            <b-button variant="danger"
              ><b-button-close style="color: white"></b-button-close
            ></b-button>
          </div>
          <b-img
            :src="image.kmeans"
            fluid
            @click="showModal(image, originalImages[index])"
          ></b-img>
          <div class="mt-3">Nombre: {{ name }}</div>
        </template>
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
        <b-col sm="9">
          <div style="position: relative; min-height: 90vh" fluid>
            <div style="position: absolute; left: 0; top: 0" v-if="selected == 'A'">
              <b-img :src="originalImg.url" fluid style="max-height: 90vh"></b-img>
            </div>
            <div style="position: absolute; left: 0; top: 0" v-if="selected == 'B'">
              <b-img :src="kmeans" fluid style="max-height: 90vh"></b-img>
            </div>
            <div style="position: absolute; left: 0; top: 0" v-if="selected == 'C'">
              <b-img :src="colorSeg" fluid style="max-height: 90vh"></b-img>
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
        <b-col sm="3" class="h-100">
          <div>
            <b-form-group label="Selecciona un fondo">
              <b-form-radio v-model="selected" name="some-radios" value="A"
                >Imagen original</b-form-radio
              >
              <b-form-radio v-model="selected" name="some-radios" value="B"
                >Segmentación por color</b-form-radio
              >
              <b-form-radio v-model="selected" name="some-radios" value="C"
                >Segmentación por K-means</b-form-radio
              >
            </b-form-group>
          </div>
          <b-form-checkbox v-model="c_active" name="convex" switch>
            Contornos
          </b-form-checkbox>
          <b-form-checkbox v-model="cH_active" name="convex" switch>
            convexHull
          </b-form-checkbox>
          <b-form-checkbox v-model="center_active" name="convex" switch>
            Imagen segmentada
          </b-form-checkbox>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  name: "ProcesedImages",
  data() {
    return {
      contours: null,
      convexHull: null,
      colorSeg: null,
      centers: null,
      kmeans: null,
      c_active: false,
      cH_active: false,
      center_active: false,
      kmeans_active: false,
      selected: null,
      originalImg: null,
      name: null,
    };
  },
  props: {
    images: Array,
    originalImages: Array,
  },
  methods: {
    ...mapMutations(["deleteImage"]),
    showModal(image, originalImg) {
      this.$refs["my-modal"].show();
      this.contours = image.contours;
      this.convexHull = image.convexHull;
      this.centers = image.centers;
      this.kmeans = image.kmeans;
      this.colorSeg = image.colorSeg;
      this.c_active = image.c_active;
      this.cH_active = image.cH_active;
      this.center_active = image.center_active;
      this.kmeans_active = image.kmeans_active;
      this.name = image.name;
      this.selected = "A";
      this.originalImg = originalImg;
    },
  },
};
</script>
