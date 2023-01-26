import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "./s3Client";
import { supabase } from "./supabaseClient";

const prepareAudioFile = (blobFile: any) => {
  // const { memoryStorage } = multer;
  // const storage = memoryStorage();
  // const upload = multer({ storage }).single("audio");
  //   const file = new File([blobFile], "audio.wav", {
  //     type: "audio/wav",
  //   });
  //   uploadFile(file);
};

export const uploadFile = async (file: any, filename: string) => {
  const params = {
    Bucket: "buckettestapinode",
    Key: filename,
    Body: file,
    ContentType: "audio/wav",
  };

  // const { data, error } = await supabase.functions.invoke("modelSpeechToText", {
  //   body: { name: "test" },
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
  //     "Access-Control-Allow-Headers":
  //       "authorization, x-client-info, apikey, content-type, access-control-allow-methods, access-control-allow-origin, access-control-allow-headers",
  //     "Content-Type": "application/json",
  //   },
  // });
  // console.log("edged", data);

  try {
    console.log("coucou", {
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    });
    const data = await s3.send(new PutObjectCommand(params));
    console.log("Successfully uploaded object", data);
  } catch (err) {
    console.log("Error", err);
  }
};
