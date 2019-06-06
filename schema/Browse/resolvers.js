const resolvers = {
  Query: {
    categories: async (_source, args, { dataSources }) =>
      dataSources.spotifyAPI.getCategories(args),
    category: async (_source, { category_id }, { dataSources }) =>
      dataSources.spotifyAPI.getCategory(category_id),
    featured_playlists: async (_source, args, { dataSources }) =>
      dataSources.spotifyAPI.getFeaturedPlaylists(args),
    new_releases: async (_source, args, { dataSources }) =>
      dataSources.spotifyAPI.getNewReleases(args)
  },
  Category: {
    playlists: async (category, args, { dataSources }) =>
      dataSources.spotifyAPI.getCategoryPlaylists(category.id, args)
  }
};

export default resolvers;
