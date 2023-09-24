const signUpBodyValidation = require("./utils/validateSchema")
const User = require("./models/User");
const bcrypt = require("bcrypt");

module.exports.main =  async (event) => {
  const {http,...body} = event
  try {
    const { error } = signUpBodyValidation(body);
    if (error){
        res = {
          statusCode: 400,
          body:{
            error: true, 
            message: error.details[0].message
          }
        }
      return res
    }
    const user = await User.findOne({ email: body.email });
    if (user){
      res = {
        statusCode: 400,
        body:{
          error: true, 
          message: "User with given email already exist"
        }
      }
      return res
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(body.password, salt);

    await User.create({ ...body, password: hashPassword });
    return res = {
      statusCode: 200,
      body:{
        error: false, 
        message: "Account Created successfully"
      }
    }
  } catch (err) {
      console.log("Internal Server Error");
      return res = {
        statusCode: 400,
        body:{
          error: true, 
          message: "Internal Server Error"
        }
      }
  }
}