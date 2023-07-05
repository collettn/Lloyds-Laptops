import User from '../models/users.js'
import Laptop from '../models/laptops.js'

const showHome = (req, res, next) => {
    res.locals.title = "All Laptops";
    res.render("/laptops")
}

// ** User Functions **
// Render New User Form
const newUser = (_req, res, next) => {
    res.locals.title = "New User";
    res.render("users/new")
}

// Create User
const addUser = async (req, res, next) => {
    //console.log('Body: %s', req.body);
    if(!req.body.firstname || !req.body.lastname){
        res.locals.title = "Add User";
        res.send("You must provided both first and last name.");
    } else {
        try {
            const newUser = await User.create(req.body);
            res.locals.title = "All Users";
            res.redirect('/users');
        } catch (err) {
            next(err);
        }
    }
}

// Read User
const getAllUsers = async (_req, res, next) => {
    try{
        const users = await User.find();
        res.locals.title = "All Users";
        res.render("users/list", {
            data: users,
            userType: "All"
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
        res.locals.title = "All Staff";
        res.render("users/list", {
            data: users,
            userType: "All"
        });
    }
    catch(err){
        console.log("Error: Failed to retirieve list of users : " + err);
        next(err)
    }
}

// Get a list of users
const getClients = async (_req, res, next) => {
    try{
        const users = await User.find({type:"Client"});
        res.locals.title = "All Clients";
        res.render("users/list", {
            data: users,
            userType: "All"
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
        res.locals.title = "Update User Details";
        res.render("users/edit", {
            data: user,
            userType: "All"
        })
    } catch(err) {
        res.redirect('/users')
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
        res.locals.title = "All Users";
        res.redirect('/users')
    } catch (err){
        next(err)
    }
 }
// Delete User
const deleteUser= async ( req, res, next) => {
    if (req.method == "GET"){
        const user = await User.findById(req.params.id);
        res.locals.title = "Delete User";
        res.render("users/delete", {
            data: user
        });
    }else {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.locals.title = "All Clients";
            res.redirect('/users')
        } catch (err){
            console.log("Error: Failed to delete user : " + err);
            next(err)
        }
    }
}
 
const assignToUser = async (req, res, next) => {
    const {id} = req.params;
    const {user} = req.params;
    try {
        const laptop = await Laptop.findById(id);
        const assignee = await User.findById(user);
        laptop.set({user: user});
        const savedLaptop = await laptop.save();
        res.locals.title = "All Laptops";
        res.redirect('/laptops');
    } 
    catch (err){
    }
}

// ** Laptop Functions **
// Render New Laptop Form
const newLaptop = (req, res, next) => {
    //console.log("Debug: Get New laptop Form")
    res.locals.title = "New Laptops";
    res.render("laptops/new")
}

// Create Laptop
const addLaptop = async (req, res, next) => {
    console.log('Body Data: %s', req.body);
    if(!req.body.model || !req.body.manufacturer){
        res.locals.title = "Add Laptop";
        res.send("You must provide both manufacturer and model.");
    } else {
        try {
            const newLaptop = await Laptop.create(req.body);
            res.locals.title = "All Laptops";
            res.redirect('/laptops');
        } catch (err) {
            next(err);
        }
    }
}
// Read Laptop
const getAllLaptops = async (_req, res, next) => {
    try{
        const laptops = await Laptop.find();
        res.locals.title = "All Laptops";
        res.render("laptops/list", {
            title: "All Laptops",
            data: laptops
        });
    }
    catch(err){
        console.log("Error: Failed to retirieve list of laptops : " + err);
        next(err)
    }
}

// Get Unassigned Laptops
const getUnassignedLaptops = async (req, res, next) => {
    const {id} = req.params;
    try {
        const laptops = await Laptop.find({user: null});
        res.locals.title = "Unassigned Laptops";
        res.render("laptops/list", {
            data: laptops,
            user: id
        });   
    }
    catch(err){
        console.log("Error: Failed to retirieve list of laptops : " + err);
        next(err)
    }
}

const confirmUnassignedLaptops = async (req, res, next) => {
    const {id} = req.params;
    try {
        const laptops = await Laptop.find({user: null});
        res.locals.title = "Confirm Assignment";
        res.render("laptops/assign", {
            data: laptops,
            user: id
        });   
    }
    catch(err){
        console.log("Error: Failed to retirieve list of laptops : " + err);
        next(err)
    }
}

const getAssignedLaptops = async (req, res, next) => {
    const {id} = req.params;
    try {
        const laptops = await Laptop.find({user: { $ne: null}})
            .populate({path: "user"});
        console.log(laptops);
        res.locals.title = "Assigned Laptops";
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
        const laptops = await Laptop.find({"user":{$ne:null}})
            .populate("user");
        console.log(laptops);   
        res.locals.title = "Staff Laptops";
        res.render("laptops/assigned", {
            data: laptops,
            assignedTo: 'Staff'

        });
    }
    catch(err){
        console.log("Error: Failed to retirieve list of laptops : " + err);
        next(err)
    }
}

const getClientLaptops = async (_req, res, next) => {
    try{
        const laptops = await Laptop.find({"user":{$ne:null}})
          .populate("user");
        console.log(laptops);   
        res.locals.title = "Client Laptops";
        res.render("laptops/assigned", {
            data: laptops,
            assignedTo: 'Client'
        });
    }
    catch(err){
        console.log("Error: Failed to retirieve list of laptops : " + err);
        next(err)
    }
}

const getStaffNeedingLaptops = async(_req, res, next) => {
    try{
        var userList = new Array();

        // get list of users with laptops
        const assignedUsers = await Laptop.find({"user":{$ne:null}}).select('user');
        assignedUsers.forEach(aUser => {
            userList.push(aUser.user)
        });
        console.log(userList);
        // get list of users without laptops
        const users = await User.find({"_id":{$nin: userList}});
        console.log(users);
        res.locals.title = "Unassigned Staff";
        res.render("users/list", {
            data: users,
            userType: "Staff"
        });
    }
    catch(err){
        console.log("Error: Failed to retirieve list of Users : " + err);
        next(err)
    }
}

const getClientNeedingLaptops = async(_req, res, next) => {
    try{
        var userList = new Array();

        // get list of users with laptops
        const assignedUsers = await Laptop.find({"user":{$ne:null}}).select('user');
        assignedUsers.forEach(aUser => {
            userList.push(aUser.user)
        });
        console.log(userList);
        // get list of users without laptops
        const users = await User.find({"_id":{$nin: userList}});
        console.log(users);
        res.locals.title = "Unassigned Clients";
        res.render("users/list", {
            data: users,
            userType: "Client"
        });
    }
    catch(err){
        console.log("Error: Failed to retirieve list of Users : " + err);
        next(err)
    }
}

const getLaptop = async (req, res, next) => {
    try {
        const laptop = await Laptop.findById(req.params.id);
        res.locals.title = "Update Laptop Details";
        res.render("laptops/edit", {
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
    } catch (err){
        next(err)
    }
 }
// Delete Laptop
const deleteLaptop= async ( req, res, next) => {
    if (req.method == "GET"){
        const laptop = await Laptop.findById(req.params.id);
        res.locals.title = "Delete Laptop";
        res.render("laptops/delete", {
            data: laptop
        });
    }else {
        try {
            const laptop = await Laptop.findByIdAndDelete(req.params.id);
            res.redirect('/laptops')
        } catch (err){
            console.log("Error: Failed to delete laptop : " + err);
            next(err)
        }
    }
}

const releaseLaptop = async(req, res, next) => {
    if (req.method == "GET"){
        const laptop = await Laptop.findById(req.params.id);
        res.locals.title = "Release Laptop";
        res.render("laptops/release", {
            data: laptop
        });
    }else{
        try {
            const laptop = await Laptop.findById(req.params.id);
            laptop.set({user: null});
            const savedLaptop = await laptop.save();
            res.locals.title = "All Laptops";
            res.redirect('/laptops');
        } catch (err){
            console.log("Error: Failed to release laptop : " + err);
            next(err)
        }
    }
}


export default {
    showHome,
    newUser,
    newLaptop,
    getAllLaptops,
    getAssignedLaptops,
    getUnassignedLaptops,
    confirmUnassignedLaptops,
    getStaffNeedingLaptops,
    getClientNeedingLaptops,
    assignToUser,
    getAllUsers,
    getStaff,
    getStaffLaptops,
    getClientLaptops,
    getClients,
    getLaptop,
    getUser,
    addLaptop,
    addUser,
    updateLaptop,
    updateUser,
    deleteLaptop,
    releaseLaptop,
    deleteUser
}