const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./config/logger');
const { port, mongoUri } = require('./config/config');

const adminRoutes = require('./routes/adminRoutes');
const cashierRoutes = require('./routes/cashierRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
logger(app);

app.use('/api/auth', authRoutes); // Add auth routes
app.use('/api/admin', adminRoutes);
app.use('/api/cashier', cashierRoutes);


app.post('/api/auth/register', (req, res) => {
    // Your registration logic here
    res.send('admin register successfully!');
});

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
