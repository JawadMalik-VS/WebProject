const express = require("express");
const PostController = require("../controller/post");
//const { authenticateToken } = require("../middleware/auth");
const router = express.Router();

//router.get("/TOKEN", getToken);

router.get("/", PostController.getPosts);

router.post("/create", PostController.createPost);

module.exports = router;

/*


// async getFilteredCall(req, res) {
  //   try {
  //     let coachId = req.user.id;
  //     let start_date = dayjs().format();
  //     let end_date = dayjs().format();

  //     start_date = dayjs(req.body.start_date).format();
  //     end_date = dayjs(req.body.end_date).format();

  //     const result = await prisma.callLibrary.findMany({
  //       where: {
  //         OR: [
  //           {
  //             receiverId: coachId,
  //           },
  //           {
  //             senderId: coachId,
  //           },
  //         ],

  //         createdAt: {
  //           gte: start_date,
  //           lte: end_date,
  //         },
  //       },
  //     });

  //     return LoggerService.LoggerHandler(
  //       STRINGS.STATUS_CODE.SUCCESS,
  //       STRINGS.TEXTS.filteredCall,
  //       res,
  //       { call: result }
  //     );
  //   } catch (error) {
  //     console.log("Error -->", error);
  //     LoggerService.LoggerHandler(
  //       STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
  //       error.message,
  //       res
  //     );
  //   }
  // }


// async searchFilteredCall(req, res) {
  //   try {
  //     let { q } = req.query;

  //     console.log("q", q);
  //     let data = await prisma.callLibrary.findMany({
  //       where: {
  //         OR: [
  //           {
  //             title: {
  //               contains: q,
  //               mode: "insensitive",
  //             },
  //           },
  //         ],
  //       },
  //     });

  //     return LoggerService.LoggerHandler(
  //       STRINGS.STATUS_CODE.SUCCESS,
  //       STRINGS.TEXTS.filteredClient,
  //       res,
  //       data
  //     );
  //   } catch (error) {
  //     console.log("Error -->", error);
  //     LoggerService.LoggerHandler(
  //       STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
  //       error.message,
  //       res
  //     );
  //   }
  // }
  */
