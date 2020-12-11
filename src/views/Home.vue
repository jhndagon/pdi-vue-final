<template>
  <div>
    <!-- Styled -->
    <b-container>
      <!-- <button-actions></button-actions> -->
      <div class="mt-3">
        <upload-image></upload-image>
      </div>


      <show-images :images="images"></show-images>
      
      <div  v-if="imagesProcesing !== []">
        <h3>Imagenes procesadas</h3>
      </div>

      <procesed-images :images="imagesProcesing"></procesed-images>

    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

import UploadImage from "../components/UploadImage.vue";
import ButtonActions from '../components/ButtonActions.vue';
import ShowImages from '../components/ShowImages.vue';
import ProcesedImages from '../components/ProcesedImages.vue';


export default {
  name: "Home",
  components: { UploadImage,  ButtonActions, ShowImages, ProcesedImages },
  computed: {
    ...mapState(["images", "imagesProcesing"]),
  },
};
</script>
