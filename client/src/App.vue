<template>
  <v-app>
    <v-app-bar app color="#B71C1C" height="55">
      <span style="color: white; font-size: 18px">
        vMix Preset {{ getPresetName }}</span
      >
      <v-chip class="ml-2" color="white" label v-on:click.right="changeIP">
        <font-awesome-icon
          v-if="status"
          class="status"
          style="font-size: 25px"
          icon="circle"
          color="#76FF03"
        />
        <font-awesome-icon
          v-else
          class="status"
          style="font-size: 25px"
          icon="circle"
          color="red"
        />
        <h3 class="vmix-ip-adress ml-2">{{ ip }}</h3>
        <v-text-field
          class="ip-text-field"
          style="width: 100px; height: 40px; display: none"
          placeholder="Placeholder"
          v-model="ip"
          dense
          solo
        >
        </v-text-field>
        <v-icon
          dark
          right
          class="confirm"
          color="green"
          @click="confirmNewIP"
          style="display: none"
        >
          mdi-checkbox-marked-circle
        </v-icon>
        <v-icon
          dark
          right
          class="cancel"
          @click="cancelTabTitle"
          color="red"
          style="display: none"
        >
          mdi-cancel
        </v-icon>
      </v-chip>
      <v-chip label color="white" class="ml-2">
        <h3>Port: {{ portNr }}</h3>
      </v-chip>
      <v-menu
        v-model="menuForRTMP"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            color="white"
            v-bind="attrs"
            class="ml-2"
            v-on="on"
            v-if="streamingStatus === 'true'"
            large
            >mdi-broadcast</v-icon
          >

          <v-icon
            color="white"
            class="ml-2"
            v-bind="attrs"
            v-on="on"
            v-else
            large
            >mdi-broadcast-off</v-icon
          >
          <span class="ml-4" style="color: white">Custom RTMP Stream</span>
        </template>
        <v-card>
          <v-tabs
            v-model="tab"
            background-color="#B71C1C"
            centered
            dark
            icons-and-text
          >
            <v-tabs-slider></v-tabs-slider>

            <v-tab href="#tab-1"> 1 </v-tab>

            <v-tab href="#tab-2"> 2 </v-tab>

            <v-tab href="#tab-3"> 3 </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item :value="'tab-' + 1">
              <v-card flat>
                <v-card-text>
                  <v-card flat tile class="pa-2">
                    Custom RTMP 1
                    <v-text-field
                      label="Streaming-URL"
                      v-model="streamingURL1"
                      solo
                    >
                      <template v-slot:append>
                        <v-btn
                          fab
                          color="green"
                          x-small
                          @click="sendStreamingURL(streamingURL1, 0)"
                          ><v-icon color="white">mdi-send</v-icon></v-btn
                        >
                        <v-btn fab color="red" x-small
                          ><v-icon color="white">mdi-close-thick</v-icon></v-btn
                        >
                      </template>
                    </v-text-field>
                    <v-text-field
                      label="Streaming-Key"
                      v-model="streamingKey1"
                      solo
                    >
                      <template v-slot:append>
                        <v-btn
                          fab
                          color="green"
                          x-small
                          @click="sendStreamingKey(streamingKey1, 0)"
                          ><v-icon color="white">mdi-send</v-icon></v-btn
                        >
                        <v-btn fab color="red" x-small
                          ><v-icon color="white">mdi-close-thick</v-icon></v-btn
                        >
                      </template>
                    </v-text-field>

                    <v-divider></v-divider>

                    <v-btn @click="startStreaming"> Start Stream </v-btn>

                    <v-btn @click="stopStreaming"> Stop Stream </v-btn>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item :value="'tab-' + 2">
              <v-card flat>
                <v-card-text>
                  <v-card flat tile class="pa-2">
                    Custom RTMP 2
                    <v-text-field
                      label="Streaming-URL"
                      v-model="streamingURL2"
                      solo
                    >
                      <template v-slot:append>
                        <v-btn
                          fab
                          color="green"
                          x-small
                          @click="sendStreamingURL(streamingURL2, 1)"
                          ><v-icon color="white">mdi-send</v-icon></v-btn
                        >
                        <v-btn fab color="red" x-small
                          ><v-icon color="white">mdi-close-thick</v-icon></v-btn
                        >
                      </template>
                    </v-text-field>
                    <v-text-field
                      label="Streaming-Key"
                      v-model="streamingKey2"
                      solo
                    >
                      <template v-slot:append>
                        <v-btn
                          fab
                          color="green"
                          x-small
                          @click="sendStreamingKey(streamingKey2, 1)"
                          ><v-icon color="white">mdi-send</v-icon></v-btn
                        >
                        <v-btn fab color="red" x-small
                          ><v-icon color="white">mdi-close-thick</v-icon></v-btn
                        >
                      </template>
                    </v-text-field>

                    <v-divider></v-divider>

                    <v-btn @click="startStreaming"> Start Stream </v-btn>

                    <v-btn @click="stopStreaming"> Stop Stream </v-btn>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item :value="'tab-' + 3">
              <v-card flat>
                <v-card-text>
                  <v-card flat tile class="pa-2">
                    Custom RTMP 3
                    <v-text-field
                      label="Streaming-URL"
                      v-model="streamingURL3"
                      solo
                    >
                      <template v-slot:append>
                        <v-btn
                          fab
                          color="green"
                          x-small
                          @click="sendStreamingURL(streamingURL3, 2)"
                          ><v-icon color="white">mdi-send</v-icon></v-btn
                        >
                        <v-btn fab color="red" x-small
                          ><v-icon color="white">mdi-close-thick</v-icon></v-btn
                        >
                      </template>
                    </v-text-field>
                    <v-text-field
                      label="Streaming-Key"
                      v-model="streamingKey3"
                      solo
                    >
                      <template v-slot:append>
                        <v-btn
                          fab
                          color="green"
                          x-small
                          @click="sendStreamingKey(streamingKey3, 2)"
                          ><v-icon color="white">mdi-send</v-icon></v-btn
                        >
                        <v-btn fab color="red" x-small
                          ><v-icon color="white">mdi-close-thick</v-icon></v-btn
                        >
                      </template>
                    </v-text-field>

                    <v-divider></v-divider>

                    <v-btn @click="startStreaming"> Start Stream </v-btn>

                    <v-btn @click="stopStreaming"> Stop Stream </v-btn>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-menu>
      <!-- <v-tabs v-model="tab2">
        <v-tab v-for="item in items2" :key="item.tab">
          {{ item.tab }}
        </v-tab>
      </v-tabs> -->
      <v-spacer></v-spacer>
      <div class="text-center">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-x
        >
          <template v-slot:activator="{ on, attrs }">
            <v-icon type="button" v-bind="attrs" v-on="on" large color="white">
              mdi-google
            </v-icon>
          </template>

          <v-card class="pa-2">
            <v-btn @click="handleClickGetAuth" :disabled="!isInit">
              get auth code
            </v-btn>
            <v-btn
              @click="handleClickSignIn"
              v-if="!isSignIn"
              :disabled="!isInit"
            >
              signIn
            </v-btn>
            <v-btn
              @click="handleClickSignOut"
              v-if="isSignIn"
              :disabled="!isInit"
            >
              signOout
            </v-btn>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>
    <v-main>
      <InputViews v-if="status" />
      <v-alert width="200" v-else type="info">
        vMix is disconnect - Please open a vmix Preset
      </v-alert>
    </v-main>
    <template>
      <v-footer padless dark color="#B71C1C">
        <v-col class="text-center" cols="12">
          {{ new Date().getFullYear() }} —
          <strong>RTL News - VueApp: Video Switcher for vMix</strong>
        </v-col>
      </v-footer>
    </template>
  </v-app>
