import User from "../models/user.model.js";


export const getUsers = async (req, res) => {
    try {
        const loggedInUserId = req.userId;

        // Finding all users in the DB in exception of the one who's logged in / authenticated
        const filteredUsers = await User.find({
            _id: { $ne: loggedInUserId },
        }).select("-password");

        return res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsers:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
