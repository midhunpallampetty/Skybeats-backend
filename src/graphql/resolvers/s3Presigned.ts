import AWS from 'aws-sdk';
import { promises } from 'dns';
import { GraphQLString,GraphQLNonNull } from 'graphql';
const s3=new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    region: process.env.AWS_REGION as string,
})
interface GeneratePresignedUrlArgs {
  filename: string;
  fileType: string;
}



const generatePresignedUrl = (bucketName: string, objectKey: string, contentType: string): Promise<string> => {
    const params: AWS.S3.PresignedPost.Params = {
      Bucket: bucketName,
      Key: objectKey,
      Expires: 30, 
      ContentType: contentType,
    };
  
    return s3.getSignedUrlPromise('putObject', params);
  };
  export const generatePresignedUrlMutation = {
    type: GraphQLString,
    args: {
      filename: { type: new GraphQLNonNull(GraphQLString) },
      fileType: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_: any, { filename, fileType }: GeneratePresignedUrlArgs): Promise<string> => {
      const bucketName = process.env.AWS_S3_BUCKET_NAME as string;
      const objectKey = `uploads/${filename}`;
      const presignedUrl = await generatePresignedUrl(bucketName, objectKey, fileType);
      return presignedUrl;
    },
  };  