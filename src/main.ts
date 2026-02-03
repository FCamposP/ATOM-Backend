// import * as functions from "firebase-functions";
// import app from "./app";

// export const api = functions.https.onRequest(app);


import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running locally on http://localhost:${PORT}`);
});
