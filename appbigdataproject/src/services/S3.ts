import { PutObjectCommand } from "@aws-sdk/client-s3";
import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    sessionToken: import.meta.env.VITE_AWS_SESSION_TOKEN,
  },
});

// export const uploadFileToS3Bucket = async (
//   file: Blob,
//   filename: string,
//   label: string
// ) => {
//   const params = {
//     Bucket: "buckettestapinode",
//     Key: filename,
//     Body: file,
//     ContentType: "audio/wav",
//   };

//   try {
//     const data = await s3.send(new PutObjectCommand(params));
//     console.log("Successfully uploaded object to S3 bucket", data);
//   } catch (err) {
//     console.log("Error", err);
//   }
// };
