import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

export const prisma = new PrismaClient();

dotenv.config();
