import Link from "next/link";

const Tag = ({ tag, key }) => {
  return (
    <Link href={`/tags/${tag}`} className="bg-gray-200 px-2 rounded ">
      {tag}
    </Link>
  );
};

export default Tag;
