const resolvers = {
  Query: {
    currentUserAlbums: async (_source, args, { dataSources }) =>
      dataSources.spotifyAPI.getCurrentUserAlbums(args),
    currentUserTracks: async (_source, args, { dataSources }) =>
      dataSources.spotifyAPI.getCurrentUserTracks(args)
  },
  Mutation: {
    addCurrentUserAlbums: async (_source, { ids }, { dataSources }) =>
      dataSources.spotifyAPI.addCurrentUserAlbums(ids),
    addCurrentUserTracks: async (_source, { ids }, { dataSources }) =>
      dataSources.spotifyAPI.addCurrentUserTracks(ids),
    removeCurrentUserAlbums: async (_source, { ids }, { dataSources }) =>
      dataSources.spotifyAPI.removeCurrentUserAlbums(ids),
    removeCurrentUserTracks: async (_source, { ids }, { dataSources }) =>
      dataSources.spotifyAPI.removeCurrentUserTracks(ids)
  }
};

export default resolvers;
