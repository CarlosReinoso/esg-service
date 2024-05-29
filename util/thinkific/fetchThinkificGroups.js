const { thinkificAPI } = require("../../lib/axiosConfig");

const fetchThinkificGroups = async () => {
  try {
    let allUsers = [];
    let currentPage = 1;

    do {
      const response = await thinkificAPI.get(`/groups`);
      console.log(
        "🚀 ~ fetchOxxoUsersFromGroup ~ response:",
        response.data.items
      );
      currentPage = response.data.meta.pagination.next_page;
    } while (currentPage);

    return allUsers;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Re-throw the error to handle it in the caller function
  }
};
