import { API_URL } from './config';

export const getAlbum = (id) => fetch(
  `${API_URL}/album/${id}`,
);

export const getAlbums = (albums) => fetch(
  `${API_URL}/albums/?ids=${albums}`,
);

export const getAlbumTracks = (id) => fetch(
  `${API_URL}/album/${id}/tracks`,
);
