const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost/usersFluxua', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log('Database is conected'));
