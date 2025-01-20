import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { HttpError } from "../http-error";
import AWS from 'aws-sdk';

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const AWS_BUCKET_NAME = "storage-management-app";

const s3 = new AWS.S3();

export const generatePresignedUrl = async (bucketName: string, key: string, operation: 'getObject' | 'putObject', expiresIn: number = 60): Promise<string> => {

  const params = {
    Bucket: bucketName,
    Key: key,
    Expires: expiresIn
  };

  const presignedUrl = await s3.getSignedUrl(operation, params);

  return presignedUrl;

};

export const getDownloadPresignedUrl = asyncHandler(async (req: Request, res: Response) => {
  //analyze the tool list and make the appropriate calls to the storage system
  const objectKey = req.params.objectKey;

  let url:string|null = null;
  try {

    url = await generatePresignedUrl(AWS_BUCKET_NAME, objectKey, 'getObject');

  }catch(err) {
    throw new HttpError(`Error generating presigned URL for download: ${JSON.stringify(err)}`, 500);
  }

  res.send({ url });

});

export const getUploadPresignedUrl = asyncHandler(async (req: Request, res: Response) => {
  //analyze the tool list and make the appropriate calls to the storage system
  const objectKey = req.params.objectKey;

  let url:string|null = null;

  try {

    url = await generatePresignedUrl(AWS_BUCKET_NAME, objectKey, 'putObject');

  }catch(err) {
    throw new HttpError(`Error generating presigned URL for upload: ${JSON.stringify(err)}`, 500);
  }

  res.send({ url });

});
