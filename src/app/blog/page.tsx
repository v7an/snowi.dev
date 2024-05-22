"use client";
import { usePathname } from "next/navigation";
import Page from "@/components/page";
import Image from "next/image";
import React from "react";

export default function Projects() {
  const array = [
    {
      title: "This is a test",
      edit: "February 29, 2024",
      date: "February 22, 2024",
      image: "/Github.svg",
      path: "/blog/test",
      num: 0,
    },
  ];

  return (
    <main key={usePathname()} className="main">
      <Page>
        <div
          style={{ marginRight: 10, maxHeight: "80vh" }}
          className="flexGrid"
        >
          {array
            .sort((a, b) => b.num - a.num)
            .map((project) => (
              <a
                key={project.num}
                href={project.path}
                className="blogCard flex"
              >
                <div className="blogTitle">
                  <div className="blogTitle">{project.title}</div>
                  <div className="blogFooter">
                    {project.date}
                    {project.edit && (
                      <Image
                        id="Edit"
                        style={{ marginLeft: "3px" }}
                        src="../Edit.svg"
                        width={10}
                        height={10}
                        draggable={false}
                        alt="Last edit"
                      />
                    )}
                  </div>

                  {project.image && (
                    <Image
                      style={{ display: "block", marginLeft: "auto" }}
                      src={project.image}
                      height={65}
                      width={75}
                      draggable={false}
                      alt="BlogPost"
                    />
                  )}
                </div>
              </a>
            ))}
        </div>
      </Page>
    </main>
  );
}
