const resolvers = {
  Query: {
    artist: async (_source, { artist_id }, { dataSources }) =>
      dataSources.spotifyAPI.getArtist(artist_id)
  },
  Artist: {
    albums: async (artist, _args, { dataSources }) =>
      dataSources.spotifyAPI.getArtistAlbums(artist.id),
    related_artists: async (artist, _args, { dataSources }) =>
      dataSources.spotifyAPI.getRelatedArtists(artist.id),
    top_tracks: async (artist, { country }, { dataSources }) =>
      dataSources.spotifyAPI.getArtistsTopTracks(artist.id, country)
  }
};

export default resolvers;
