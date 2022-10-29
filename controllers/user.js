const userController = {
    index: (req, res) => {
        res.json(req.user);
    }
};

module.exports = userController;