<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <v-card class="">
      <v-toolbar color="#212121" height="45" dense>
        <v-toolbar-title style="color: white; font-size: 30px !important"
          >Preview</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-btn class="" @click="onPickFile" color="primary">
          Input Hinzufügen
        </v-btn>
        <input
          type="file"
          style="display: none"
          ref="fileInput"
          accept="image/*, video/*"
          directory
          @change="onFilePicked"
        />
      </v-toolbar>
      <div class="">
        <v-card flat class="d-flex flex-wrap">
          <v-card
            v-for="item in presetInputs"
            :key="item.number"
            class="ml-2 mt-2 mb-3 rounded-b-lg"
          >
            <v-toolbar class="input-headline" height="28" color="#212121" dense>
              <v-toolbar-title style="color: white">{{
                item.type
              }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <font-awesome-icon
                v-if="programmNumbers === item.number"
                size="lg"
                color="#76FF03"
                icon="camera"
              />
              <font-awesome-icon
                v-if="previewNumbers === item.number"
                size="lg"
                color="orange"
                icon="camera"
              />
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    small
                    icon
                    class="ml-4"
                    v-if="item.type === 'GT'"
                    v-bind="attrs"
                    v-on="on"
                    @click="editText(item.originalTitle)"
                    style="z-index: 500"
                  >
                    <font-awesome-icon color="white" icon="pen" />
                  </v-btn>
                </template>
                <span>Edit Title</span>
              </v-tooltip>
            </v-toolbar>
            <v-card
              flat
              tile
              :id="'preview-' + item.number"
              ref="previewInput"
              @click="inputButton(item.inputKey)"
              height="144"
            >
              <v-card-title
                class="text-h6 justify-center"
                style="font-size: 15px !important; color: black"
              >
                <div v-if="item.muted !== null">
                  <font-awesome-icon
                    size="lg"
                    class="mr-2"
                    v-if="item.muted !== 'True'"
                    icon="volume-up"
                  />
                  <font-awesome-icon
                    size="lg"
                    v-else
                    class="mr-2"
                    icon="volume-mute"
                  />
                </div>
                {{ item.title }}
              </v-card-title>
              <v-card-subtitle
                class="text-center"
                v-if="item.type !== 'GT'"
                style="color: black"
              >
                <v-chip
                  class="mt-2"
                  color="primary"
                  style="background-color: white !important"
                  label
                  outlined
                >
                  Dauer: {{ item.duration }}
                </v-chip>
                <br />
                <v-chip
                  class="mt-2"
                  color="secondary"
                  style="background-color: white !important"
                  label
                  outlined
                >
                  Position: {{ item.position }}
                </v-chip>
              </v-card-subtitle>
              <v-card-subtitle class="text-start" v-else style="color: black">
                Headline: {{ item.headlineTitel }} <br />
                Discription: {{ item.description }}
              </v-card-subtitle>
            </v-card>
            <v-card
              class="rounded-b-lg"
              flat
              tile
              color="#212121"
              v-if="item.type !== 'GT' && item.type !== 'Image'"
            >
              <div style="text-align: center; color: white">
                <span style="font-size: 14px">Audio Mixer</span>
              </div>
              <v-row class="ma-0 pa-2" justify="center">
                <v-checkbox
                  class="overlay-checkboxes"
                  v-model="item.m"
                  hide-details="true"
                  label="M"
                  dense
                  @change="changeAudioBus('M', item.inputKey)"
                >
                </v-checkbox>
                <v-checkbox
                  class="overlay-checkboxes ml-1"
                  v-model="item.a"
                  hide-details="true"
                  label="A"
                  dense
                  @change="changeAudioBus('A', item.inputKey)"
                >
                </v-checkbox>
                <v-checkbox
                  class="overlay-checkboxes ml-1"
                  v-model="item.b"
                  hide-details="true"
                  label="B"
                  dense
                  @change="changeAudioBus('B', item.inputKey)"
                >
                </v-checkbox>
              </v-row>
            </v-card>
            <v-card
              class="rounded-b-lg"
              height="76"
              flat
              tile
              color="#212121"
              v-else-if="item.type === 'Image'"
            >
            </v-card>
            <v-card
              flat
              class="rounded-b-lg"
              color="#212121"
              tile
              v-else
              :id="'preview-overlays-' + item.number"
              ref="previewOverlayInput"
            >
              <div style="text-align: center">
                <span style="font-size: 14px; color: white">Overlay</span>
              </div>
              <v-row class="ma-0 pa-2" justify="center">
                <v-checkbox
                  class="overlay-checkboxes"
                  color="red"
                  v-model="item.overlay1"
                  @change="inputOverlayButton(item.inputKey, 1)"
                  hide-details="true"
                  dense
                  label="1"
                >
                </v-checkbox>
                <v-checkbox
                  class="overlay-checkboxes ml-1"
                  color="red"
                  v-model="item.overlay2"
                  @change="inputOverlayButton(item.inputKey, 2)"
                  hide-details="true"
                  dense
                  label="2"
                >
                </v-checkbox>
                <v-checkbox
                  class="overlay-checkboxes ml-1"
                  color="red"
                  v-model="item.overlay3"
                  @change="inputOverlayButton(item.inputKey, 3)"
                  hide-details="true"
                  dense
                  label="3"
                >
                </v-checkbox>
                <v-checkbox
                  class="overlay-checkboxes ml-1"
                  color="red"
                  v-model="item.overlay4"
                  @change="inputOverlayButton(item.inputKey, 4)"
                  hide-details="true"
                  dense
                  label="4"
                >
                </v-checkbox>
              </v-row>
            </v-card>
          </v-card>
        </v-card>
      </div>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="300">
      <form>
        <v-card class="pa-2">
          <v-text-field v-model="headline" label="Headline"></v-text-field>
          <v-text-field
            v-model="description"
            label="Description"
          ></v-text-field>
          <v-btn class="mr-4" color="primary" @click="submit"> submit </v-btn>
          <v-btn @click="clear"> clear </v-btn>
          <v-btn class="ml-2" color="error" @click="dialog = false">
            Close
          </v-btn>
        </v-card>
      </form>
    </v-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "PreviewInputs",
  props: ["inputsData"],
  data: () => ({
    inputs: [],
    dialog: false,
    test: "1",
    headline: "",
    description: "",
  }),
  computed: {
    ...mapState({
      presetInputs: (state) => state.content,
      previewNumbers: (state) => state.preview,
      programmNumbers: (state) => state.programm,
    }),
  },
  watch: {
    presetInputs: {
      handler: async function () {
        if (this.$refs.previewInput === undefined) return;
        for (let i = 0; i < this.$refs.previewInput.length; i++) {
          if (
            this.$refs.previewInput[i].$el.id ===
            "preview-" + this.previewNumbers
          ) {
            this.$refs.previewInput[i].$el.style.backgroundColor = "#FF5252";
            // this.$refs.previewOverlayInput.filter((val) => val.$el.id === "preview-overlays-" + this.previewNumbers)[0].$el.style.backgroundColor = "#FFCC80"
          } else {
            this.$refs.previewInput[i].$el.style.backgroundColor = "";
            // this.$refs.previewOverlayInput.filter((val) => val.$el.id === "preview-overlays-" + this.previewNumbers)[0].$el.style.backgroundColor = ""
          }
        }
        // console.log(this.$store.state.overlays)
        for (let j = 0; j < this.$store.state.content.length; j++) {
          // console.log(this.$store.state.content[j])
          if (this.$store.state.content[j].bus !== null) {
            switch (this.$store.state.content[j].bus) {
              case "M":
                this.$store.state.content[j].m = true;
                break;
              case "A":
                this.$store.state.content[j].a = true;
                break;
              case "B":
                this.$store.state.content[j].b = true;
                break;
              case "M,A":
                this.$store.state.content[j].m = true;
                this.$store.state.content[j].a = true;
                break;
              case "M,B":
                this.$store.state.content[j].m = true;
                this.$store.state.content[j].b = true;
                break;
              case "M,A,B":
                this.$store.state.content[j].m = true;
                this.$store.state.content[j].a = true;
                this.$store.state.content[j].b = true;

                break;
              case "A,B":
                this.$store.state.content[j].a = true;
                this.$store.state.content[j].b = true;
                break;
              default:
            }
          } else {
            for (let g = 0; g < this.$store.state.overlays.length; g++) {
              if (
                this.$store.state.content[j].number ===
                this.$store.state.overlays[g].inputNr
              ) {
                // console.log(this.$store.state.overlays[g])
                switch (this.$store.state.overlays[g].overlayNr) {
                  case "1":
                    this.$store.state.content[j].overlay1 = true;
                    break;
                  case "2":
                    this.$store.state.content[j].overlay2 = true;
                    break;
                  case "3":
                    this.$store.state.content[j].overlay3 = true;
                    break;
                  case "4":
                    this.$store.state.content[j].overlay4 = true;
                    break;
                  default:
                }
              }
            }
          }
        }
      },
    },
  },
  created() {
    this.inputs = this.presetInputs;
  },
  mounted() {
    // console.log(document.getElementById('preview-' + this.previewNumbers))
    // document.getElementById('preview-' + this.previewNumbers).style.color = "red !important"
  },
  methods: {
    inputButton(val) {
      this.$socket.client.emit("switchToPreviewCommand", val);
    },
    inputOverlayButton(val, number) {
      this.$socket.client.emit("postOverlayCommand", val, number);
    },
    editText(val) {
      this.dialog = true;
      this.inputkey = val;
    },
    submit() {
      console.log(this.headline);
      console.log(this.description);
      this.$socket.client.emit(
        "editTextCommand",
        this.inputkey,
        this.headline,
        this.description
      );
    },
    clear() {
      this.headline = "";
      this.description = "";
    },
    onPickFile() {
      // console.log(this.$refs.fileInput)
      this.$refs.fileInput.click();
      // this.$refs.fileInput.onClick()
    },
    onFilePicked(event) {
      const files = event.target.files;
      // const FileData = new FormData();
      // FileData.append('file', files[0].File)
      // console.log(event)
      this.$socket.client.emit("InputCommad", files[0].name, (status) => {
        console.log(status);
      });
    },
    changeAudioBus(bus, key) {
      this.$socket.client.emit("CommandAudioBus", bus, key);
    },
  },
};
</script>

<style>
.input-title-size {
  font-size: 5px !important;
}

.overlay-checkboxes {
  border-style: solid;
  border-width: 2px;
  /* border-color: white; */
  background-color: white;
}

.v-label {
  margin-right: 5px;
  font-size: 17px;
  color: black !important;
}

/* .v-icon {
    color: white !important;
} */

.v-application--is-ltr .v-input--selection-controls__input {
  margin-right: 0px !important;
}
</style>
