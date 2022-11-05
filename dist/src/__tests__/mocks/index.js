"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockedContactPatchId = exports.mockedProjectPatchId = exports.mockedProjectPatchName = exports.mockedProject = exports.mockedContactPhone = exports.mockedContactLinkedin = exports.mockedContactGithub = exports.mockedContact = exports.mockedLoginErrorFieldEmail = exports.mockedLoginErrorFieldPassword = exports.mockedLoginErrorPassword = exports.mockedUserLogin = exports.mockedUserPatchId = exports.mockedUserPatch = exports.mockedUserErrorEmail = exports.mockedUserErrorBio = exports.mockedUserErrorPassword = exports.mockedUserErrorName = exports.mockedUser = void 0;
const users_1 = require("../integration/users");
exports.mockedUser = {
    name: "Jonas",
    email: "jonas@email.com",
    image: "https://media.istockphoto.com/vectors/green-alien-climbs-out-from-the-hole-of-space-with-stars-in-flat-vector-id1173828830?k=20&m=1173828830&s=612x612&w=0&h=bXd7sIQWbx7HJoDbvSb8BELPHZICLzgwioOaVmwIeJE=",
    password: "123456789!",
    bio: "Olá, eu sou um dev!",
};
exports.mockedUserErrorName = {
    email: "marcia@email.com",
    bio: "Olá, sou uma dev!",
    password: "123456789!",
};
exports.mockedUserErrorPassword = {
    name: "Maria",
    email: "marcia@email.com",
    bio: "Olá, sou uma dev!",
};
exports.mockedUserErrorBio = {
    name: "Maria",
    email: "marcia@email.com",
    password: "123456789!",
};
exports.mockedUserErrorEmail = {
    name: "Maria",
    bio: "Olá, sou uma dev!",
    password: "123456789!",
};
exports.mockedUserPatch = {
    email: "james@mail.com",
};
exports.mockedUserPatchId = {
    id: "48as15das5da12asd",
};
exports.mockedUserLogin = {
    email: "jonas@email.com",
    password: "123456789!",
};
exports.mockedLoginErrorPassword = {
    email: "jonas@email.com",
    password: "123456",
};
exports.mockedLoginErrorFieldPassword = {
    email: "jonas@email.com",
};
exports.mockedLoginErrorFieldEmail = {
    password: "123456",
};
exports.mockedContact = {
    github: "github.com/linkuser",
    linkedin: "linkedin.com/linkuser",
    phone: "+55 96 99999-9999",
};
exports.mockedContactGithub = {
    github: "github.com/newlinkuser",
};
exports.mockedContactLinkedin = {
    linkedin: "linkedin.com/newlinkuser",
};
exports.mockedContactPhone = {
    phone: "+55 96 98200-0000",
};
exports.mockedProject = {
    name: "Floricultura Online",
    category: "Front-End",
    image: "imageproject.com/img.jpeg",
    link: "floresonline.com",
    technology: "React, TypeScript",
    userId: users_1.createdUserIdTest,
};
exports.mockedProjectPatchName = {
    name: "Flores Online",
};
exports.mockedProjectPatchId = {
    id: "48d4dd5d5e6f",
};
exports.mockedContactPatchId = {
    id: "48d4dd5d5e6f",
};
