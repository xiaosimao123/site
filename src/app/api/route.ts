// eslint-disable-next-line import/no-extraneous-dependencies
import puppeteer from "puppeteer";
import { type NextRequest } from "next/server";
import { useSearchParams } from "next/navigation";

export const dynamic = "force-static";

const saveAsPdf = async (url: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: "networkidle0",
  });

  const result = await page.pdf({
    format: "a4",
  });
  await browser.close();

  return result;
};

export async function GET(req: Request, { params }) {
  // const { url } = req.query // pass the page to create PDF from as param
  console.log(params);
  // const url = new URL(req.url!)
  // const pdfurl = url.searchParams.get('pdfurl')
  // console.log(req.nextUrl.searchParams.get('pdfurl'))
  // const pdf = await saveAsPdf(req.nextUrl.searchParams.get('pdfurl'))
  return new Response("pdf", {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
