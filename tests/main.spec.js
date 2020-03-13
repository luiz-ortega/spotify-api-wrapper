import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import {
  search, searchAlbums, searchArtists, searchTracks, searchPlaylists,
} from '../src/main';

global.fetch = require('node-fetch');

chai.use(sinonChai);
sinonStubPromise(sinon);

describe('Spotify Wrapper', () => {
  // search (generic) - + de 1 tipo
  // searchAlbums
  // searchArtists
  // searchTracks
  // searchPlaylists
  describe('smoke tests', () => {
    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic Search', () => {
    let fetchedStub;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it('should call fetch function', () => {
      const artists = search();

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        const artists = search('beatles', 'artist');

        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=beatles&type=artist');

        const albums = search('beatles', 'album');

        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=beatles&type=album');
      });
      context('passing more than one type', () => {
        const artistsAndAlbum = search('beatles', ['artist', 'album']);

        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=beatles&type=artist,album');
      });
    });
  });
});
