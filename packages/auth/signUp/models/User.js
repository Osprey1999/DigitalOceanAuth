
const UserRepo = require("../repository/UserRepoMongo")
const dbConnect = require("../utils/dbConnect")

module.exports.findOne = async (args)=>{
    await dbConnect({connect: true});
    user = await UserRepo.findOne(args);
    await dbConnect({connect: false});
    return user
}

module.exports.create = async (args)=>{
    await dbConnect({connect: true});
    await new UserRepo(args).save();
    await dbConnect({connect: false});
}
