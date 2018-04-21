"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
exports.onTodoCompleted = functions.database.ref('/todos/{groupId}/{todoId}/done')
    .onUpdate((change, context) => {
    if (!change.after.val()) {
        return null;
    }
    return change.after.ref.parent.once('value')
        .then(snapshot => {
        const data = snapshot.val();
        const payload = {
            notification: {
                title: `${data.title} completed`
            }
        };
        console.log(payload);
        const groupId = context.params.groupId;
        admin.database().ref(`/groups/${groupId}/members`).once('value')
            .then(members => Object.keys(members.val())[0])
            .then(userId => {
            admin.database().ref(`/users/${userId}/fcmToken`).once('value')
                .then(token => token.val())
                .then(userFcmToken => {
                return admin.messaging().sendToDevice(userFcmToken, payload);
            })
                .then(res => {
                console.log("Sent Successfully", res);
            })
                .catch(err => {
                console.log(err);
            });
        })
            .catch(err => {
            console.log(err);
        });
    });
});
//# sourceMappingURL=index.js.map