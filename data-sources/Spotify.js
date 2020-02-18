import { RESTDataSource } from 'apollo-datasource-rest';
import { optionsToQueryString } from './helpers';

class SpotifyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spotify.com/v1/';
  }

  willSendRequest(request) {
    request.headers.set('Authorization', 'Bearer ' + this.context.authToken);
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

  async getCurrentUserPlaylists() {
    console.log(`getCurrentUserPlaylists`);

    const playlists = await this.get(`/me/playlists`);

    return playlists.items;
  }

  async getUserPlaylists(user_id) {
    console.log(`getUserPlaylists: ${user_id}`);

    const playlists = await this.get(`/users/${user_id}/playlists`);

    return playlists.items;
  }

  async createPlaylist(user_id, options) {
    console.log(`createPlaylist: ${options.name}`);

    console.log({ ...options });

    const playlist = await this.post(`/users/${user_id}/playlists`, {
      ...options
    });

    console.log(playlist);

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

  /**
   *
   * BROWSE
   */

  async getCategories(args) {
    console.log(`getCategories`);

    const response = await this.get(
      `/browse/categories?${optionsToQueryString(args)}`
    );

    return response.categories.items;
  }

  async getCategory(category_id) {
    console.log(`getCategory: ${category_id}`);

    const category = await this.get(`/browse/categories/${category_id}`);

    return category;
  }

  async getCategoryPlaylists(category_id, args) {
    console.log(`getCategoryPlaylists: ${category_id}`);

    const response = await this.get(
      `/browse/categories/${category_id}/playlists?${optionsToQueryString(
        args
      )}`
    );

    return response.playlists.items;
  }

  async getFeaturedPlaylists(args) {
    console.log(`getFeaturedPlaylists`);

    const response = await this.get(
      `/browse/featured-playlists?${optionsToQueryString(args)}`
    );

    return {
      message: response.message,
      playlists: response.playlists.items
    };
  }

  async getNewReleases(args) {
    console.log(`getNewReleases`);

    const response = await this.get(
      `/browse/new-releases?${optionsToQueryString(args)}`
    );

    return {
      message: response.message,
      albums: response.albums.items
    };
  }

  /**
   *
   * LIBRARY
   */

  async getCurrentUserAlbums(args) {
    console.log(`getCurrentUserAlbums`);

    const response = await this.get(`/me/albums?${optionsToQueryString(args)}`);

    return response.items;
  }

  async getCurrentUserTracks(args) {
    console.log(`getCurrentUserTracks`);

    const response = await this.get(`/me/tracks?${optionsToQueryString(args)}`);

    return response.items;
  }

  async addCurrentUserAlbums(ids) {
    console.log(`addCurrentUserAlbums`);

    const response = await this.put(`/me/albums?ids=${ids}`);

    return response;
  }

  async addCurrentUserTracks(ids) {
    console.log(`addCurrentUserTracks`);

    const response = await this.put(`/me/tracks?ids=${ids}`);

    return response;
  }

  async removeCurrentUserAlbums(ids) {
    console.log(`removeCurrentUserAlbums`);

    const response = await this.delete(`/me/albums?ids=${ids}`);

    return response;
  }

  async removeCurrentUserTracks(ids) {
    console.log(`removeCurrentUserTracks`);

    const response = await this.delete(`/me/tracks?ids=${ids}`);

    return response;
  }
}

export default SpotifyAPI;
