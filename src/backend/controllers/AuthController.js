import sign from "jwt-encode";
import { Response } from "miragejs";
import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils.js";

/**
 * All the routes related to Auth are present here.
 * These are Publicly accessible routes.
 * */

/**
 * This handler handles user signup's.
 * send POST Request at /api/auth/signup
 * body contains {firstName, lastName, email, password}
 * */

export const signupHandler = function (schema, request) {
  const { email, password, firstName, lastName } = JSON.parse(request.requestBody);
  try {
    // Check if user already exists
    const existingUser = schema.users.findBy({ email });
    if (existingUser) {
      return new Response(
        422,
        {},
        { errors: ["Email already exists."] }
      );
    }
    
    // Create new user with a unique ID
    const _id = uuid();
    const newUser = {
      _id,
      email,
      password, // In production, password should be hashed
      firstName,
      lastName,
      createdAt: formatDate(),
      updatedAt: formatDate(),
      cart: [],
      wishlist: [],
      addressList: [],
    };
    
    const createdUser = schema.users.create(newUser);
    // Generate JWT token using the secret from environment variables
    const encodedToken = sign({ _id, email }, process.env.REACT_APP_JWT_SECRET);
    // Remove password from the returned user object for security
    const userToReturn = { ...createdUser.attrs };
    delete userToReturn.password;
    
    return new Response(201, {}, { createdUser: userToReturn, encodedToken });
  } catch (error) {
    return new Response(500, {}, { error: error.message });
  }
};


/**
 * This handler handles user login.
 * send POST Request at /api/auth/login
 * body contains {email, password}
 * */

export const loginHandler = function (schema, request) {
  const { email, password } = JSON.parse(request.requestBody);
  try {
    // Find user by email
    const foundUser = schema.users.findBy({ email });
    if (!foundUser) {
      return new Response(
        404,
        {},
        { errors: ["User not found."] }
      );
    }
    // Check if the password matches
    if (foundUser.password !== password) {
      return new Response(
        401,
        {},
        { errors: ["Invalid credentials."] }
      );
    }
    
    // Generate JWT token
    const encodedToken = sign({ _id: foundUser._id, email }, process.env.REACT_APP_JWT_SECRET);
    const userToReturn = { ...foundUser.attrs };
    delete userToReturn.password;
    
    return new Response(200, {}, { foundUser: userToReturn, encodedToken });
  } catch (error) {
    return new Response(500, {}, { error: error.message });
  }
};