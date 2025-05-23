import express, { NextFunction, Request, Response } from "express";
export const app = express();

import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error";
import { frontendUrl } from "./secret/secret";
import userRouter from "./Routes/userRoute";
import userAuthRouter from "./Routes/userAuthRoute";
import courseRouter from "./Routes/course.route";
import orderRouter from "./Routes/order.route";
import notificationRouter from "./Routes/notification.route";
import analyticsRouter from "./Routes/analytics.route";
import layoutRouter from "./Routes/layout.route";
import paymentRoute from "./Routes/payment.route";

//body parser
app.use(express.json({ limit: "50mb" }));

//  cookie parser
app.use(cookieParser());

// cors
app.use(
  cors({
    origin: [frontendUrl],
    credentials: true,
  })
);
app.use(morgan("dev"));
//  routes
app.use("/api/v1", userRouter);
app.use("/api/v1", userAuthRouter);
app.use("/api/v1", courseRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", notificationRouter);
app.use("/api/v1", analyticsRouter);
app.use("/api/v1", layoutRouter);
app.use("/api/v1", paymentRoute);

// testing api root
app.get("/test", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Backend is connected.",
  });
});

// unknown roots
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(errorMiddleware);
