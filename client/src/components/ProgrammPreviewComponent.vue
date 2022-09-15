<!-- eslint-disable prettier/prettier -->
<template>
  <div class="d-flex flex-column" style="width: 100% !important">
    <v-container fluid>
      <!-- <ProgrammInputs /> -->
      <VideoShortcutAndAudioSection />
      <PreviewInputs />
    </v-container>
  </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
import { mapState } from "vuex";
// import ProgrammInputs from "./ProgrammInputs";
import PreviewInputs from "./PreviewInputs";
// import TransitionButtons from "./TransitionButtons";
import VideoShortcutAndAudioSection from "./VideoShortcutAndAudioSection";
export default {
  name: "ProgrammPreviewComponent",
  components: {
    VideoShortcutAndAudioSection,
    PreviewInputs,
  },
  data: () => ({
    inputs: [],
  }),
  computed: {
    ...mapState({
      presetInputs: (state) => state.content,
    }),
  },
  watch: {},
  created() {
    this.inputs = this.presetInputs;
  },
  methods: {
    inputButton(val) {
      this.$socket.client.emit("postCommand", val);
    },
    inputPauseButton(val) {
      this.$socket.client.emit("postPauseCommand", val);
    },
  },
};
</script>
<!-- eslint-disable prettier/prettier -->
<style>
.input-title-size {
  font-size: 5px !important;
}
</style>
