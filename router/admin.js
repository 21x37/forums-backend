const express = require('express');
const router = new express.Router();
const admin = require('firebase-admin');
var serviceAccount = require("../../firebase/author-de337-firebase-adminsdk-0wgd1-53148204b2.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://author-de337.firebaseio.com"
});

router.post('/api/reset-password', async (req, res) => {
    const uid = req.body.uid;
    const newPassword = req.body.newPassword
    console.log(uid);
    admin.auth().getUser(uid)
        .then((userRecord) => {
            userRecord.passwordHash = newPassword;
            userRecord.passwordSalt = newPassword;
            res.send({ userRecord: 'Complete' })
        })
        .catch((error) => {
            res.send({ error })
        })
});

router.post('/api/fetch-email', async (req, res) => {
    const uid = req.body.uid;

    const user = await admin.auth().getUser(uid)

    if (!user) {
        return res.send({ error: 'failed' })
    }

    res.send({ email: user.email });
})


module.exports = router;
