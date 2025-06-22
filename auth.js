const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const Person=require('./models/Person')

passport.use(new LocalStrategy(async (USERNAME,password,done)=>{
  // authentication login here
    try {
      // console.log('Received credentials:',USERNAME,password);
      const user=await Person.findOne({username:USERNAME})
      if(!user){
          return done(null,false,{message:'incorrect username'})
      }
      const isPasswordMatch=await user.comparePassword(password)
      if(isPasswordMatch){
        return done(null,user)
      } 
      else{
        return done(null,false,{message:'incorrect password'})
      }
    } catch (error) {
        return done(error) 
    }
}))

module.exports=passport; //Export configured passport