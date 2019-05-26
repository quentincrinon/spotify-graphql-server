const resolvers = {
  Query: {
    user: async (_source, { user_id }, { dataSources }) =>
      dataSources.spotifyAPI.getUserDetails(user_id)
  }
};

export default resolvers;
