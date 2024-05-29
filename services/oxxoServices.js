const { thinkificAPI } = require("../lib/axiosConfig");

// Function to fetch users from Thinkific API
const fetchOxxoUsersFromGroup = async (group) => {
  try {
    let allUsers = [];
    let currentPage = 1;

    do {
      const response = await thinkificAPI.get(
        `/users?page=1&limit=25&query%5Bgroup_id%5D=${group}'`
      );

      const users = response.data.items;
      allUsers = allUsers.concat(users);

      currentPage = response.data.meta.pagination.next_page;
    } while (currentPage);

    return allUsers;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Re-throw the error to handle it in the caller function
  }
};

module.exports = {
  fetchOxxoUsersFromGroup,
};
