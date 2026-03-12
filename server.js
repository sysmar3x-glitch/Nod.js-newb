const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// 1. Initialize Firebase
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const appsRef = db.collection("apps"); // This is your "table"

/* GET ALL APPS */
app.get("/api/apps", async (req, res) => {
    try {
        const snapshot = await appsRef.get();
        const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(apps);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

/* ADD NEW APP */
app.post("/api/apps", async (req, res) => {
    try {
        const newApp = {
            name: req.body.name,
            icon: req.body.icon,
            version: req.body.version,
            size: req.body.size,
            category: req.body.category,
            download: req.body.download,
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        };
        const docRef = await appsRef.add(newApp);
        res.json({ id: docRef.id, status: "success" });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

/* DELETE APP */
app.delete("/api/apps/:id", async (req, res) => {
    try {
        await appsRef.doc(req.params.id).delete();
        res.json({ status: "deleted" });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
