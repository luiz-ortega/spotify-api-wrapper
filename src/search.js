import { API_URL, HEADERS } from './config';

export const search = (query, type) => fetch(
  `${API_URL}/search?q=${query}&type=${type}`, HEADERS,
);

export const searchArtists = (query) => search(query, 'artist');

export const searchAlbums = (query) => search(query, 'album');

export const searchTracks = (query) => search(query, 'tracks');

export const searchPlaylists = (query) => search(query, 'playlist');
