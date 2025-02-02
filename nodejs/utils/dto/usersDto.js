const userDTO = (user) => {
    return {
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
    };
};

module.exports = { userDTO };
