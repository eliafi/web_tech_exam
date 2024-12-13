const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const path = require('path');
const app = express();
// const port = 5000; // Changed port to 5000

const port = process.env.PORT || 5000; // Use process.env.PORT for Heroku

app.use(cors()); // Use cors
app.use(bodyParser.json());
app.use(express.static('public'));

// Connect to MongoDB Atlas
const mongoURI = 'mongodb+srv://eliayekpley:zbEMqHN7P2ytjK0c@cluster0.i3vlf.mongodb.net/event_management?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB Atlas');
});

// Define schemas and models
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    preferences: [String],
    isAdmin: Boolean, // Add isAdmin field
    rsvps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }] // Add rsvps field
});

const eventSchema = new mongoose.Schema({
    name: String,
    date: String,
    time: String,
    location: String,
    description: String,
    capacity: Number
});

const User = mongoose.model('User', userSchema);
const Event = mongoose.model('Event', eventSchema);

app.post('/api/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: 'User registered' });
    } catch (err) {
        res.status(500).json({ error: 'Error registering user' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        res.status(500).json({ error: 'Error logging in' });
    }
});

app.get('/api/events', async (req, res) => {
    try {
        const events = await Event.find({});
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching events' });
    }
});

app.get('/api/events/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        res.json(event);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching event details' });
    }
});

app.post('/api/events', async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json({ message: 'Event added' });
    } catch (err) {
        res.status(500).json({ error: 'Error adding event' });
    }
});

app.delete('/api/events/:id', async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Event deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting event' });
    }
});

app.post('/api/events/:id/rsvp', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        const user = await User.findById(req.body.userId);

        if (event.capacity > 0) {
            event.capacity -= 1;
            await event.save();

            user.rsvps.push(event._id);
            await user.save();

            res.status(200).json({ message: 'RSVP successful', user });
        } else {
            res.status(400).json({ error: 'No available seats' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error processing RSVP' });
    }
});

// Serve the index.html file for any other requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});