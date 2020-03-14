import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';


import {
  search, searchArtists, searchAlbums, searchTracks, searchPlaylists,
} from '../src/main';

global.fetch = require('node-fetch');

chai.use(sinonChai);

// search (generic) - + de 1 tipo
// searchAlbums
// searchArtists
// searchTracks
// searchPlaylists

describe('Spotify Wrapper', () => {
  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.resolves({ json: () => { 'json'; } });
  });

  afterEach(() => {
    fetchedStub.restore();
  });

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
    it('should call fetch function', () => {
      const artists = search();

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        const artists = search('beatles', 'artist');
        expect(fetchedStub).to.have.been
          .calledWith(
            'https://api.spotify.com/v1/search?q=beatles&type=artist',
          );

        const albums = search('beatles', 'album');
        expect(fetchedStub).to.have.been
          .calledWith(
            'https://api.spotify.com/v1/search?q=beatles&type=album',
          );
      });
      context('passing more than one type', () => {
        const artistsAndAlbum = search('beatles', ['artist', 'album']);

        expect(fetchedStub).to.have.been
          .calledWith(
            'https://api.spotify.com/v1/search?q=beatles&type=artist,album',
          );
      });
    });

    it('should return the JSON data from the promise', () => {
      promise.resolves({ body: 'json' });
      const artists = search('beatles', 'artist');

      artists.then((data) => {
        expect(data).to.be.eql({ body: 'json' });
      });
    });
  });

  describe('searchArtists', () => {
    it('should call fetch function', () => {
      const artists = searchArtists('beatles');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artist = searchArtists('beatles');
      artist.then((data) => {
        expect(data).to.have.been.calledWith(
          'https://api.spotify/v1/search?q=beatles&type=artist',
        );
      }).catch((err) => err);


      const artist2 = searchArtists('dylan');
      artist2.then((data) => {
        expect(data).to.have.been.calledWith(
          'https://api.spotify/v1/search?q=dylan&type=artist',
        );
      }).catch((err) => err);
    });
  });

  describe('searchAlbums', () => {
    it('should call fetch function', () => {
      const albums = searchAlbums('dookie');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albums = searchAlbums('dookey');
      albums.then((data) => {
        expect(data).to.have.been.calledWith(
          'https://api.spotify/v1/search?q=dookey&type=album',
        );
      }).catch((err) => err);


      const albums2 = searchAlbums('one');
      albums2.then((data) => {
        expect(data).to.have.been.calledWith(
          'https://api.spotify/v1/search?q=one&type=album',
        );
      }).catch((err) => err);
    });
  });

  describe('searchTracks', () => {
    it('should call fetch function', () => {
      const tracks = searchTracks('dookie');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const tracks = searchTracks('dookey');
      tracks.then((data) => {
        expect(data).to.have.been.calledWith(
          'https://api.spotify/v1/search?q=dookey&type=track',
        );
      }).catch((err) => err);


      const tracks2 = searchTracks('one');
      tracks2.then((data) => {
        expect(data).to.have.been.calledWith(
          'https://api.spotify/v1/search?q=one&type=track',
        );
      }).catch((err) => err);
    });
  });

  describe('searchPlaylists', () => {
    it('should call fetch function', () => {
      const playlists = searchPlaylists('dookie');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const playlists = searchPlaylists('dookey');
      playlists.then((data) => {
        expect(data).to.have.been.calledWith(
          'https://api.spotify/v1/search?q=dookey&type=playlist',
        );
      }).catch((err) => err);


      const playlists2 = searchPlaylists('one');
      playlists2.then((data) => {
        expect(data).to.have.been.calledWith(
          'https://api.spotify/v1/search?q=one&type=playlist',
        );
      }).catch((err) => err);
    });
  });
});
