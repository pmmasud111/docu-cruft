"use client";

import {
  getDocumentsByAuthor,
  getDocumentsByCategory,
  getDocumentsByTag,
} from "@/utils/doc-utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SideBar = ({ docs }) => {
  const [rootNodes, setRootNodes] = useState([]);
  const [nonRootNodes, setNonRootNodes] = useState({});
  const pathName = usePathname();

  useEffect(() => {
    let matchedDocs = docs;
    if (pathName.includes("/tags")) {
      const tag = pathName.split("/")[2];
      matchedDocs = getDocumentsByTag(docs, tag);
    } else if (pathName.includes("/author")) {
      const author = pathName.split("/")[2];
      matchedDocs = getDocumentsByAuthor(docs, author);
    } else if (pathName.includes("/category")) {
      const category = pathName.split("/")[2];
      matchedDocs = getDocumentsByCategory(docs, category);
    }

    const roots = matchedDocs.filter((doc) => !doc.parent);
    const nonRoot = Object.groupBy(
      matchedDocs.filter((doc) => doc.parent),
      ({ parent }) => parent
    );

    const nonRootsKeys = Reflect.ownKeys(nonRoot);
    nonRootsKeys.forEach((key) => {
      const foundInRoots = roots.find((root) => root.id === key);
      if (!foundInRoots) {
        const foundInDocs = docs.find((doc) => doc.id === key);
        roots.push(foundInDocs);
      }
    });
    roots.sort((a, b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    });

    setRootNodes([...roots]);
    setNonRootNodes({ ...nonRoot });
  }, [docs, pathName]);

  return (
    <nav className="hidden lg:mt-10 lg:block">
      <ul role="list" className="border-l border-transparent">
        {rootNodes.map((rootNode) => (
          <li key={rootNode.id} className="relative">
            <Link
              aria-current="page"
              className="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-zinc-900 transition dark:text-white"
              href={`/docs/${rootNode.id}`}
            >
              <span className="truncate">{rootNode.title}</span>
            </Link>
            {nonRootNodes[rootNode.id] && (
              <ul role="list" className="border-l border-transparent">
                {nonRootNodes[rootNode.id].map((subRoot) => (
                  <li key={subRoot.id} className="relative">
                    <Link
                      aria-current="page"
                      className="flex justify-between gap-2 py-1 pl-7 pr-3 text-sm text-zinc-900 transition dark:text-white"
                      href={`/docs/${rootNode.id}/${subRoot.id}`}
                    >
                      <span className="truncate">{subRoot.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideBar;
