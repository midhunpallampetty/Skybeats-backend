"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const applyJob_1 = require("../../models/applyJob");
const careerModel_1 = require("../../models/careerModel");
const appliedJobResolver = {
    Mutation: {
        applyJob: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { input }) {
            console.log(input);
            try {
                const jobPost = yield careerModel_1.careerModel.findOne({ designation: input.jobPost });
                if (jobPost) {
                    if (!Array.isArray(jobPost.usersApplied)) {
                        jobPost.usersApplied = [];
                    }
                    if (jobPost.usersApplied.includes(input.userId)) {
                        throw new Error('User has already applied for this job');
                    }
                    const newApplication = new applyJob_1.applyJobModel({
                        name: input.name,
                        email: input.email,
                        phone: input.phone,
                        coverLetter: input.coverLetter,
                        cv: input.cv,
                        Date: new Date().toLocaleString(),
                        userId: input.userId
                    });
                    const savedApplication = yield newApplication.save();
                    jobPost.usersApplied.push(input.userId);
                    yield jobPost.save();
                    return savedApplication;
                }
                else {
                    throw new Error('Job post not found');
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error('Error applying for job: ' + error.message);
                }
                else {
                    throw new Error('Error applying for job: An unknown error occurred');
                }
            }
        }),
    },
    Query: {
        getAllApplication: (_) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const appliedJobs = yield applyJob_1.applyJobModel.find();
                return appliedJobs;
            }
            catch (error) {
                console.log('error fetching data');
            }
        }),
        getApplicationsById: (_, input) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const applications = yield applyJob_1.applyJobModel.find({ userId: input.userId });
                if (!applications || applications.length === 0) {
                    throw new Error(`No applications found for user with ID: ${input.userId}`);
                }
                const formattedApplications = applications.map((application) => {
                    const formattedCreatedAt = new Date(application.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    });
                    return Object.assign(Object.assign({}, application.toObject()), { createdAt: formattedCreatedAt });
                });
                return formattedApplications;
            }
            catch (error) {
                console.error(`Error fetching applications for user ${input.userId}:`, error);
                throw new Error("Failed to fetch applications for the specified user");
            }
        }),
    }
};
exports.default = appliedJobResolver;
