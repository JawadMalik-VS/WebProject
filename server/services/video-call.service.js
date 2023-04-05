const prisma = require("../prisma");
const STRINGS = require("../utils/text");

const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const TWILIO_API_ACCOUNT_SID = process.env.TWILIO_API_ACCOUNT_SID;
const TWILIO_API_AUTH_TOKEN = process.env.TWILIO_API_AUTH_TOKEN;
const twilioClient = require("twilio")(
  TWILIO_API_ACCOUNT_SID,
  TWILIO_API_AUTH_TOKEN
);
class VideoCallService {
  // Coach video call ended
  twilioVideoCallAction = async (data) => {
    // if (data.RoomStatus == "completed") {
    //   console.log("composition completed");
    //   console.log(data.RoomStatus, data.StatusCallbackEvent, "data");

    //   this.createComposition(data.RoomSid);
    let videoCall = await prisma.videoCall.findFirst({
      where: {
        AND: [
          {
            roomSid: data.RoomSid,
          },
        ],
      },
    });
    // } else if (data.StatusCallbackEvent == "composition-available") {
    //   console.log("composition available-->", data);
    //   let compResponse = await this.getCompositions(
    //     `https://video.twilio.com${data.CompositionUri}/Media`
    //   );
    //   let uri = compResponse?.body?.redirect_to;
    //   this.saveComposition(data.RoomSid, uri);
    // }
  };
  // START CALL
  startCall = async (roomName, identity) => {
    // generate room
    this.findOrCreateRoom(roomName);
    // generate an Access Token for a participant in this room
    const token = await this.getAccessToken(roomName, identity);
    return token;
  };
  //JOIN CALL
  joinCall = async (roomName, identity) => {
    let token = null;

    try {
      let room = await this.findRoom(roomName);
      if (room) {
        // generate an Access Token for a participant in this room
        token = await this.getAccessToken(roomName, identity);
      }
    } catch (error) {
      token = null;
      // console.log("join calll", error);
    }
    return token;
  };
  //GET RECORDINGS
  getRecordings = async () => {
    let setOfRoomSidsWithRecordings = [];
    try {
      let recordings = await twilioClient.video.v1.recordings.list({
        groupingSid: ["RM1d699149d02d1ffe70d446fe55dd7908"],
        limit: 20,
        status: "completed",
        type: "video",
      });

      // Create a list of only the room sids that have associated recordings
      let roomSidsWithRecordings = recordings.map((recording) => recording.sid);
      // Filter out the duplicates
      setOfRoomSidsWithRecordings = [...new Set(roomSidsWithRecordings)];
    } catch (error) {
      console.log("Recordings error-->", error);
    }

    return setOfRoomSidsWithRecordings;
  };
  //EXIT ROOM
  exitRoom = async (roomName) => {
    try {
      // see if the room exists already. If it doesn't, this will throw
      // error 20404.
      let room = await twilioClient.video.v1
        .rooms(roomName)
        .update({ status: "completed" });
    } catch (error) {
      // let other errors bubble up
      console.log(error, "err room join");
    }
  };
  //CREATE COMPOSITION
  createComposition = async (roomSid) => {
    let createComposition = await twilioClient.video.v1.compositions.create({
      roomSid: roomSid,
      audioSources: "*",
      videoLayout: {
        grid: {
          video_sources: ["*"],
        },
      },
      format: "mp4",
    });
    return createComposition?.links?.media;
  };
  //GET COMPOSITIONS
  getCompositions = async (uri) => {
    // Send a request to Twilio to create the composition
    return twilioClient.request({
      method: "GET",
      uri: `${uri}`,
    });
  };
  //SAVE COMPOSITIONS
  saveComposition = async (roomSid = "", url = "") => {
    try {
      let videoCall = await prisma.videoCall.findFirst({
        where: {
          AND: [
            {
              roomSid: roomSid,
            },
          ],
        },
      });
      console.log(videoCall, "videoCall");
      if (videoCall) {
        const updatedCall = await prisma.VideoCall.update({
          where: {
            id: videoCall.id,
          },
          data: {
            url: url,
          },
        });
      }
    } catch (error) {
      console.log("Error save composition-->", error);
    }
  };
  //GET SINGLE ROOM
  getRoom = (roomId) => {
    return twilioClient.video.v1.rooms(`${roomId}`).fetch();
  };
  // CREATE ROOM
  createRoom = async (roomName) => {
    try {
      let room = await twilioClient.video.v1.rooms.create({
        uniqueName: roomName,
        type: "group",
        RecordParticipantsOnConnect: true,
        statusCallbackMethod: "POST",
      });
      let videoCall = await prisma.videoCall.findFirst({
        where: {
          AND: [
            {
              roomId: roomName,
            },
          ],
        },
      });
      console.log(room, "room---->");

      //     const updatedCall = await prisma.videoCall.update({
      //       where: {
      //         id: videoCall.id,
      //       },
      //       data: {
      //         roomSid: room?.sid,
      //       },
      //     });
    } catch (error) {
      console.log("create room err--->", error);
    }
  };
  // FIND OR CREATE ROOM
  findOrCreateRoom = async (roomName) => {
    try {
      // see if the room exists already. If it doesn't, this will throw
      // error 20404.
      let room = await twilioClient.video.v1.rooms(roomName).fetch();
    } catch (error) {
      // the room was not found, so create it
      if (error.code == 20404) {
        this.createRoom(roomName);
      }
    }
  };
  // FIND ROOM
  findRoom = async (roomName) => {
    // see if the room exists already. If it doesn't, this will throw
    // error 20404.
    return twilioClient.video.v1.rooms(roomName).fetch();
  };

