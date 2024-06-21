import asyncHandler from "express-async-handler";
import User from '../models/user.js';

const getUser = asyncHandler(async (req, res, next) => {
      const username = "Izaz"; // Assuming you have logic to get the username
      const user = await User.getUserByName(username);
      if (!user) {
        throw new Error('User not found');
      }
      res.send(user.name);
});  

export default {
    getUser
};