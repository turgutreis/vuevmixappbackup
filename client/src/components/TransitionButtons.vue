<!-- eslint-disable prettier/prettier -->
<template>
  <v-card class="" flat tile height="45">
    <!-- <v-col> </v-col> -->
    <v-btn
      class="mt-1"
      @click="quickPlayCommand(getProgrammInputByNumber[0].inputKey)"
      dark
      color="blue darken-4"
      rounded
    >
      QuickPlay
    </v-btn>
    <!-- <v-col> </v-col> -->
    <v-btn
      class="ml-3 mt-1"
      @click="cutCommand"
      color="blue darken-4"
      dark
      rounded
    >
      Cut
    </v-btn>
    <v-btn
      class="mt-1 ml-2"
      v-for="(data, i) in getTransitionData"
      :key="i"
      dark
      rounded
      color="blue darken-4"
      @click="transitionBtn(data.buttonName)"
    >
      {{ data.buttonName }}
    </v-btn>
  </v-card>
  <!-- <v-card class="" flat height="45">
    <v-col cols="2" class="child-flex">
      <v-btn
        class="ml-4 mt-1"
        @click="quickPlayCommand(getProgrammInputByNumber[0].inputKey)"
        dark
        color="blue darken-4"
        rounded
      >
        QuickPlay
      </v-btn>
      <v-btn
        class="ml-3 mt-1"
        @click="cutCommand"
        color="blue darken-4"
        dark
        rounded
      >
        Cut
      </v-btn>
      <v-btn
        class="ml-3 mt-1"
        v-for="(data, i) in getTransitionData"
        :key="i"
        dark
        rounded
        color="blue darken-4"
        @click="transitionBtn(data.buttonName)"
      >
        {{ data.buttonName }}
      </v-btn>
    </v-col>
  </v-card> -->
</template>
<!-- eslint-disable prettier/prettier -->
<script>
import { mapState } from "vuex";
export default {
  name: "TransitionButtons",
  data: () => ({
    files: null,
    items: [
      { text: "Real-Time", icon: "mdi-clock" },
      { text: "Audience", icon: "mdi-account" },
      { text: "Conversions", icon: "mdi-flag" },
    ],
  }),
  computed: {
    ...mapState({
      previewNumbers: (state) => state.preview,
    }),
    getTransitionData() {
      return this.$store.state.transition;
    },
    getProgrammInputByNumber() {
      return this.$store.state.content.filter(
        (val) => val.number === this.previewNumbers
      );
    },
  },
  watch: {},
  created() {},
  methods: {
    transitionBtn(val) {
      this.$socket.client.emit("transitionCommand", val);
    },
    cutCommand() {
      this.$socket.client.emit("CutCommand");
    },
    quickPlayCommand(key) {
      this.$socket.client.emit("QuickPlayCommand", key);
    },
  },
};
</script>
