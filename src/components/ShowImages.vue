<template>
  <div>
    <b-row>
      <b-col sm="4" v-for="image in images" :key="image.id">
        <b-img :src="image.url" fluid @click="showModal(image)"></b-img>
        <div class="mt-3">Nombre: {{ image.name }}</div>
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
  methods: {
    showModal(image) {
      this.$refs["my-modal"].show();
      this.showImage = image.url;
    },
  },
};
</script>