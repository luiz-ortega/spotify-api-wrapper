import { searchAlbums } from '../src/main';

global.fetch = require('node-fetch');

const albums = searchAlbums('beatles');

albums.then((data) => console.log(data));
