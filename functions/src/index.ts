import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

import * as moment from 'moment';

const pushNotification = (userId, title) => {
  const payload = {
    notification: {
      title: title,
      click_action : 'https://angularfire2-todo-5a6d4.firebaseapp.com'
    }
  };
  admin.database().ref(`/users/${userId}/fcmToken`).once('value')
    .then(token => token.val() )
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

export const onTodoCompleted = functions.database.ref('/todos/{groupId}/{todoId}/done')
  .onUpdate((change, context) => {
    if(!change.after.val()) {
      return null;
    }
    return change.after.ref.parent.once('value')
      .then(snapshot => {
        const data = snapshot.val();
        const groupId  = context.params.groupId;
        admin.database().ref(`/groups/${groupId}/members`).once('value')
          .then(membersRef => Object.keys(membersRef.val()))
          .then(memberKeys => {
            memberKeys.forEach(userId => {
              if(userId !== data.completedBy) {
                admin.database().ref(`/users/${data.completedBy}/name`).once('value')
                  .then(name => {
                    const title = `${data.title} completed by ${name.val()}`;
                    pushNotification(userId, title);
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }
            });
          })
          .catch(err => {
            console.log(err);
          });
      });
  });

export const onTodoAssigned = functions.database.ref('/todos/{groupId}/{todoId}/assignee')
  .onWrite((change, context) => {
    if(!change.after.val()) {
      return null;
    }
    return change.after.ref.parent.once('value')
      .then(snapshot => {
        const data = snapshot.val();
        if(data.assignee !== data.updatedBy) {
          admin.database().ref(`/users/${data.assignee}/name`).once('value')
            .then(name => {
              const title = `${data.title} assigned to you (${name.val()})`;
              pushNotification(data.assignee, title);
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
  });

export const reminderTodo = functions.https.onRequest((req, res) => {
  res.send('accepted');
  return admin.database().ref(`/todos`)
    .on('child_added', snapshots => {
      const now = moment().utcOffset('+09:00');
      snapshots.forEach(snapshot => {
        const data = snapshot.val();
        if(!data.done) {
          const due = moment(data.due + '+09:00');
          const diff = due.diff(now, 'minutes', true);
          if(0 <= diff && diff < 1) {
            pushNotification(data.assignee, `Reminder ${data.title}`);
          }
        }
        return false;
      });
    });
});
