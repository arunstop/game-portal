<template>
  <v-col class="c-dialog-container ma-0">
    <v-dialog
      v-for="(dialog, index) in dialogList.filter((s) => s.showing)"
      :id="index"
      :key="dialog.key"
      v-model="dialog.showing"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title>{{ dialog.title }}</v-card-title>
        <v-card-text>{{ dialog.message }}</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click.stop="dialog.showing = false"> CANCEL </v-btn>
          <v-btn
            color="success"
            @click="
              dialog.okAction();
              dialog.showing = false;
            "
          >
            OK</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("ui", ["dialogList"]),
  },
  methods: {
  },
};
</script>

<style scoped>
.c-dialog-container {
  position: absolute;
}
</style>