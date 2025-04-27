import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

export const port = process.env.PORT || 6000;

export const mongoUri = process.env.MONGO_URI;

export const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

export const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";

export const nodeENV = process.env.NODE_ENV || "development";

export const redisUrl = process.env.REDIS_URL;
export const jwtActivationKey = process.env.JWT_ACTIVATION_KEY;
export const jwtResetPassKey = process.env.JWT_REST_PASS_KEY;

export const smtpUserName = process.env.SMTP_USERNAME;

export const smtpPassword = process.env.SMTP_PASSWORD;

export const refreshKey = process.env.REFRESH_KEY;

export const accessKey = process.env.ACCESS_KEY;

export const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;

export const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;

export const cloudinaryName = process.env.CLOUDINARY_CLOUD_NAME;

export const stripePublishKey = process.env.STRIPE_PUBLISHABLE_KEY;

export const stripeScret = process.env.STRIPE_SECRET_KEY;
