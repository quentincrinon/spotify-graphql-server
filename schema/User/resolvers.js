const resolvers = {
  Query: {
    user: async (_source, { user_id }, { dataSources }) =>
      dataSources.spotifyAPI.getUserDetails(user_id),
    me: async (_source, {}, { dataSources }) =>
      dataSources.spotifyAPI.getCurrentUser()
  }
};

export default resolvers;
