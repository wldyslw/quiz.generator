const admin = require("firebase-admin");

const serviceAccount = require("./quiz-2e3f7-firebase-adminsdk-dwgge-6c42bae866.json");
const { generate } = require("./questionGenerator");

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://quiz-2e3f7.firebaseio.com"
});

const db = admin.firestore();

const questions = generate();

const collection = db.collection("quiz");

Promise.all(
    questions.map((q, i) => {
        collection.doc(`question${i}`).set(q);
    })
)
    .then(() => console.log("All successfully written"))
    .catch(console.error);
