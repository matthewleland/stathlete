// @desc    Get favorites
// @route   GET /api/favorites
// @access  Private

const getFavorites = async (req, res) => {
    res.status(200).json({ message: 'Get favorites' })
}

// @desc    Set favorite
// @route   POST /api/favorites
// @access  Private

const setFavorite = async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    res.status(200).json({ message: 'Set favorite' })
}

// @desc    Update favorite
// @route   PUT /api/favorites/:id
// @access  Private

const updateFavorite = async (req, res) => {
    res.status(200).json({ message: `Update favorite ${req.params.id}` })
}

// @desc    Delete favorite
// @route   DELETE /api/favorites/:id
// @access  Private

const deleteFavorite = async (req, res) => {
    res.status(200).json({ message: `Delete favorite ${req.params.id}` })
}

module.exports = {
    getFavorites,
    setFavorite,
    updateFavorite,
    deleteFavorite
}