var express = require("express");
var router = express.Router();
// const { Pool } = require("pg");
// var path = require("path");
var fs = require("fs");
const getSocketConnection = require("../config/websocket");
const { ConnectionTCP } = require("node-vmix");
const { readdir } = require("node:fs/promises");
const connection = new ConnectionTCP("127.0.0.1", {
  debug: false,
  connectOnInitialization: false,
});

getSocketConnection.ioConnection.on("connection", async (socket) => {
  socket.on("postCommand", function (msg) {
    console.log(msg);
    connection.send([{ Function: "QuickPlay", Input: msg }]);
  });
  socket.on("QuickPlayCommand", function (msg) {
    console.log(msg);
    connection.send([{ Function: "QuickPlay", Input: msg }]);
  });
  socket.on("playPauseCommand", function (key, val) {
    connection.send([{ Function: val, Input: key }]);
  });
  socket.on("postOverlayCommand", function (msg, overlayNumber) {
    connection.send([{ Function: "OverlayInput" + overlayNumber, Input: msg }]);
  });
  socket.on("CutCommand", function () {
    connection.send([{ Function: "Cut" }]);
  });
  socket.on("transitionCommand", function (msg) {
    connection.send([{ Function: msg }]);
  });
  socket.on("CommandAudioBus", function (bus, key) {
    connection.send([{ Function: "AudioBus", Input: key, Value: bus }]);
  });
  socket.on("changeVolume", function (vol, key) {
    console.log(vol);
    connection.send([{ Function: "SetVolume", Input: key, Value: vol }]);
  });
  socket.on("switchToPreviewCommand", function (msg) {
    connection.send([{ Function: "PreviewInput", Input: msg }]);
  });
  // StreamingSetURL StreamingSetKey
  socket.on("commandForStreamingURL", function (val) {
    connection.send([
      {
        Function: "StreamingSetURL",
        Value: val,
      },
    ]);
  });
  socket.on("commandForStreamingKey", function (val) {
    connection.send([
      {
        Function: "StreamingSetKey",
        Value: val,
      },
    ]);
  });
  socket.on("commandForStartStreaming", function () {
    connection.send([
      {
        Function: "StartStreaming",
        Value: "0",
      },
    ]);
  });
  socket.on("commandForStopStreaming", function () {
    connection.send([
      {
        Function: "StopStreaming",
        Value: "0",
      },
    ]);
  });
  socket.on("InputCommad", async (file, callback) => {
    // const logo = path.resolve("../../../../Documents/");
    // const localPath = path.resolve("../../../../Documents/files/");
    // connection.send([{ Function: "AddInput", Value: "Video|" + logo }]);
    // console.log(localPath)
    try {
      const files = await readdir("../../../../Documents/files");
      for (const file of files) console.log(file);
    } catch (err) {
      // console.error(err);
      // console.log(err);
      fs.mkdirSync("../../../../Documents/");
    }
  });
  socket.on("editTextCommand", function (key, headline, discription) {
    console.log(key, headline, discription);
    connection.send([
      {
        Function: "SetText",
        Input: key,
        SelectedName: "Headline.Text",
        Value: headline,
      },
      {
        Function: "SetText",
        Input: key,
        SelectedName: "Description.Text",
        Value: discription,
      },
    ]);
  });
  // socket.on("openPresetCommand", (msg) => {
  //   const localPath = path.resolve("./files/" + msg);
  //   if (connection.connected()) {
  //     connection.send([{ Function: "OpenPreset", Value: localPath }]);
  //   } else {
  //     exec(localPath, (err, stdout, stderr) => {
  //       if (err) {
  //         console.error(err);
  //         return;
  //       }
  //       console.log(stdout);
  //     });
  //   }
  // });
});
// { Function: 'SetText', Input: 'Jerry', SelectedName: 'Headline.Text', Value: 'Cool' }
router.get("/", async function (req, res, next) {
  var files = fs.readdirSync("./files");
  var snapshotIMG = fs.readdirSync("./snapshotfiles");
  res.json({ snap: snapshotIMG, preset: files });
});

router.post("/openpreset", async function (req, res, next) {
  console.log(req.body);
  connection.send([{ Function: "QuickPlay", Input: req.body.data }]);
  res.json("Test");
});

router.post("/", async function (req, res, next) {
  pool.query(
    "SELECT * FROM presetdata WHERE filename ",
    async (error, results) => {
      if (results === undefined)
        return res.json({ error: "Data dosn't exist." });
      console.log(results.rows);
    }
  );
});

router.delete("/delete", async function (req, res) {
  var name = "test2.vmix";
  pool.query(
    "DELETE FROM presetdata WHERE filename = $1 ",
    [name],
    async (error, results) => {
      if (results === undefined)
        return res.json({ error: "Data dosn't exist." });
      console.log(results.rows);
      res.json("Delete data");
    }
  );
});

async function getDataFromDB() {
  try {
    const res = await pool.query(
      "SELECT id, fileid, filename, filecontent FROM presetdata ORDER BY id ASC"
    );
    return res.rows;
  } catch (err) {
    return err.stack;
  }
}

module.exports = router;
