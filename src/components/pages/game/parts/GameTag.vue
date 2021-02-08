<template>
  <v-col cols="12">
            <v-alert
              class="mx-3 ps-6 rounded-lg"
              border="left"
              colored-border
              color="primary lighten-4"
              elevation="2"
              dense
            >
              <p class="text-h6">Tags :</p>
              <v-row no-gutters>
                <v-chip
                  v-for="tag in gameDetails.data.tags"
                  :key="tag.id"
                  class="me-2 mb-2 px-4"
                >
                  {{ tag.name }}
                </v-chip>
              </v-row>
            </v-alert>
          </v-col>
</template>

<script>
export default {
props:{
    gameDetails: Object
}
}
</script>

<style>

</style>