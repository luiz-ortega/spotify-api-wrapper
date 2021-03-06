"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlbumTracks = exports.getAlbums = exports.getAlbum = void 0;

var _config = require("./config");

var getAlbum = function getAlbum(id) {
  return fetch("".concat(_config.API_URL, "/album/").concat(id), _config.HEADERS);
};

exports.getAlbum = getAlbum;

var getAlbums = function getAlbums(albums) {
  return fetch("".concat(_config.API_URL, "/albums/?ids=").concat(albums), _config.HEADERS);
};

exports.getAlbums = getAlbums;

var getAlbumTracks = function getAlbumTracks(id) {
  return fetch("".concat(_config.API_URL, "/album/").concat(id, "/tracks"), _config.HEADERS);
};

exports.getAlbumTracks = getAlbumTracks;