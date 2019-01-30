import * as functions from 'firebase-functions';

exports.UploadToFirestore = functions.https.onRequest((req, res) => {
    if (req.method === 'POST') {
        res.send('Metodo POST');
    } else if (req.method === 'GET') {
        res.send('Method GET');
    } else {
        res.send('Invalid Method!');
    }
});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
