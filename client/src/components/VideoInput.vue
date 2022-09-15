<!-- eslint-disable prettier/prettier -->
<template>
  <v-card class="" width="50%">
    <v-toolbar height="40" color="blue darken-4" dense>
      <v-spacer></v-spacer>
      <v-toolbar-title
        class="text-center"
        style="color: white; font-size: 25px !important"
        >Preview & Programm Window
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text
      v-if="getProgrammInputByNumber[0] !== undefined"
      class="white text-center"
    >
      <!-- <v-card-title class="text-h6 justify-center">
      </v-card-title> -->
      <div
        class="text-overline"
        style="color: black; font-size: 15px !important"
      >
        <!-- {{ getProgrammInputByNumber[0].title }} -->
      </div>
      <!-- <vue-flv-player
        class="mt-2"
        :autoplay="true"
        :controls="false"
        type="flv"
        :width="720"
        :height="480"
        :muted="true"
        ref="myPlayer"
        :source="src"
      /> -->
      <!-- <div id="sldp_player_wrapper"></div> -->
      <v-card-actions>
        <v-btn
          small
          @click="inputButton(getProgrammInputByNumber[0].inputKey, 'Play')"
          color="error"
          v-if="
            getProgrammInputByNumber[0].status === 'Paused' ||
            getProgrammInputByNumber[0].status === 'Completed'
          "
        >
          <font-awesome-icon size="lg" class="" icon="play" dark />
        </v-btn>
        <v-btn
          color="error"
          small
          v-else
          @click="inputButton(getProgrammInputByNumber[0].inputKey, 'Pause')"
        >
          <font-awesome-icon size="lg" class="" icon="pause" dark />
        </v-btn>
        <v-progress-linear
          striped
          class="ml-2"
          height="20"
          :value="getDuration[0]"
          stream
          dark
          color="blue darken-4"
          >{{ getProgrammInputByNumber[0].position }}
        </v-progress-linear>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>
<!-- eslint-disable prettier/prettier -->
<script src="https://softvelum.com/player/releases/sldp-v2.21.3.min.js"></script>
<!-- eslint-disable prettier/prettier -->
<script>
import { mapState } from "vuex";
export default {
  name: "VideoInput",
  data: () => ({
    src: "ws://localhost:8000/live/test.flv",
  }),
  computed: {
    ...mapState({
      presetInputs: (state) => state.content,
      programmNumbers: (state) => state.programm,
    }),
    getProgrammInputByNumber() {
      return this.$store.state.content.filter(
        (val) => val.number === this.programmNumbers
      );
    },
    getDuration() {
      return this.$store.state.content
        .filter((val) => val.number === this.programmNumbers)
        .map((val) =>
          Math.round((val.defaultPosition / val.defaultDuration) * 100)
        );
    },
  },
  watch: {},
  created() {},
  mounted() {
    // document.addEventListener("DOMContentLoaded", initPlayer);
    // setTimeout(() => {
    //   SLDP.init({
    //     container: "sldp_player_wrapper",
    //     stream_url: "ws://10.99.153.226:8081/test/Test",
    //     height: 480,
    //     width: 720,
    //     autoplay: true,
    //   });
    // }, 2000);
  },
  methods: {
    inputButton(key, val) {
      this.$socket.client.emit("playPauseCommand", key, val);
    },
  },
};
</script>
