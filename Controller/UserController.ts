import User from "../Model/User"
import { Request, Response } from "express"
import bcrypt from "bcryptjs";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const role = req.body.role || "user";
    const { name, email, phone, password } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    await user.save();

    const payload: JwtPayload = {
        user: {
          id: user._id.toString(),
          role: user.role,
        },
      };

      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
      }

      const signOptions: SignOptions = {
        expiresIn: "40h",
      };

      // Sign JWT
      const token = jwt.sign(payload, process.env.JWT_SECRET, signOptions);

      // Response
      res.status(201).json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    // res.status(500).json({ error: "Register error" });
    console.error(err)
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    console.log("user is: ", user);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Password incorrect" });
    }

    // Check JWT secret
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
      }

      // JWT payload
      const payload = {
        user: {
          id: user._id.toString(),
          role: user.role,
        },
      };

      const options: SignOptions = {
        expiresIn: "40h",
      };

      // Generate token
      const token = jwt.sign(payload, process.env.JWT_SECRET, options);

      // Success response
      res.json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
  } catch (err) {
    res.status(500).json({ error: "Login error" });
  }
};


export const getAllUser = async(req: Request, res: Response) => {
    try{
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
        return;
    }
}

export const updateUser = async(req: Request, res: Response) => {
    try{
        const {
            name,
            email,
            phone,
            password,
            role
        } = req.body
        const user = await User.findByIdAndUpdate(req.params.id)
        if(user){
            user.name = name || user.name;
            user.email = email || user.email;
            user.phone = phone || user.phone;
            user.password = password || user.password;
            user.role = role || user.role;

            const updateUser = await user.save();
            res.status(200).json(updateUser);
        } else {
            res.status(404).json({ error: "User not found" });
            return;
        }
        
    } catch (error) {
        res.status(500).json({ error: "Error updating user" });
        return;
    }
}

export const deleteUser = async(req: Request, res: Response) => {
    try{
        const user = await User.findById(req.params.id)
        if(user){
            await user.deleteOne();
            res.status(200).json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ error: "User not found" });
            return;
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting user" });
        return;
    }
}