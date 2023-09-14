"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authZodSchema = void 0;
const zod_1 = require("zod");
const auth_constant_1 = require("./auth.constant");
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        role: zod_1.z.enum([...auth_constant_1.userRoles], {
            required_error: 'Role is required',
        }),
        contactNo: zod_1.z.string({
            required_error: 'Contact is required',
        }),
        address: zod_1.z.string({
            required_error: 'Studentid is required',
        }),
        profileImg: zod_1.z.string().optional(),
    }),
});
const login = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
        role: zod_1.z.enum([...auth_constant_1.userRoles]).optional(),
        contactNo: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        profileImg: zod_1.z.string().optional(),
    }),
});
exports.authZodSchema = {
    create,
    login,
    update,
};
