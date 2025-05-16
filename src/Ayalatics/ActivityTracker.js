import UserServices from "../Services/UserService";

const TrackUserActivity = (userId, screenName, eventName) => {
  console.log(userId)
  
  
  const data = {
    userId: userId,
    screenName: screenName,
    eventName: eventName,
  };

  UserServices.trackActivity(data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err.message));
};

export default TrackUserActivity;
