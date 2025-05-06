import { seedBusinessData } from "@/actions/seed";

export async function GET() {
  const result = await seedBusinessData();
  return Response.json(result);
}