</template>
<script src="https://accounts.google.com/gsi/client" async defer></script>

<script>
import InputViews from "./components/InputViews.vue";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    InputViews,
  },
  watch: {
    ipAdress: {
      handler: async function () {
        this.ip = this.ipAdress;
        console.log(this.ipAdress);
      },
    },
  },
  computed: {
    streamingStatus() {
      return this.$store.state.streamingStatus;
    },
    status() {
      return this.$store.state.status;
    },
    getPresetName() {
      return this.$store.state.presetName;
    },
    getPresetIP() {
      return this.$store.state.IPAdress;
    },
    ...mapState({
      ipAdress: (state) => state.IPAdress,
      portNr: (state) => state.port,
    }),
  },
  data: () => ({
    toggle_exclusive: 2,
    vmixConnected: "offline",
    activeInstanceTitle: "",
    statusColor: "",
    select: null,
    ip: null,
    streamingURL1: null,
    streamingURL2: null,
    streamingURL3: null,
    streamingKey1: null,
    streamingKey2: null,
    streamingKey3: null,
    tab2: null,
    items2: [
      { tab: "One", content: "Tab 1 Content" },
      { tab: "Two", content: "Tab 2 Content" },
      { tab: "Three", content: "Tab 3 Content" },
    ],
    tab: null,
    items: [],
    fav: true,
    googleAuth: "",
    menuForRTMP: "",
    menu: false,
    message: false,
    hints: true,
    isInit: false,
    isSignIn: false,
  }),
  created() {
    this.ip = this.ipAdress;
    this.$socket.client.emit("getVmixData");
    this.$socket.client.on("GetPresetFiles", (msg) => {
      this.items = msg.files;
    });
  },
  mounted() {
    // this.receiveActivePreset();
    // this.$socket.client.on("connect")
    // Contextmenu wird nicht angezeigt
    // document.getElementById("filepicker").addEventListener(
    //   "change",
    //   (event) => {
    //     // let output = document.getElementById("listing");
    //     console.log(event.target.files)
    //     // for (const file of event.target.files) {
    //     //   let item = document.createElement("li");
    //     //   item.textContent = file.webkitRelativePath;
    //     //   console.log(file)
    //     //   output.appendChild(item);
    //     // }
    //   },
    //   false
    // );
    window.addEventListener(
      "contextmenu",
      function (e) {
        e.preventDefault();
      },
      false
    );
    this.ip = this.ipAdress;
    this.$store.dispatch("sendVmixConnection");
    let that = this;
    let checkGauthLoad = setInterval(function () {
      that.isInit = that.$gAuth.isInit;
      that.isSignIn = that.$gAuth.isAuthorized;
      that.googleAuth = that.$gAuth;
      if (that.isInit) clearInterval(checkGauthLoad);
    }, 1000);
    // this.handleClientLoad();
  },
  destroyed() {
    this.$socket.client.off("connect");
    this.$socket.client.off("disconnect");
    // this.$socket.off("users");
    this.$socket.client.off("user connected");
    this.$socket.client.off("user disconnected");
    // this.$socket.off("private message");
  },
  sockets: {
    connect() {
      console.log("socket connected");
    },
  },
  methods: {
    openPreset(val) {
      this.$socket.client.emit("openPresetCommand", val);
    },
    remove() {
      // savePresetData
      console.log("Delete");
      this.$store.dispatch("getDelete");
    },
    changeIP() {
      console.log(document.getElementsByClassName("ip-text-field")[0]);
      document.getElementsByClassName("ip-text-field")[0].style.display = "";
      document.getElementsByClassName("vmix-ip-adress")[0].style.display =
        "none";
      document.getElementsByClassName("confirm")[0].style.display = "";
      document.getElementsByClassName("cancel")[0].style.display = "";
      // this.$socket.client.emit("changeIP", this.ip);
    },
    getJsonData() {
      // console.log(this.select);
      this.$store.dispatch("sentPresetName", this.select);
    },
    sendStreamingURL(url, val) {
      console.log(url, val);
      this.$socket.client.emit("commandForStreamingURL", val + "," + url);
    },
    sendStreamingKey(key, val) {
      console.log(key, val);
      this.$socket.client.emit("commandForStreamingKey", val + "," + key);
    },
    selectFile() {
      // document.getElementById("files").addEventListener("change", (event) => {
      //   event.target.webkitEntries.forEach((entry) => {
      //   });
      // });
      console.log(e.target.webkitEntries);
    },
    startStreaming() {
      this.$socket.client.emit("commandForStartStreaming");
    },
    stopStreaming() {
      this.$socket.client.emit("commandForStopStreaming");
    },
    confirmNewIP() {
      document.getElementsByClassName("ip-text-field")[0].style.display =
        "none";
      document.getElementsByClassName("vmix-ip-adress")[0].style.display = "";
      document.getElementsByClassName("confirm")[0].style.display = "none";
      document.getElementsByClassName("cancel")[0].style.display = "none";
      console.log(this.ip);
      this.$socket.client.emit("changeIP", this.ip);
    },
    cancelTabTitle() {
      document.getElementsByClassName("ip-text-field")[0].style.display =
        "none";
      document.getElementsByClassName("vmix-ip-adress")[0].style.display = "";
      document.getElementsByClassName("confirm")[0].style.display = "none";
      document.getElementsByClassName("cancel")[0].style.display = "none";
    },
    async handleClickGetAuth() {
      try {
        const authCode = await this.$gAuth.getAuthCode();
        const response = await this.$http.post(
          "http://your-backend-server.com/auth/google",
          { code: authCode, redirect_uri: "postmessage" }
        );
      } catch (error) {
        // On fail do something
      }
    },
    async handleClickSignIn() {
      try {
        const googleUser = await this.$gAuth.signIn();
        console.log("user", googleUser);
        this.isSignIn = this.$gAuth.isAuthorized;
      } catch (error) {
        // On fail do something
        console.error(error);
        return null;
      }
    },
    async handleClickSignOut() {
      try {
        await this.$gAuth.signOut();
        this.isSignIn = this.$gAuth.isAuthorized;
      } catch (error) {
        // On fail do something
      }
    },
  },
};
</script>
