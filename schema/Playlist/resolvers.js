const resolvers = {
  Query: {
    playlist: async (_source, { playlist_id }, { dataSources }) =>
      dataSources.spotifyAPI.getPlaylist(playlist_id),
    userPlaylists: async (_source, { user_id }, { dataSources }) =>
      dataSources.spotifyAPI.getUserPlaylists(user_id),
    currentUserPlaylists: async (_source, _args, { dataSources }) =>
      dataSources.spotifyAPI.getCurrentUserPlaylists()
  },
  Mutation: {
    createPlaylist: (_source, { user_id, options }, { dataSources }) =>
      dataSources.spotifyAPI.createPlaylist(user_id, options),
    updatePlaylistDetails: (
      _source,
      { playlist_id, options },
      { dataSources }
    ) => dataSources.spotifyAPI.updatePlaylistDetails(playlist_id, options),
    addTracksToPlaylist: (
      _source,
      { playlist_id, ...params },
      { dataSources }
    ) => dataSources.spotifyAPI.addTracksToPlaylist(playlist_id, params),
    deletePlaylistTracks: (_source, { playlist_id, tracks }, { dataSources }) =>
      dataSources.spotifyAPI.deletePlaylistTracks(playlist_id, tracks),
    reorderTracks: (_source, { playlist_id, ...params }, { dataSources }) =>
      dataSources.spotifyAPI.reorderTracks(playlist_id, params)
  },
  Playlist: {
    tracks: playlist => playlist.tracks.items
  }
};

export default resolvers;
