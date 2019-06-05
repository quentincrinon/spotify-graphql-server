import { RESTDataSource } from 'apollo-datasource-rest';
import client_credentials from './clientCredentials';

let awaitingAuthorization;

const getToken = () => {
  if (awaitingAuthorization && !client_credentials.isExpired()) {
    // use existing promise, if not expired
    return awaitingAuthorization;
  }
  if (!awaitingAuthorization || client_credentials.isExpired()) {
    awaitingAuthorization = new Promise((resolve, reject) => {
      client_credentials
        .authenticate()
        .then(token => {
          token = 'Bearer ' + token.access_token;
          resolve(token);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  return awaitingAuthorization;
};

class SpotifyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spotify.com/v1/';
  }

  async willSendRequest(request) {
    request.headers.set('Authorization', await getToken());
  }

  /**
   *
   * USER
   */

  async getUserDetails(user_id) {
    console.log(`getUserDetails: ${user_id}`);

    const user = await this.get(`users/${user_id}`);

    return user;
  }

  async getCurrentUser() {
    console.log(`getCurrentUser`);

    const user = await this.get(`me`);

    return user;
  }

  /**
   *
   * ARTIST
   */

  async getArtist(artist_id) {
    console.log(`getArtist: ${artist_id}`);

    const artist = await this.get(`/artists/${artist_id}`);

    return artist;
  }

  async getArtistAlbums(artist_id) {
    console.log(`getArtistAlbums: ${artist_id}`);

    const albums = await this.get(`/artists/${artist_id}/albums`);

    return albums;
  }

  async getRelatedArtists(artist_id) {
    console.log(`getRelatedArtists: ${artist_id}`);

    const related_artists = await this.get(
      `/artists/${artist_id}/related-artists`
    );

    return related_artists.artists;
  }

  async getArtistsTopTracks(artist_id, country) {
    console.log(`getRelatedArtists: ${artist_id}`);

    const top_tracks = await this.get(
      `/artists/${artist_id}/top-tracks?country=${country}`
    );

    return top_tracks.tracks;
  }

  /**
   *
   * ALBUM
   */

  async getAlbum(album_id) {
    console.log(`getAlbum: ${album_id}`);

    const album = await this.get(`/albums/${album_id}`);

    return album;
  }

  async getAlbumTracks(album_id) {
    console.log(`getAlbumTracks: ${album_id}`);

    const tracks = await this.get(`/albums/${album_id}/tracks`);

    return tracks.items;
  }

  /**
   *
   * TRACK
   */

  async getTrack(track_id) {
    console.log(`getTrack: ${track_id}`);

    const track = await this.get(`/tracks/${track_id}`);

    return track;
  }

  async getAudioFeatures(track_id) {
    console.log(`getAudioFeatures: ${track_id}`);

    const features = await this.get(`/audio-features/${track_id}`);

    return features;
  }

  /**
   *
   * PLAYLIST
   */

  async getPlaylist(playlist_id) {
    console.log(`getPlaylist: ${playlist_id}`);

    const playlist = await this.get(`/playlists/${playlist_id}`);

    return playlist;
  }

  async getUserPlaylists(user_id) {
    console.log(`getUserPlaylists: ${user_id}`);

    const playlists = await this.get(`/users/${user_id}/playlists`);

    return playlists.items;
  }

  async createPlaylist(options) {
    console.log(`createPlaylist: ${options.name}`);

    const playlist = await this.post(`/playlists`, {
      ...options
    });

    return playlist;
  }

  async updatePlaylistDetails(playlist_id, options) {
    console.log(`updatePlaylist: ${playlist_id} - ${options.name}`);

    const playlist = await this.put(`/playlists/${playlist_id}`, {
      ...options
    });

    return playlist;
  }

  async addTracksToPlaylist(playlist_id, params) {
    console.log(`addTracksToPlaylist: ${playlist_id}`);

    const response = await this.post(`/playlists/${playlist_id}/tracks`, {
      ...params
    });

    return response.snapshot_id;
  }

  async deletePlaylistTracks(playlist_id, tracks) {
    console.log(`deletePlaylistTracks: ${playlist_id}`);

    const response = await this.delete(`/playlists/${playlist_id}/tracks`, {
      tracks
    });

    return response.snapshot_id;
  }

  async reorderTracks(playlist_id, options) {
    console.log(`reorderTracks: ${playlist_id}`);

    const response = await this.put(`/playlists/${playlist_id}/tracks`, {
      ...options
    });

    return response.snapshot_id;
  }
}

export default SpotifyAPI;
