import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';


const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }


  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating referesh and access token")
  }
}

// Register user
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
    username,
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
// Login user
const loginUser = asyncHandler(async (req, res) => {
  // req body --> Data
  const { email, username, password } = req.body
  console.log("email: ", email, "username: ", username);
  // username or email  
  if (!username && !email) {
    throw new ApiError(400, "username or email is required")
  }
  // find the user
  const user = await User.findOne({ $or: [{ username }, { email }] })
  if (!user) {
    throw new ApiError(404, "User does not exists")
  }
  // password check
  const isPasswordValid = await user.isPasswordCorrect(password)
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
  }
  // access and refresh token
  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

  // send cookies
  const options = {
    httpOnly: true,
    secure: true
  }
  // return response
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser, accessToken, refreshToken
        },
        "User logged In Successfully"
      )
    )
    

});
// Logout User
const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }
  
    return  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

export {
  registerUser,
  loginUser,
  logoutUser,
};