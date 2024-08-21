import passport from "passport";
import session from "express-session";
import connectSessionSequelize from "connect-session-sequelize";
import sequelize from "../config/sessionStore.js";
import { Handler } from "express";

// Set up the session store
const sequelizeStore = connectSessionSequelize(session.Store);

//Initialize the session store
const store = new sequelizeStore({ db: sequelize });

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.log("Database synchronization error:", error);
  });

export default function (app: { use: (arg0: Handler) => void }) {
  app.use(
    session({
      secret: "Saifu@123)(",
      saveUninitialized: false,
      resave: false,
      cookie: { maxAge: 60000 * 6 },
      store: store,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
}
