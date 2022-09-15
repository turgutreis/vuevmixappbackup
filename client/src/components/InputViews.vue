<template>
  <div>
    <v-card class="" flat tile width="100%">
      <ProgrammPreviewComponent />
      <!-- <VideoShortcutAndAudioSection /> -->
      <!-- <v-card height="220">
            </v-card> -->
      <!-- <v-card class="d-flex justify-space-between" height="220">
            </v-card> -->
      <!-- <vue-flv-player class="mt-2" :autoplay="true" :controls="false" type="flv" :width=400 :height=200
              :muted="true" ref="myPlayer" :source="src" /> -->
      <!-- <ShortcutButtons /> -->
    </v-card>
  </div>
</template>

<script>
// import flvjs from "https://cdn.bootcss.com/flv.js/1.5.0/flv.min.js"
import { mapState } from "vuex";
import ProgrammPreviewComponent from "./ProgrammPreviewComponent";
// import VideoShortcutAndAudioSection from "./VideoShortcutAndAudioSection";
export default {
  name: "InputViews",
  components: {
    ProgrammPreviewComponent,
    // VideoShortcutAndAudioSection,
  },
  data: () => ({
    show: false,
    presets: [],
    snapshotImg: null,
    select: null,
    alignments: ["start", "center", "end"],
    items: [],
    inputTitels: [],
  }),
  computed: {
    ...mapState({
      activePreset: (state) => state.content,
      currentOutputSnapshot: (state) => state.currentSnapshot,
    }),
  },
  watch: {
    // Wird ausgeführt beim wechseln zwischen den schon vorhandenen Tabs. Jede Tab hat seine eigene Navbar für die Spielauswahl

    activePreset: {
      handler: async function () {
        this.presets = this.activePreset;
        // console.log(this.activePreset)
        // console.log(this.$store.state.messages.content);
        // for (let i = 0; i < this.presets.length; i++) {
        //     this.presets[i].presetStatus = true;
        // }
      },
    },
  },
  created() {
    this.$store.dispatch("receiveActivePreset").then(() => {
      // console.log(this.$store.state.messages.content);
      // this.presets = this.$store.state.messages.content.vmix.inputs;
    });
  },
  methods: {
    getJsonData() {
      console.log(this.select);
      this.$store.dispatch("sentPresetName", this.select);
    },
    getSnapshotImg() {
      // let images = require.context("../../../../vMixStorage/", false, /\.jpg$/)
      // return images("./" + val[0])
    },
  },
};
</script>
