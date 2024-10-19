"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("./userController");
const usersValidator_1 = require("../../utils/validators/usersValidator");
const authController_1 = require("../auth/authController");
const usersRoute = (0, express_1.Router)();
usersRoute.use(authController_1.protectRoutes, authController_1.isActive);
usersRoute.get('/me', userController_1.setUserId, userController_1.getUserByID);
usersRoute.put('/updateMe', userController_1.updateLoggedUser, userController_1.updateLoggedUser);
usersRoute.put('/changeMyPassword', usersValidator_1.changeLoggedUserPasswordValidator, userController_1.changeLoggedUserPassword);
usersRoute.delete('/deleteMe', (0, authController_1.isHaveAccess)('user'), usersValidator_1.deleteUserValidator, userController_1.setUserId, userController_1.deleteUser);
// usersRoute.use(isHaveAccess('manager'));
usersRoute.route('/')
    .get(userController_1.getAllUsers)
    .post(userController_1.uploadUserImage, userController_1.resizeUserImage, usersValidator_1.createUserValidator, userController_1.createUser);
usersRoute.route('/:id')
    .get(usersValidator_1.getUserByIDValidator, userController_1.getUserByID)
    .put(userController_1.uploadUserImage, userController_1.resizeUserImage, usersValidator_1.updateUserValidator, userController_1.updateUser)
    .delete(usersValidator_1.deleteUserValidator, (0, authController_1.isHaveAccess)('user'), userController_1.deleteUser);
usersRoute.put('/:id/changePassword', usersValidator_1.changeUserPasswordValidator, userController_1.changeUserPassword);
exports.default = usersRoute;
