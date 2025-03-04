import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async (req, res) => {
  // res.status(200).json({message: 'User registered successfully'});   
  // Get user details from frontend
  const { email, username, password } = req.body
  console.log("email: ", email, "username: ", username);
  // validation- not empty
  if ([email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required")
  }
  // check if user already exists: username, email
  const existedUser = await User.findOne({
    $or: [{ username }, { email }]
  })
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists")
  }
  // create user object - create entry to database
  const user = await User.create({
    email,
    password,
    username: username.toLowerCase()
  })
  // remove password and refresh token field from response
  // check for user creation
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user")
  }
  // return response
  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered Successfully")
  )
});
export { registerUser };