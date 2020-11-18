<template>
  <div>
    <b-form-file
      v-model="image"
      :state="Boolean(image)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
      @change="addImage"
    ></b-form-file>
    
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'AddImage',
    methods: {
        ...mapMutations([
            'addImage'
        ])
    },
    data() {
        return {
            image: null
        }
    }
    
}
</script>