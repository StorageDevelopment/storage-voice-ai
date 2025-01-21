import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { HttpError } from "../http-error";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  getSignedUrl,
  S3RequestPresigner,
} from "@aws-sdk/s3-request-presigner";
import { parseUrl } from "@smithy/url-parser";
import { formatUrl } from "@aws-sdk/util-format-url";
import { fromEnv } from "@aws-sdk/credential-providers";
import { Hash } from "@smithy/hash-node";
import { HttpRequest } from "@smithy/protocol-http";

// Configure AWS SDK
// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION
// });

const AWS_BUCKET_NAME = "storage-management-app";
const AWS_REGION = process.env.AWS_REGION ?? "us-east-1";

// const s3 = new AWS.S3();
// const s3Client = new S3Client({ region });

const generatePresignedUrl = async (region: string, bucket: string, key: string, httpMethod: 'GET' | 'PUT') => {
  const url = parseUrl(`https://${bucket}.s3.${region}.amazonaws.com/${key}`);
  const presigner = new S3RequestPresigner({
    credentials: fromEnv(),
    region,
    sha256: Hash.bind(null, "sha256"),
  });

  const signedUrlObject = await presigner.presign(
    new HttpRequest({ ...url, method: httpMethod }),
  );
  return formatUrl(signedUrlObject);
};

export const getDownloadPresignedUrl = asyncHandler(async (req: Request, res: Response) => {
  //analyze the tool list and make the appropriate calls to the storage system
  const objectKey = req.params.objectKey;

  let url:string|null = null;

  try {

    url = await generatePresignedUrl(AWS_REGION, AWS_BUCKET_NAME, objectKey, 'GET');

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

      url = await generatePresignedUrl(AWS_REGION, AWS_BUCKET_NAME, objectKey, 'PUT');

  }catch(err) {
    throw new HttpError(`Error generating presigned URL for upload: ${JSON.stringify(err)}`, 500);
  }

  res.send({ url });

});
