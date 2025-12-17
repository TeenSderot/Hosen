import "dotenv/config";
import express from "express";
import dotenv from "dotenv";

import userRouter from "./routes/userRouter.js";
import checklistsRouter from "./routes/checklistsRouter.js";
import feelingsRouter from "./routes/feelingsRouter.js";
import pressuresRouter from "./routes/pressuresRouter.js";
import constraintsRouter from "./routes/constraintsRouter.js";
import resourcesRouter from "./routes/resourcesRouter.js";
import conversationRouter from "./routes/conversationRouter.js";
import toolsRouter from "./routes/toolsRouter.js";
import favoritesRouter from "./routes/favoritesRouter.js";
import q_aRouter from "./routes/q_aRouter.js";


dotenv.config();

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});
app.use(express.json({ limit: "50mb" }))
app.use((express.urlencoded({ limit: "50mb" })))
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});
async function sendPushNotification(expoPushToken, title, body) {
  console.log(`🔔 Preparing to send push to token: ${expoPushToken}`);

  if (!expoPushToken || typeof expoPushToken !== "string") {
    console.error("❌ Invalid expoPushToken:", expoPushToken);
    return;
  }

  const message = {
    to: expoPushToken,
    sound: "default",
    title,
    body,
    channelId: "default",
    android: {
        icon:"notification_ic",
    // Large Icon: URL לתמונת הלוגו הצבעונית שלך
    // חשוב: זה צריך להיות URL שניתן לגשת אליו מהאינטרנט
    largeIcon: 'https://storage.googleapis.com/gokee_goals/evanto_gokee_logo.png', 
  }
  };
  try {
    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    const data = await response.json().catch(() => null);

    console.log("📡 Expo response status:", response.status);
    console.log("📡 Expo response body:", data);

    if (!response.ok) {
      console.error("❌ Expo push failed with status:", response.status);
      throw new Error(JSON.stringify(data));
    }

    console.log("✅ Push sent successfully!");
  } catch (err) {
    console.error("🔥 ERROR sending Expo Push:", err);
  }
}

// -----------------------------------------------------------
// ⏰ משימה מתוזמנת כל 3 שעות
// -----------------------------------------------------------
// cron.schedule(
//   "0 */3 * * *", //כל 3 שעות 
//   async () => {
//     console.log("⏰ CRON HEARTBEAT START:", new Date().toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" }));

//     try {
//       const users = await users_collection
//         .find({ pushtoken: { $ne: null } }) // בחר רק משתמשים עם pushtoken
//         .toArray();

//       console.log(`👥 Found ${users.length} users with push tokens`);

//       for (let u of users) {
//         console.log(`➡ Handling user ${u._id} – token: ${u.pushtoken}`);

//         if (!u.pushtoken) {
//           console.warn(`⚠ User ${u._id} has no push token`);
//           continue;
//         }

//         await sendPushNotification(
//           u.pushtoken,
//           "מטרה לא הושלמה",
//           "יש לך מטרות שדורשות תשומת לב!"
//         );
//       }
//     } catch (err) {
//       console.error("🔥 CRON ERROR:", err);
//     }

//     console.log("⏳ CRON HEARTBEAT END\n");
//   },
//   {
//     timezone: "Asia/Jerusalem", // הפעלה לפי זמן ישראל
//   }
// )



//         await sendPushNotification(
//           u.pushtoken,
//           "מטרה לא הושלמה",
//           "יש לך מטרות שדורשות תשומת לב!"
//         );
//       }
//     } catch (err) {
//       console.error("🔥 CRON ERROR:", err);
//     }

//     console.log("⏳ CRON HEARTBEAT END\n");
//   },
//   {
//     timezone: "Asia/Jerusalem", // הפעלה לפי זמן ישראל
//   }
// )
const PORT = process.env.PORT || 3000;
app.use((req, _res, next) => {
  console.log("REQ:", req.method, req.url);
  next();
});
app.use("/feelings", feelingsRouter);
app.use("/pressures", pressuresRouter);
app.use("/checklists", checklistsRouter);
app.use("/users", userRouter);
app.use("/constraints", constraintsRouter);
app.use("/resources", resourcesRouter);
app.use("/conversation",conversationRouter);
app.use("/tools",toolsRouter);
app.use("/q_a",q_aRouter);
app.use("/favorites",favoritesRouter);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Listening on http://localhost:${port}`));
