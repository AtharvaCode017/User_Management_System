// server/routes/router.js

const express = require("express");
const router = express.Router();
const users = require("../models/userSchema"); // Import the User Model we made earlier

// 1. REGISTER USER ROUTE
// This route listens for a POST request at "/register"
router.post("/register", async (req, res) => {
    // console.log(req.body); // Useful for debugging what data comes in

    // 1. Get data from the frontend request (Destructuring)
    const { fname, lname, email, mobile, gender, location, status, profile } = req.body;

    // 2. Validation: Ensure no field is empty
    if (!fname || !lname || !email || !mobile || !gender || !location || !status || !profile) {
        return res.status(422).json("Please fill in all the data");
    }

    try {
        // 3. Check if user already exists (using email)
        const preuser = await users.findOne({ email: email });
        console.log("Existing User Check:", preuser);

        if (preuser) {
            return res.status(422).json("User with this email already exists!");
        } else {
            // 4. If new, create a new user object
            const finalUser = new users({
                fname, lname, email, mobile, gender, location, status, profile
            });

            // 5. Save to MongoDB
            const storeData = await finalUser.save();
            console.log("User Saved Successfully");
            res.status(201).json(storeData);
        }

    } catch (error) {
        console.log("Error during registration:", error);
        res.status(422).json(error);
    }
});


// 2. GET USER DATA (With Search & Pagination)
router.get("/getdata", async (req, res) => {
    try {
        // 1. Get query params
        const search = req.query.search || "";
        const status = req.query.status || "";
        const page = req.query.page || 1; // Default to page 1
        const ITEM_PER_PAGE = 5; // How many users per page?

        const query = {
            fname: { $regex: search, $options: "i" }
        };

        if (status && status !== "All") {
            query.status = status;
        }

        // 2. Calculate Skip
        // If page 1: skip 0. If page 2: skip 5. If page 3: skip 10.
        const skip = (page - 1) * ITEM_PER_PAGE;

        // 3. Find with Limit & Skip
        const count = await users.countDocuments(query); // Count total matching users

        const userdata = await users.find(query)
            .limit(ITEM_PER_PAGE)
            .skip(skip);

        // 4. Send data AND pagination info
        res.status(201).json({
            Pagination: {
                count,
                pageCount: Math.ceil(count / ITEM_PER_PAGE)
            },
            userdata
        });

    } catch (error) {
        res.status(422).json(error);
    }
})

// 3. DELETE USER
router.delete("/deleteuser/:id", async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the URL

        const deleteuser = await users.findByIdAndDelete({ _id: id });
        
        console.log("User Deleted");
        res.status(201).json(deleteuser);

    } catch (error) {
        res.status(422).json(error);
    }
})

// 4. GET INDIVIDUAL USER (To fill the Edit form)
router.get("/getuser/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        const userindividual = await users.findById({ _id: id });
        console.log(userindividual);
        res.status(201).json(userindividual);

    } catch (error) {
        res.status(422).json(error);
    }
})

// 5. UPDATE USER DATA
router.patch("/updateuser/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // findByIdAndUpdate(id, data, options)
        const updateduser = await users.findByIdAndUpdate(id, req.body, {
            new: true // Returns the updated document
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})

// 6. EXPORT TO CSV
router.get("/exportcsv", async (req, res) => {
    try {
        const usersdata = await users.find();

        // 1. Create the Header Row
        let csv = "ID,FirstName,LastName,Email,Gender,Status,Mobile,Location\n";

        // 2. Loop through users and add rows
        usersdata.map((value) => {
            csv += `${value._id},${value.fname},${value.lname},${value.email},${value.gender},${value.status},${value.mobile},${value.location}\n`;
        });

        // 3. Set Headers so browser knows it's a file download
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=users_data.csv");
        
        // 4. Send the CSV string
        res.status(200).end(csv);

    } catch (error) {
        console.log(error);
        res.status(422).json(error);
    }
})

module.exports = router;