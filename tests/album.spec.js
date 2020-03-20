// getAlbum
// getAlbumTracks

import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { getAlbum, getAlbums, getAlbumTracks } from '../src/album';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Album', () => {
  let stubedFetch;
  let promise;

  beforeEach(() => {
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.resolves({ json: () => { 'json'; } });
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  describe('smoke tests', () => {
    it('should getAlbum method', () => {
      expect(getAlbum).to.exist;
    });

    it('should getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = getAlbum();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    // verifica se o fetch ocorre com a url desejada
    it('should call fetch with the correct URL', () => {
      const album = getAlbum('1klALx0u4AavZNEvC4LrTL');
      expect(stubedFetch).to.have.been.calledWith('https://open.spotify.com/album/1klALx0u4AavZNEvC4LrTL');

      const album2 = getAlbum('1klALx0u4AavZNEvC4LrTl');
      expect(stubedFetch).to.have.been.calledWith('https://open.spotify.com/album/1klALx0u4AavZNEvC4LrTl');
    });
    // verifica se o dado é recebido pela Promise
    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });

      const album = getAlbum('1klALx0u4AavZNEvC4LrTL');
      album.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      });
    });
  });

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      const albums = getAlbums();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albums = getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '1klALx0u4AavZNEvC4LrTL']);
      expect(stubedFetch).to.have.been
        .calledWith('https://open.spotify.com/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,1klALx0u4AavZNEvC4LrTL');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });
      const albums = getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '1klALx0u4AavZNEvC4LrTL']);
      albums.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      });
    });
  });

  describe('getTracks', () => {
    it('should call fetch method', () => {
      const tracks = getAlbumTracks();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const tracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
      expect(stubedFetch).to.have.been
        .calledWith('https://open.spotify.com/album/4aawyAB9vmqN3uQ7FjRGTy/tracks');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });
      const tracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
      tracks.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      });
    });
  });
});
