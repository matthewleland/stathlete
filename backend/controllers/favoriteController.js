// @desc    Get favorites
// @route   GET /api/favorites
// @access  Private

const getFavorites = (req, res) => {
    res.status(200).json({ message: 'Get favorites' })
}

// @desc    Set favorite
// @route   POST /api/favorites
// @access  Private

const setFavorite = (req, res) => {
    res.status(200).json({ message: 'Set favorite' })
}

// @desc    Update favorite
// @route   PUT /api/favorites/:id
// @access  Private

const updateFavorite = (req, res) => {
    res.status(200).json({ message: `Update favorite ${req.params.id}` })
}

// @desc    Delete favorite
// @route   DELETE /api/favorites/:id
// @access  Private

const deleteFavorite = (req, res) => {
    res.status(200).json({ message: `Delete favorite ${req.params.id}` })
}

module.exports = {
    getFavorites,
    setFavorite,
    updateFavorite,
    deleteFavorite
}