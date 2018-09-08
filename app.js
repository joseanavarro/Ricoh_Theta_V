"use strict";

//
// app.js
//

const express = require("express");
var cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


//=============================================================================
// Mensajes POST
//=============================================================================

//----------------------------
// estado de la cámara
//----------------------------
app.post("/osc/state", function (req, res) {
  let data = {
    fingerprint: "FIG_0007",
    state: {
      batteryLevel: 0.67,
      storageUri: "http://192.168.1.1/files/744a605553442020104bd7925300fc01/",
      _captureStatus: "idle",
      _recordedTime: 0,
      _recordableTime: 0,
      _compositeShootingElapsedTime: 0,
      _latestFileUrl: "http://192.168.1.1/files/744a605553442020104bd7925300fc01/100RICOH/R0010059.JPG",
      _batteryState: "disconnect",
      _apiVersion: 2
    }
  };
  res.status(200).send(data);
});

//----------------------------------
// estado de ejecución de una foto
//----------------------------------
app.post("/osc/commands/status", function (req, res) {

  let data = {
    id: "151",
    name: "camera.takePicture",
    progress: {
      "completion": 0
    },
    state: "inProgress"
  };

  let data2 = {
    name: "camera.takePicture",
    results: {
      "fileUrl": "https://4040-b8065f34-d9af-46fa-901d-12b28ccd0e5d.ws-eu.gitpod.io/files/R0010043.JPG"
    },
    state: "done"
  };

  res.status(200).send(data2);
});


app.post("/osc/commands/execute/", function (req, res) {
  // Tomar el comando que envía la App
  let command = req.body.name;
  let data;
  // Preparar una respuesta en función del comando recibido

  switch (command) {
    //----------------------------
    // Iniciar sesión
    //----------------------------
    case "camera.startSession":
      data = {
        name: "camera.startSession",
        parameters: {}
      };
      break;

      //----------------------------
      // Fijar opciones
      //----------------------------
    case "camera.setOptions":
      data = {
        name: "camera.setOptions",
        state: "done"
      };
      break;

      //----------------------------
      // Borrar fotos en la cámara
      //----------------------------
    case "camera.delete":
      data = {
        name: "camera.delete",
        state: "done"
      };
      break;

      //----------------------------
      // tomar foto
      //----------------------------
    case "camera.takePicture":
      data = {
        id: "151",
        name: "camera.takePicture",
        progress: {
          "completion": 0
        },
        state: "inProgress"
      };
      break;


      //----------------------------
      // Listar fotos
      //----------------------------
    case "camera.listFiles":
      // No hay fotos
      data = {
        name: "camera.listFiles",
        results: {
          entries: [],
          totalEntries: 0
        },
        state: "done"
      };
      // Sí hay fotos
      data = {
        name: "camera.listFiles",
        results: {
          entries: [{
              _projectionType: "Equirectangular",
              _thumbSize: 10078,
              dateTimeZone: "2018:05:05 13:34:44+02:00",
              fileUrl: "https://4040-b8065f34-d9af-46fa-901d-12b28ccd0e5d.ws-eu.gitpod.io/files/R0010043.JPG",
              height: 2688,
              isProcessed: true,
              lat: 41.3764,
              lng: 2.1603,
              name: "R0010043.JPG",
              previewUrl: "",
              size: 3103979,
              thumbnail: "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",
              width: 5376,
            },
            {
              dateTimeZone: "2017:12:19 19:23:50+01:00",
              fileUrl: "http://192.168.1.1/files/150100525831424d42079f61a8a7c300/100RICOH/R0010151.JPG",
              height: 2688,
              isProcessed: "true",
              name: "R0010151.JPG",
              previewUrl: "",
              _projectionType: "Equirectangular",
              size: 1897771,
              _thumbSize: 9272,
              width: 5376
            },
            {
              dateTimeZone: "2017:12:19 19:23:23+01:00",
              fileUrl: "http://192.168.1.1/files/150100525831424d42079f61a8a7c300/100RICOH/R0010150.JPG",
              height: 2688,
              isProcessed: "true",
              name: "R0010150.JPG",
              previewUrl: "",
              _projectionType: "Equirectangular",
              size: 1896828,
              _thumbSize: 9308,
              width: 5376
            },
            {
              dateTimeZone: "2017:12:19 19:21:57+01:00",
              fileUrl: "http://192.168.1.1/files/150100525831424d42079f61a8a7c300/100RICOH/R0010149.JPG",
              height: 2688,
              isProcessed: "true",
              name: "R0010149.JPG",
              previewUrl: "",
              _projectionType: "Equirectangular",
              size: 1896516,
              _thumbSize: 9284,
              width: 5376
            }
          ],
          totalEntries: 5
        },
        state: "done"
      };

      break;

    default:
      //...
      data = {
        response: "You sent: " + req.body.name
      };
  }

  res.status(200).send(data);
});

//=============================================================================
// Mensajes GET
//=============================================================================

//--------------------------------
// información de la cámara
//--------------------------------
app.get("/osc/info", function (req, res) {
  let data = {
    api: [
      "/osc/info",
      "/osc/state",
      "/osc/checkForUpdates",
      "/osc/commands/execute",
      "/osc/commands/status"
    ],
    apiLevel: [2],
    _bluetoothMacAddress: "00:26:73:D5:43:D0",
    endpoints: {
      httpPort: 80,
      httpUpdatesPort: 80
    },
    firmwareVersion: "2.11.1",
    gps: false,
    gyro: true,
    manufacturer: "RICOH",
    model: "RICOH THETA V",
    serialNumber: "00104579",
    supportUrl: "https://theta360.com/en/support/",
    uptime: 361,
    _wlanMacAddress: "00:26:73:D5:A1:F4"
  };
  res.status(200).send(data);
});

//-----------------------------------------------
// files
//-----------------------------------------------
app.get('/files/:name', function (req, res, next) {

  var options = {
    root: __dirname + '/',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };

  var fileName = 'files/' + req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  });

});


module.exports = app;