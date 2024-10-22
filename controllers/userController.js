const {  UserModel } = require("../postgres/postgres");

// Create a new user
exports.createUser = async (req, res) => {
    const { username, email } = req.body;
      
    try {
       
        const newUser = await UserModel.create({ username, email });
        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        console.log(error.message, "error");
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
