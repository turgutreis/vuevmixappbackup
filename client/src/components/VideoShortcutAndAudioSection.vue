<!-- eslint-disable prettier/prettier -->

<template>
  <div class="d-flex flex-column ml-2 mr-4">
    <v-card class="d-flex justify-center mb-1" flat tile>
      <!-- <PreviewWindow /> -->
      <VideoInput />
    </v-card>
    <v-card flat tile class="d-flex justify-center">
      <TransitionButtons />
    </v-card>
    <!-- <v-card class="mt-2">
      <AudioInputsComponent />
    </v-card> -->
  </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
// import PreviewWindow from "./PreviewWindow";
import VideoInput from "./VideoInput";
// import AudioInputsComponent from "./AudioInputsComponent";
import TransitionButtons from "./TransitionButtons";
export default {
  name: "VideoShortcutSection",
  components: {
    VideoInput,
    // AudioInputsComponent,
    // PreviewWindow,
    TransitionButtons,
  },
  data: () => ({}),
  computed: {},
  watch: {},
  created() {},
  methods: {},
};
</script>
