import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL;

function requireR2Environment(): {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
} {
  if (!R2_ACCOUNT_ID) {
    throw new Error("Missing Cloudflare R2 environment variable: R2_ACCOUNT_ID");
  }

  if (!R2_ACCESS_KEY_ID) {
    throw new Error(
      "Missing Cloudflare R2 environment variable: R2_ACCESS_KEY_ID"
    );
  }

  if (!R2_SECRET_ACCESS_KEY) {
    throw new Error(
      "Missing Cloudflare R2 environment variable: R2_SECRET_ACCESS_KEY"
    );
  }

  if (!R2_BUCKET_NAME) {
    throw new Error(
      "Missing Cloudflare R2 environment variable: R2_BUCKET_NAME"
    );
  }

  return {
    accountId: R2_ACCOUNT_ID,
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
    bucketName: R2_BUCKET_NAME,
  };
}

function getR2Client(): S3Client {
  const {
    accountId,
    accessKeyId,
    secretAccessKey,
  } = requireR2Environment();

  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

/**
 * Generate a presigned URL that allows the browser
 * to upload a video directly to Cloudflare R2.
 *
 * R2 credentials never leave the server.
 */
export async function createVideoUploadUrl(
  key: string,
  contentType: string,
  expiresIn = 900
): Promise<string> {
  const client = getR2Client();
  const { bucketName } = requireR2Environment();

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    ContentType: contentType,
  });

  return getSignedUrl(client, command, {
    expiresIn,
  });
}

/**
 * Delete a video object from Cloudflare R2.
 */
export async function deleteVideoObject(key: string): Promise<void> {
  const client = getR2Client();
  const { bucketName } = requireR2Environment();

  await client.send(
    new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    })
  );
}

/**
 * Convert an R2 object key into its public delivery URL.
 *
 * R2_PUBLIC_URL should normally be a public custom domain,
 * for example:
 *
 * https://media.example.com
 */
export function getVideoPublicUrl(key: string): string | null {
  if (!R2_PUBLIC_URL) {
    return null;
  }

  const baseUrl = R2_PUBLIC_URL.replace(/\/+$/, "");

  const encodedKey = key
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");

  return `${baseUrl}/${encodedKey}`;
}

/**
 * Generate a stable R2 object key for a video.
 *
 * The database stores this key rather than depending on
 * a hard-coded URL.
 */
export function createVideoObjectKey(
  videoId: string,
  originalFilename: string
): string {
  const extension =
    originalFilename
      .split(".")
      .pop()
      ?.toLowerCase()
      .replace(/[^a-z0-9]/g, "") || "mp4";

  return `videos/${videoId}/original.${extension}`;
}
