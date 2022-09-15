import Vue from "vue";
import Vuex from "vuex";
// import axios from "axios";
import moment from "moment";
// import path from "path";
import momentDurationFormatSetup from "moment-duration-format";
// import fs from "fs";

momentDurationFormatSetup(moment);

// const BASE_URL = "http://localhost:3030";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    presetData: [],
    status: null,
    audioInputs: [],
    transition: [],
    content: [],
    programm: null,
    preview: null,
    IPAdress: "",
    overlays: [],
    streamingStatus: "",
    port: "",
    presetName: null,
    messages: { title: null, isActive: false },
    img: null,
    currentSnapshot: null,
  },
  mutations: {
    SET_VMIX_PRESET_CONTENT(state, data) {
      state.content = data;
    },
    SENT_PREVIEW_AND_ACTIVE(state, data) {
      state.programm = data.programm;
      state.preview = data.preview;
    },
    SET_VMIX_PRESET_TRANSITION(state, data) {
      state.transition = data;
    },
    FILENAME(state, data) {
      state.presetName = data;
    },
    IPADRESS(state, data) {
      state.IPAdress = data;
    },
    IPPORT(state, data) {
      state.port = data;
    },
    SET_VMIX_PRESET_AUDIO(state, data) {
      state.audioInputs = data;
    },
    SET_PRESET_DATA(state, data) {
      state.presetData = data;
    },
    SET_IMG_DATA(state, data) {
      console.log(data);
      state.img = data;
    },
    SET_CONNECTION(state, data) {
      state.status = data;
      // this._vm.$socket.client.emit("receiveData", data)
    },
    SET_VMIX_ACTIVE(state, data) {
      state.messages.title = data.title;
      state.messages.isActive = data.presetStatus;
    },
    SET_VMIX_INACTIVE(state, data) {
      state.messages.title = null;
      state.messages.isInActive = data;
    },
    SET_VMIX_SNAPSHOT(state, data) {
      state.currentSnapshot = data;
    },
    sentTransitionCommand(state, val) {
      console.log(val);
    },
    sentTransitionPauseCommand(state, val) {
      console.log(val);
    },
    SET_VMIX_OVERLAY(state, data) {
      state.overlays = data;
    },
    STREAMING_STATUS(state, data) {
      state.streamingStatus = data;
    },
  },
  actions: {
    async sentPresetName({ commit }, preset) {
      this._vm.$socket.client.emit("postCommand", preset);
      commit("SET_PRESET_DATA");
      // try {
      //   return axios
      //     .post(`${BASE_URL}/receive/openpreset`, { data: preset })
      //     .then((resp) => {
      //       console.log(resp.data);
      //       commit("SET_PRESET_DATA");
      //     });
      // } catch (err) {
      //   console.error(err);
      //   return;
      // }
    },
    async receiveActivePreset({ commit }) {
      this._vm.$socket.client.on("activePreset", function (msg) {
        // console.log(msg.content)
        const htmlDoc = new DOMParser().parseFromString(
          msg.content,
          "text/html"
        );
        var htmlResponsePreset = htmlDoc.getElementsByTagName("preset");
        var htmlResponseOverlay = htmlDoc.getElementsByTagName("overlay");
        var htmlResponsePreviewInput = htmlDoc.getElementsByTagName("preview");
        var htmlResponseActiveInput = htmlDoc.getElementsByTagName("active");
        var htmlResponseInput = htmlDoc.getElementsByTagName("input");
        var htmlResponseTransition = htmlDoc.getElementsByTagName("transition");
        var htmlResponseMaster = htmlDoc.getElementsByTagName("master");
        var htmlResponsebusA = htmlDoc.getElementsByTagName("busA");
        var htmlResponsebusB = htmlDoc.getElementsByTagName("busB");
        var htmlResponsebusC = htmlDoc.getElementsByTagName("busC");
        var htmlResponsebusD = htmlDoc.getElementsByTagName("busD");
        var htmlResponsebusE = htmlDoc.getElementsByTagName("busE");
        var htmlResponsebusF = htmlDoc.getElementsByTagName("busF");
        var htmlResponseStreaming = htmlDoc.getElementsByTagName("streaming");
        const newAudioInputs = [].concat(
          htmlResponseMaster[0],
          htmlResponsebusA[0],
          htmlResponsebusB[0],
          htmlResponsebusC[0],
          htmlResponsebusD[0],
          htmlResponsebusE[0],
          htmlResponsebusF[0]
        );
        var newInputObj = {};
        var newAudioObj = {};
        var overlayObj = {};
        var newTransition = {};
        var inputArray = [];
        var audioArray = [];
        var transitionData = [];
        var inputOverlayData = [];
        var overlayNumber = null;
        for (let i = 0; i < htmlResponseInput.length; i++) {
          var shortTitle = htmlResponseInput[i].getAttribute("shortTitle");
          var inputTitle = htmlResponseInput[i].getAttribute("title");
          // console.log(htmlResponseOverlay[i].textContent)
          var key = htmlResponseInput[i].getAttribute("key");
          var newShortTitle = shortTitle
            .replace(".mp4", "")
            .replace(".gtzip", "")
            .replace(".mkv", "");
          var inputState = htmlResponseInput[i].getAttribute("state");
          var inputNumber = htmlResponseInput[i].getAttribute("number");
          var inputMuted = htmlResponseInput[i].getAttribute("muted");
          var inputType = htmlResponseInput[i].getAttribute("type");
          var inputPosition = htmlResponseInput[i].getAttribute("position");
          var inputDuration = htmlResponseInput[i].getAttribute("duration");
          var inputvolume = htmlResponseInput[i].getAttribute("volume");
          // var progressValue = Math.round((inputPosition / inputDuration) * 100)
          // console.log(progressValue)
          var inputAudiobusses =
            htmlResponseInput[i].getAttribute("audiobusses");
          var tempTime = moment.duration(inputPosition);
          var tempDuration = moment.duration(inputDuration);
          var newTime = tempTime.format("HH:mm:ss", { trim: false });
          var newDuration = tempDuration.format("HH:mm:ss", { trim: false });
          var textHeadline = "";
          var textDescription = "";
          if (htmlResponseInput[i].nextElementSibling !== null) {
            if (htmlResponseInput[i].nextElementSibling.localName === "text") {
              textHeadline = htmlResponseInput[i].nextElementSibling.innerHTML;
              textDescription =
                htmlResponseInput[i].nextElementSibling.nextElementSibling
                  .innerHTML;
              // console.log(htmlResponseOverlay[i].innerHTML);
            }
          }
          // if (htmlResponseOverlay[i].textContent !== "") {
          //   console.log(htmlResponseOverlay[i].textContent, htmlResponseInput[i].getAttribute("number"));
          //   if (htmlResponseOverlay[i].textContent === "3") {
          //     overlayNumber = htmlResponseOverlay[i].getAttribute("number");
          //   }
          // }
          newInputObj = {
            inputKey: key,
            originalTitle: inputTitle,
            title: newShortTitle,
            status: inputState,
            defaultPosition: inputPosition,
            defaultDuration: inputDuration,
            position: newTime,
            duration: newDuration,
            headlineTitel: textHeadline,
            description: textDescription,
            type: inputType,
            number: inputNumber,
            muted: inputMuted,
            overlay1: false,
            overlay2: false,
            overlay3: false,
            overlay4: false,
            overlayNr: overlayNumber,
            volume: Math.round(inputvolume),
            defaultVol: inputvolume,
            bus: inputAudiobusses,
            m: false,
            a: false,
            b: false,
          };
          inputArray.push(newInputObj);
        }
        for (let i = 0; i < htmlResponseTransition.length; i++) {
          var transitionEffect =
            htmlResponseTransition[i].getAttribute("effect");
          // console.log(transitionEffect);
          newTransition = {
            buttonName: transitionEffect,
          };
          transitionData.push(newTransition);
        }
        // console.log(htmlResponseOverlay)
        for (let i = 0; i < htmlResponseOverlay.length; i++) {
          if (htmlResponseOverlay[i].textContent !== "") {
            // console.log(htmlResponseOverlay[i])
            if (
              htmlResponseOverlay[i].textContent ===
              htmlResponseOverlay[i].innerHTML
            ) {
              overlayObj = {
                inputNr: htmlResponseOverlay[i].textContent,
                overlayNr: htmlResponseOverlay[i].getAttribute("number"),
              };
              inputOverlayData.push(overlayObj);
            }
          }
        }
        for (let i = 0; i < newAudioInputs.length; i++) {
          if (newAudioInputs[i] !== undefined) {
            var audioName = newAudioInputs[i].localName
              .replace("master", "M")
              .replace("busa", "A")
              .replace("busb", "B")
              .replace("busc", "C")
              .replace("busd", "D")
              .replace("buse", "E")
              .replace("busf", "F");
            var audioVolume = newAudioInputs[i].getAttribute("volume");
            var audioMuted = newAudioInputs[i].getAttribute("muted");
            newAudioObj = {
              busName: audioName,
              vol: audioVolume,
              muted: audioMuted,
            };
            audioArray.push(newAudioObj);
          }
        }
        // for (let j = 0; j < htmlResponseText.length; j++) {
        //   console.log(htmlResponseText[j]);
        // htmlResponseStreaming[0].textContent.toLocaleLowerCase()}
        commit("SET_VMIX_OVERLAY", inputOverlayData);
        commit("SET_VMIX_PRESET_CONTENT", inputArray);
        commit("IPADRESS", msg.vmixIP);
        commit("IPPORT", msg.port);
        commit(
          "STREAMING_STATUS",
          htmlResponseStreaming[0].textContent.toLocaleLowerCase()
        );
        commit("SENT_PREVIEW_AND_ACTIVE", {
          preview: htmlResponsePreviewInput[0].childNodes[0].data,
          programm: htmlResponseActiveInput[0].childNodes[0].data,
        });
        commit("SET_VMIX_PRESET_AUDIO", audioArray);
        commit("SET_VMIX_PRESET_TRANSITION", transitionData);
        commit("SET_VMIX_ACTIVE", msg);
        // \\
        if (htmlResponsePreset[0] === undefined)
          return commit("FILENAME", "Default");
        var presetName = htmlResponsePreset[0].innerHTML.split("/").pop();
        commit("FILENAME", presetName.replace(".vmix", " "));
      });
      this._vm.$socket.client.on("inactivePreset", function (msg) {
        commit("SET_VMIX_ACTIVE", msg);
      });
      // this._vm.$socket.client.on("snapshot", function (msg) {
      //   commit("SET_VMIX_SNAPSHOT", msg);
      // });
      // tally_lights
      // this._vm.$socket.client.on("tally_lights", function (msg) {
      //   console.log(msg.tallylights.length)
      // })
    },
    async sendVmixConnection({ commit }) {
      this._vm.$socket.client.on("vmixConnected", function (msg) {
        commit("SET_CONNECTION", msg);
        // this.vmixConnected = "online";
        // document.getElementsByClassName("status")[0].style.color = "green";
      });
      this._vm.$socket.client.on("vmixDisconnected", function (msg) {
        commit("SET_CONNECTION", msg);
        // commit("SET_VMIX_INACTIVE", msg);
        // this.vmixConnected = "offline";
        // document.getElementsByClassName("status")[0].style.color = "red";
      });
    },
  },
  modules: {},
});
