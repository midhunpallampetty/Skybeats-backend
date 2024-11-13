import { String } from "aws-sdk/clients/apigateway"

export interface applyJobDTO{
    name:string
    email:string
    phone:string
    coverLetter:string
    cv:string
    userId:string
    jobPost:string
}