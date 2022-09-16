const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'bd5d86fe24a7413e8f262b2594da872e'
});

const handleImageDetection = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.imageUrl)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json('unable to work with API'))
}

module.exports = {
    handleImageDetection
}