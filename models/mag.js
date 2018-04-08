let mongoose = require(`mongoose`);

let MAGSchema = new mongoose.Schema({
    topic: { type: "String", required: true },
    title: { type: "String", required: true },
    description: { type: "String", required: true },
    date: { type: "String", required: true },
    time: { type: "String", required: true },
    place: { type: "String", required: true },
    people: [{ type : "ObjectId", ref: 'User' }]
});

module.exports = mongoose.model('MAG', MAGSchema, 'mags');