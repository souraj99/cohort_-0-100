import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcrypt';

dotenv.config();
const jwtSecret = process.env.NODE_JWT_SECRET;
const defaultPort = process.env.NODE_DEFAULT_PORT;
const tableUrl = process.env.NODE_DB_URL
const salt = 10;
const port = defaultPort || 3000;
const hashedPassFn = (password) => bcrypt.hash(password.toString(), salt)
const app = express();
app.use(express.json());


mongoose.connect(tableUrl)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},

}, {collection: 'users'})
const User = mongoose.model("User", userSchema);

app.post('/signUp', async (req, res) => {
    const {username, password, email} = req.body;
    const hashedPassword = await hashedPassFn(password);
    try {

        const existingUser = await User.findOne({email});
        // console.log(existingUser.get("email"));
        if (existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }

        const createUser = new User({
            username: username,
            password: hashedPassword,
            email: email
        });

        await createUser.save();

        res.json({message: 'User created successfully'});

    } catch (err) {
        res.status(500).json({message: `Failed to create user,  ${err.message}`});
    }

})

const verifyUserLogin = async (username, password) => {
    try {
        const user = await User.findOne({username: username}).lean();
        if (!user) {
            return {status: 404, message: 'User not found'};
        }
        console.log(password, user.password);
        const hashedPassword = await bcrypt.compare(password.toString(), user.password);
        if (hashedPassword) {
            const token = jwt.sign({
                id: user.id,
                username: user.username,
                email: user.email,
                type: 'user'
            }, jwtSecret, {expiresIn: '1h'});
            return {status: 200, data:{token: token}}
        }
        return {status: 400, error: 'invalid password'}
    } catch (err) {
        return {message: `error ${err}`}
    }
}

app.post('/signin', async (req, res) => {
    const {username, password} = req.body;

    const response = await verifyUserLogin(username, password);
    if (response.status === 200) {
        res.json(response.data)
    } else {
        res.json(response)
    }
})


const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, jwtSecret);
        return { isValid: true, username: decoded.username, type: decoded.type };
    } catch (error) {
        console.log(JSON.stringify(error), "error");
        return { isValid: false };
    }
};


app.get('/getUserDetails', async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({message: 'No token provided'});
    }
    try {
        const {username, isValid} = verifyToken(token);
        if(isValid){
            const userDetails = await User.findOne({username}, {"email": 1, "username": 1});
            if (!userDetails) {
                return res.status(404).json({message: 'User not found'});
            }
            res.status(200).json({
                message: "Details fetched successfully",
                username: userDetails.username,
                email: userDetails.email
            })
        }else {
            res.status(401).json({message: 'Invalid token'});
        }

    } catch (error) {
        res.status(500).json({message: 'Internal server error', error: error});
    }

})


app.listen(port, () => {
    console.log(`Connecting to port ${port}`);
})