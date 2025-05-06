"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export default async function CreateBusiness(data: Business): Promise<{
  statusCode: number;
  message: string;
  businessId: string;
}> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(), // you need to pass the headers object.
    });
    const userId = session?.user.id;
    if (!userId) throw new Error("Unauthorized");

    const { name, type } = data;
    if (!name || !type) {
      return {
        statusCode: 403,
        message: "Mising name and type fields!",
        businessId: "",
      };
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new Error("User not found");

    if (user.businessId) throw new Error("User already has a business");

    const business = await prisma.business.create({
      data: {
        name,
        type,
      },
    });

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        businessId: business.id,
      },
    });

    if (!updatedUser.businessId) throw new Error("business id not found");

    return {
      statusCode: 201,
      message: "Business  successfully created!",
      businessId: updatedUser.businessId,
    };
  } catch (error) {
    console.error("Error creating business:", error);
    return {
      statusCode: 500,
      message: "Something went wrong please retry again!",
      businessId: "",
    };
  }
}
