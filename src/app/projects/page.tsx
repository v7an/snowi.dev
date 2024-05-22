"use client";
import { usePathname } from "next/navigation";
import ToolTip from "@/components/ToolTipCover";
import Translate from "@components/translation";
import Page from "@/components/page";
import Image from "next/image";
import Link from "next/link";
import React, { SetStateAction } from "react";

export default function Projects() {
  const [data, setData] = React.useState<string | null>("");

  React.useEffect(() => {
    const handleStorageChange = (event: any) => {
      if (localStorage.getItem("language") !== data)
        return setData(localStorage.getItem("language"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [data]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      return setData(
        localStorage.getItem("language")
          ? localStorage.getItem("language")
          : "en_EN"
      );
    }
  }, []);

  const array: {
    target: string;
    title: string;
    image: string | null;
    tags: any[];
    footer: { start: string; end: string };
    flags: any[];
    github: string | null;
    website: string | null;
    community: string | null;
  }[] = [
    {
      target: "Inno",
      title: "Inno-Host",
      image: null,
      tags: [{ name: "Host Node.JS/Python", color: "#5764F3" }],
      footer: {
        start: "Jan 22, 2024",
        end: new Translate().get(data!, "Projects.footer.endPresent"),
      },
      flags: [],
      github: null,
      community: "https://discord.gg/inno",
      website: "https://inno-host.pro",
    },

    {
      target: "Guide",
      title: "Guide - Discord Server",
      image: null,
      tags: [
        { name: "Guide", color: "#FE4654" },
      ],
      footer: {
        start: "Apr 12, 2023",
        end: new Translate().get(data!, "Projects.footer.endPresent"),
      },
      flags: [],
      github: null,
      community: "https://discord.gg/guide",
      website: null,
    },
    {
      target: "Faster",
      title: "Faster Project",
      image: null,
      tags: [{ name: "Faster Bot", color: "#FE4654" }],
      footer: {
        start: "Feb 4, 2023",
        end: "Mai 19, 2024",
      },
      flags: [
        {
          name: new Translate().get(data!, "Projects.flags.discon"),
          color: "#CC222A",
        },
      ],
      github: null,
      community: "https://discord.gg/f7NYjGQJEQ",
      website: "https://fasterbot.dev",
    },
  ];

  return (
    <main key={usePathname()} className="main">
      <Page>
        <div
          style={{ marginRight: 10, maxHeight: "80vh" }}
          className="flexGrid"
        >
          {array.map((project) => (
            <ToolTip
              key={project.target}
              placement="top"
              content={
                <div
                  style={{
                    backgroundColor: "#595959",
                    border: "2px 2px 2px 2px #595959",
                    borderRadius: "5px",
                  }}
                  className="flexGrid center"
                >
                  {project.github ? (
                    <Link href={project.github} target="_blank">
                      <button className="button">GitHub</button>
                    </Link>
                  ) : (
                    <button className="button disable" disabled>
                      GitHub
                    </button>
                  )}

                  {project.community ? (
                    <Link href={project.community} target="_blank">
                      <button className="button">
                        {new Translate().get(
                          data!,
                          "Projects.buttons.community"
                        )}
                      </button>
                    </Link>
                  ) : (
                    <button className="button disable" disabled>
                      {new Translate().get(data!, "Projects.buttons.community")}
                    </button>
                  )}

                  {project.website ? (
                    <Link href={project.website} target="_blank">
                      <button className="button">
                        {new Translate().get(data!, "Projects.buttons.website")}
                      </button>
                    </Link>
                  ) : (
                    <button className="button disable" disabled>
                      {new Translate().get(data!, "Projects.buttons.website")}
                    </button>
                  )}
                </div>
              }
            >
              <div className="projectCard flex">
                <div className="projectTitle">
                  {project.image && (
                    <Image
                      className="img"
                      src={project.image}
                      height={25}
                      width={25}
                      draggable={false}
                      alt="ProjectName"
                      priority
                    />
                  )}
                  <a style={{ marginLeft: 0.7, marginTop: 1.3 }}>
                    {project.title}
                  </a>
                </div>
                <div className="projectDesc">
                  {new Translate().get(
                    data!,
                    `Projects.list.${project.target}.desc`
                  )}
                </div>
                <div className="tags">
                  {project.tags.map((tag) => (
                    <div
                      key={tag.name}
                      style={{ backgroundColor: tag.color, padding: "0.2rem" }}
                      className="projectTags"
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>
                <div className="projectFooter">
                  {project.footer.start} <a style={{ color: "#6A6969" }}>-</a>{" "}
                  <a style={{ color: "white", fontWeight: 1000 }}>
                    {project.footer.end}
                  </a>
                  {project.flags.length > 0 &&
                    project.flags.map((e) => (
                      <a
                        key={e.name}
                        style={{
                          color: e.color,
                          fontWeight: 1000,
                          marginLeft: 10,
                        }}
                      >
                        {e.name}
                      </a>
                    ))}
                </div>
              </div>
            </ToolTip>
          ))}
        </div>
      </Page>
    </main>
  );
}
