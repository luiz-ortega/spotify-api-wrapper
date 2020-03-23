import { API_URL } from './config';

export const search = (query, type) => fetch(
  `${API_URL}/search?q=${query}&type=${type}`,
);

export const searchArtists = (query) => search(query, 'artist');

export const searchAlbums = (query) => search(query, 'album');

export const searchTracks = (query) => search(query, 'tracks');

export const searchPlaylists = (query) => search(query, 'playlist');
