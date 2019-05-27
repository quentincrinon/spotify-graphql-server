const resolvers = {
  Query: {
    album: async (_source, { album_id }, { dataSources }) =>
      dataSources.spotifyAPI.getAlbum(album_id)
  },
  Album: {
    tracks: async (album, _args, { dataSources }) =>
      dataSources.spotifyAPI.getAlbumTracks(album.id)
  }
};

export default resolvers;
