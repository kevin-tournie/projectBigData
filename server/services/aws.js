import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../s3Client.js";

export const uploadFileToBucket = async (file, filename) => {
  const params = {
    Bucket: "buckettestapinode",
    Key: filename,
    Body: file,
    ContentType: "audio/wav",
  };

  try {
    const data = await s3.send(new PutObjectCommand(params));
    console.log("Successfully uploaded object to S3 bucket", data);
  } catch (err) {
    console.log("Error", err);
  }
};
