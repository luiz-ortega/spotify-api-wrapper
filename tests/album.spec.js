// getAlbum
// getAlbumTracks

import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { getAlbum, getAlbumTracks } from '../src/album';

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

  describe('getAlbums', () => {
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
});
