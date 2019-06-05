import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    playlist(playlist_id: String!): Playlist
    userPlaylists(user_id: String!): [SimplifiedPlaylist]
  }

  extend type Mutation {
    createPlaylist(options: PlaylistInput!): Playlist
    updatePlaylistDetails(
      playlist_id: String!
      options: PlaylistInput!
    ): Playlist
    addTracksToPlaylist(
      playlist_id: String!
      uris: String
      position: Int
    ): String
    deletePlaylistTracks(playlist_id: String!, tracks: [TrackInput]!): String
    reorderTracks(
      playlist_id: String!
      range_start: Int!
      range_length: Int!
      insert_before: Int!
    ): String
  }

  type Playlist {
    id: String!
    collaborative: Boolean!
    description: String!
    external_urls: Url!
    followers: Followers
    href: String!
    images: [Image]
    name: String!
    owner: User
    public: Boolean
    snapshot_id: String!
    tracks: [PlaylistTracks]
    type: String!
    uri: String!
  }

  type PlaylistTracks {
    added_at: String
    added_by: User
    is_local: Boolean
    track: Track!
  }

  type SimplifiedPlaylist {
    id: String!
    collaborative: Boolean!
    external_urls: Url!
    href: String!
    images: [Image]
    name: String!
    owner: User
    public: Boolean
    snapshot_id: String!
    tracks: SimplifiedTracks
    type: String!
    uri: String!
  }

  type SimplifiedTracks {
    href: String!
    total: Int!
  }

  input PlaylistInput {
    name: String!
    description: String!
    public: Boolean = false
  }

  input TrackInput {
    uri: String!
  }
`;

export default typeDefs;
