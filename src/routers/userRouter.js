const router = require("express").Router();
const authorizeLoggedInUser = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");
const fileUploader = require("../lib/uploader");

router.get("/:userId", userController.getUserById);
router.patch("/user=:userId", authorizeLoggedInUser, userController.editUser);

router.patch(
    "/:users_id",
    fileUploader({
        destinationFolder: "profilePictures",
        fileType: "image",
        prefix: "AVATAR",
    }).single("avatar_image_file"),
    userController.editUserProfilePicture
);

module.exports = router;
