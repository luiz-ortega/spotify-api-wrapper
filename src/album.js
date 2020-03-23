import { API_URL, HEADERS } from './config';

export const getAlbum = (id) => fetch(
  `${API_URL}/album/${id}`, HEADERS,
);

export const getAlbums = (albums) => fetch(
  `${API_URL}/albums/?ids=${albums}`, HEADERS,
);

export const getAlbumTracks = (id) => fetch(
  `${API_URL}/album/${id}/tracks`, HEADERS,
);
