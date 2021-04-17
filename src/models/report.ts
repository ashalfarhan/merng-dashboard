import { model, Schema } from "mongoose";

export const ReportModel = model(
  "report",
  new Schema({
    name: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    updatedAt: {
      type: Date,
      default: new Date(),
    },
    detail: {
      type: Object,
      stuff: {
        type: String,
      },
      price: {
        type: String,
      },
    },
    reporterId: {
      type: String,
    },
  })
);
