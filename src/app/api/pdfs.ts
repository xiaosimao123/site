import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query; // pass the page to create PDF from as param
  console.log(url);
  res.setHeader("Content-Disposition", `attachment; filename="file.pdf"`);
  res.setHeader("Content-Type", "application/pdf");

  const pdf = await saveAsPdf("http://localhost:3000/blog/html");
  return res.send(pdf);
}
