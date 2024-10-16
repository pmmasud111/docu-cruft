import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

const postDirectory = path.join(process.cwd(), "docs");

const getDocuments = () => {
  const fileNames = fs.readdirSync(postDirectory);

  const allDocuments = fileNames.map((fileName) => {
    const id = fileName.replace(".md", "");
    const fullPath = path.join(postDirectory, fileName);
    const fileContent = fs.readFileSync(fullPath, "utf8");
    const metaResult = matter(fileContent);

    return {
      id,
      ...metaResult.data,
    };
  });

  return allDocuments.sort((a, b) => {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  });
};
export default getDocuments;

export const getDocumentContents = async (id) => {
  const fullPath = path.join(postDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf8");
  const metaResult = matter(fileContent);
  const processContent = await remark().use(html).process(metaResult.content);
  const contentHtml = await processContent.toString();

  return {
    id,
    ...metaResult.data,
    contentHtml,
  };
};
