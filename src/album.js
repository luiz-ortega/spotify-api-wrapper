export const getAlbum = (id) => fetch(
  `https://open.spotify.com/album/${id}`,
).then((data) => data);

export const getAlbumTracks = () => {};
