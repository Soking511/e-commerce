"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("./userController");
const usersValidator_1 = require("../../utils/validators/usersValidator");
const authController_1 = require("../auth/authController");
const usersRoute = (0, express_1.Router)();
// usersRoute.use(protectRoutes, isActive);
// usersRoute.get('/me', setUserId, getUserByID)
// usersRoute.put('/updateMe', updateLoggedUser, updateLoggedUser)
// usersRoute.put('/changeMyPassword', changeLoggedUserPasswordValidator, changeLoggedUserPassword)
// usersRoute.delete('/deleteMe', isHaveAccess('user'), deleteUserValidator, setUserId, deleteUser)
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
