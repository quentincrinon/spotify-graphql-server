const resolvers = {
  Query: {
    track: async (_source, { track_id }, { dataSources }) =>
      dataSources.spotifyAPI.getTrack(track_id),
    audioFeatures: async (_source, { track_id }, { dataSources }) =>
      dataSources.spotifyAPI.getAudioFeatures(track_id)
  }
};

export default resolvers;
