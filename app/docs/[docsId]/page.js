import ContentDisplay from "@/components/ContentDisplay";

const contentPage = ({ params: { docsId } }) => {
  return <ContentDisplay id={docsId} />;
};

export default contentPage;