  conversation = async (cid) => {
    try {
      twilioClient.conversations.v1
        .conversations(cid)
        .webhooks.create({
          "configuration.method": "GET",
          "configuration.filters": ["onMessageAdded", "onConversationRemoved"],
          "configuration.url": "https://example.com",
          target: "webhook",
        })
        .then((webhook) => {
          console.log(webhook.sid);
        });
    } catch (error) {
      console.log("create room err--->", error);
    }
  };

  retConversation = async (cid, wid) => {
    try {
      return twilioClient.conversations.v1
        .conversations(cid)
        .webhooks(wid)
        .fetch()
        .then((webhook) => console.log(webhook.sid));
    } catch (error) {
      console.log("create room err--->", error);
    }
  };
  //CREATE API KEY
  createApiKey = async (identity) => {
    let response = await twilioClient.newKeys.create({
      friendlyName: identity,
    });

    return response;
  };
  //   GET ACCESS TOKEN
  getAccessToken = async (roomName, identity) => {
    let response = await this.createApiKey(identity);
    // create an access token
    const token = new AccessToken(
      TWILIO_API_ACCOUNT_SID,
      response.sid,
      response.secret,
      // generate a random unique identity for this participant
      { identity: identity }
    );
    // create a video grant for this specific room
    const videoGrant = new VideoGrant({
      room: roomName,
    });
    // add the video grant
    token.addGrant(videoGrant);
    // serialize the token and return it
    return token.toJwt();
  };
  //GET ROOMS AND COMPOSITIONS
  // getRoomsAndCompositions = async () => {
  //   let rooms = [];
  //   let compositions = [];

  //   try {
  //     // Get a list of recent video rooms. In this case, the 10 most recent completed rooms
  //     rooms = await twilioClient.video.v1.rooms.list({
  //       status: "completed",
  //       limit: 10,
  //     });
  //     // Get a list of recordings
  //     let recordings = await twilioClient.video.v1.recordings.list();

  //     // Create a list of only the room sids that have associated recordings
  //     let roomSidsWithRecordings = recordings.map((recording) => {
  //       return recording.groupingSids.room_sid;
  //     });

  //     // Filter out the duplicates
  //     const setOfRoomSidsWithRecordings = [...new Set(roomSidsWithRecordings)];

  //     // Get the full details of the rooms with recordings
  //     const roomsWithRecordings = rooms.filter((room) => {
  //       if (setOfRoomSidsWithRecordings.includes(room.sid)) {
  //         return room;
  //       }
  //     });

  //     // Get a list of completed compositions
  //     compositions = await twilioClient.video.v1.compositions.list({
  //       status: "completed",
  //     });

  //     let videoRooms = [];

  //     // Match up any completed compositions with their associated rooms
  //     roomsWithRecordings.forEach((room) => {
  //       const roomCompositions = compositions.filter(
  //         (composition) => composition.roomSid === room.sid
  //       );

  //       let VideoRoom = {
  //         sid: room.sid,
  //         name: room.uniqueName,
  //         duration: room.duration,
  //         compositions: roomCompositions,
  //       };
  //       videoRooms.push(VideoRoom);
  //     });
  //     // console.log(videoRooms, "videoRooms");
  //     // Return this list of video rooms and associated compositions
  //     return videoRooms;
  //   } catch (error) {
  //     console.log(error);
  //     return error;
  //   }
  // };
}

module.exports = new VideoCallService();
