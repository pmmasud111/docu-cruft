import { getDocumentContents } from "@/lib/doc";
import Link from "next/link";
import Tag from "./Tag";

const ContentDisplay = async ({ docsId }) => {
  const allContents = await getDocumentContents(docsId);
  const { title, date, author, category, tags, contentHtml } = allContents;

  return (
    <article>
      <h3>{title}</h3>
      <div>
        Published On : {date} By{" "}
        <Link href={`/author/${author}`}>{author}</Link>
        under the
        <Link href={`/category/${category}`}> {category}</Link> Category.
      </div>
      <div className=" flex gap-2">
        {tags.map((tag) => (
          <Tag tag={tag} key={docsId} />
        ))}
      </div>
      <div className="lead" dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
};

export default ContentDisplay;
