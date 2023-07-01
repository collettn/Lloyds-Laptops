import User from '../models/users.js'
import Laptop from '../models/laptops.js'

const showHome = (req, res, next) => {
    res.render("home")
}

// ** User Functions **
// Render New User Form
const newUser = (req, res, next) => {
    //console.log("Debug: Get New User Form")
    res.render("users/new")
}

// Create User
const addUser = async (req, res, next) => {
    console.log('Body: %s', req.body);
    if(!req.body.firstname || !req.body.lastname){
        res.send("You must provided both first and last name.");
    } else {
        try {
            const newUser = await User.create(req.body);
            return res.status(200).send(newUser);
        } catch (err) {
            next(err);
        }
    }
}

// Read User
const getAllUsers = async (_req, res, next) => {
    try{
        const users = await User.find();
        res.render("users/list", {
            data: users
        });
    }
    catch(err){
        console.log("Error: Failed to retirieve list of users : " + err);
        next(err)
    }
}
// Get a list of users
const getStaff = async (_req, res, next) => {
    try{
        const users = await User.find({type:"Staff"});
        res.render("users/list", {
            data: users
        });
    }
    catch(err){
        console.log("Error: Failed to retirieve list of users : " + err);
        next(err)
    }
}

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.render("users/edit", {
            title: "Update User Details",
            data: user
        })
    } catch(err) {
        //req.flash("error", "Laptop not found with id:" + req.body.id)
        res.redirect('/users')
        //next(err)
    }
}

// Update User
const updateUser = async (req, res, next) => {
    const {id} = req.params;
    const {body} = req;
    console.log(body);
    try {
        const user = await User.findById(id);
        user.set(body)
        const savedUser = await user.save();
        res.redirect('/users')
        //return res.status(200).json(savedUser)
    } catch (err){
        next(err)
    }
 }
// Delete User
const deleteUser= async ( req, res, next) => {
    if (req.method == "GET"){
        const user = await User.findById(req.params.id);
        res.render("users/delete", {
            title: "Delete User",
            data: user
        });
    }else {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.redirect('/users')
            //return res.status(200).send(user);
        } catch (err){
            console.log("Error: Failed to delete user : " + err);
            next(err)
        }
    }
}
// ** Laptop Functions **
// Render New Laptop Form
const newLaptop = (req, res, next) => {
    //console.log("Debug: Get New laptop Form")
    res.render("laptops/new")
}

// Create Laptop
const addLaptop = async (req, res, next) => {
    console.log('Body Data: %s', req.body);
    if(!req.body.model || !req.body.manufacturer){
        res.send("You must provide both manufacturer and model.");
    } else {
        try {
            const newLaptop = await Laptop.create(req.body);
            return res.status(200).send(newLaptop);
        } catch (err) {
            next(err);
        }
    }
}
// Read Laptop
const getAllLaptops = async (_req, res, next) => {
    try{
        const laptops = await Laptop.find();
        res.render("laptops/list", {
            data: laptops
        });
    }
    catch(err){
        console.log("Error: Failed to retirieve list of laptops : " + err);
        next(err)
    }
}

const getStaffLaptops = async (_req, res, next) => {
    try{
        const laptops = await Laptop.find({type: 'Staff'});
        res.render("laptops/list", {
            data: laptops
        });

        //return res.status(200).json(laptops)
    }
    catch(err){
        console.log("Error: Failed to retirieve list of laptops : " + err);
        next(err)
    }
}

const getLaptop = async (req, res, next) => {
    try {
        const laptop = await Laptop.findById(req.params.id);
        res.render("laptops/edit", {
            title: "Update Laptop Details",
            data: laptop
        })
    } catch(err) {
        //req.flash("error", "Laptop not found with id:" + req.body.id)
        res.redirect('/laptops')
        //next(err)
    }
}

// Update Laptop
const updateLaptop = async (req, res, next) => {
    const {id} = req.params;
    const {body} = req;
    try {
        const laptop = await Laptop.findById(id);
        laptop.set(body)
        const savedLaptop = await laptop.save();
        res.redirect('/laptops')
        //return res.status(200).json(savedLaptop)
    } catch (err){
        next(err)
    }
 }
// Delete Laptop
const deleteLaptop= async ( req, res, next) => {
    if (req.method == "GET"){
        const laptop = await Laptop.findById(req.params.id);
        res.render("laptops/delete", {
            title: "Delete Laptop",
            data: laptop
        });
    }else {
        try {
            const laptop = await Laptop.findByIdAndDelete(req.params.id);
            res.redirect('/laptops')
            //return res.status(200).send(laptop);
        } catch (err){
            console.log("Error: Failed to delete laptops : " + err);
            next(err)
        }
    }
}

export default {
    showHome,
    newUser,
    newLaptop,
    getAllLaptops,
    getAllUsers,
    getStaff,
    getLaptop,
    getUser,
    addLaptop,
    addUser,
    updateLaptop,
    updateUser,
    deleteLaptop,
    deleteUser
}