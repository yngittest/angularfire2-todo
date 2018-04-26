"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const moment = require("moment");
const pushNotification = (userId, title) => {
    const payload = {
        notification: {
            title: title
        }
    };
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
};
exports.onTodoCompleted = functions.database.ref('/todos/{groupId}/{todoId}/done')
    .onUpdate((change, context) => {
    if (!change.after.val()) {
        return null;
    }
    return change.after.ref.parent.once('value')
        .then(snapshot => {
        const data = snapshot.val();
        const groupId = context.params.groupId;
        admin.database().ref(`/groups/${groupId}/members`).once('value')
            .then(membersRef => Object.keys(membersRef.val()))
            .then(memberKeys => {
            memberKeys.forEach(userId => {
                pushNotification(userId, `${data.title} completed`);
            });
        })
            .catch(err => {
            console.log(err);
        });
    });
});
exports.reminderTodo = functions.https.onRequest((req, res) => {
    res.send('accepted');
    return admin.database().ref(`/todos`)
        // .orderByChild('due')
        // .endAt(now)
        .on('child_added', snapshots => {
        const now = moment().utcOffset('+09:00');
        snapshots.forEach(snapshot => {
            const data = snapshot.val();
            if (!data.done) {
                const due = moment(data.due + '+09:00');
                const diff = due.diff(now, 'minutes', true);
                if (0 <= diff && diff < 1) {
                    pushNotification(data.assignee, `Reminder ${data.title}`);
                }
            }
            return false;
        });
    });
});
//# sourceMappingURL=index.js.map