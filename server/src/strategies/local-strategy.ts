import passport from "passport";
import { Strategy } from "passport-local";
import { Users } from "../entity/user.entity.js";
import { comparePassword } from "../utils/helper.js";

passport.serializeUser((user: { id: number }, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const findUser = await Users.findOne({ where: { id } });
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (error) {
    console.error("Deserialize Error", error);
    done(error, null);
  }
});

export default passport.use(
  new Strategy(
    { usernameField: "email" },
    async (email: string, password: string, done) => {
      try {
        const findUser = await Users.findOne({ where: { email } });
        if (!findUser) throw new Error("Incorrect email");
        if (!comparePassword(password, findUser.password))
          throw new Error("Incorrect Password");
        done(null, findUser);
      } catch (error) {
        console.error("passport Error", error);
        done(error, null);
      }
    }
  )
);
