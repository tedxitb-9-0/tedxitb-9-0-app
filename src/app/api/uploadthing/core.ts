import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "~/server/better-auth";

const f = createUploadthing();

export const ourFileRouter = {
  // Payment proof uploader
  paymentProofUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async ({ req }) => {
      // Authenticate user
      const session = await auth.api.getSession({ headers: req.headers });

      if (!session?.user) {
        throw new Error("Unauthorized");
      }

      // Return user id to be available in onUploadComplete
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This runs on the server after upload completes
      console.log("Payment proof uploaded by user:", metadata.userId);
      console.log("File URL:", file.url);

      // Return data to the client
      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
