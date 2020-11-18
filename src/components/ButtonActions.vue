<template>
  <div class="mt-3">
    <b-button-group>
      <b-button variant="success" @click="quitarCapas">Quitar capas</b-button>
      <b-button variant="info">Calcular Areas</b-button>
      <b-button variant="warning">Otra opción</b-button>
    </b-button-group>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: "ButtonActions",
    methods: {
        ...mapActions([
            'quitarCapas'
        ])
    }
}
</script>