"use client";
import Translate from "@components/translation";
import ToolTip from "@/components/ToolTip";
import Page from "@/components/page";
import Image from "next/image";
import Link from "next/link";
import React, { SetStateAction } from "react";

export default function Home() {
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

  const links: { url: string; src: string; alt: string }[] = [
    {
      url: "https://discord.gg/inno",
      src: "Discord.svg",
      alt: "Discord",
    },
    {
      url: "https://github.com/realsnowi",
      src: "Github.svg",
      alt: "GitHub",
    },
    {
      url: "https://x.com/inno-host",
      src: "/X.jpg",
      alt: "X.com",
    },
  ];

  function calcAge(dateString: Date) {
    let birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / 31557600000);
  }

  function birthday(date = "Jun 29") {
    if (Date().includes(date)) {
      return new Translate().get(data!, "Misc.page.birthday.today", {
        age: calcAge(new Date("2008-02-04")),
      });
    } else
      return new Translate().get(data!, "Misc.page.birthday.random", {
        age: calcAge(new Date("2008-02-04")),
      });
  }
  return (
    <main className="main">
      <Page>
        <div style={{ width: 550, marginTop: 25 }}>
          <div className="center flexGrid">
            <Image
              style={{ marginBottom: 15 }}
              className="hiding"
              src="/Me.png"
              height={140}
              width={140}
              draggable={false}
              alt="Avatar"
              priority
            />
          </div>
          <div className="sizing">
            {new Translate().get(data!, "Misc.page.descHello")}{" "}
            <strong className="Blue">Snowi</strong>.{" "} {birthday()}{" "}
            {new Translate().get(data!, "Misc.page.desc", {
              date: calcAge(new Date("2019-07-03")),
            })}
          </div>
          <div style={{ marginTop: "20px" }} className="flexGrid centered">
            {links.map((item) => (
              <Link key={item.alt} href={item.url} target="_blank">
                <ToolTip content={item.alt} placement="bottom">
                  <div className="cardSocials flex">
                    <Image
                      className="img"
                      style={{ marginTop: 5 }}
                      src={item.src}
                      width={37}
                      height={37}
                      draggable={false}
                      alt={item.alt}
                      priority
                    />
                  </div>
                </ToolTip>
              </Link>
            ))}
          </div>
        </div>

        <Image
          className="hide highlight"
          src="/Me.png"
          height={240}
          width={240}
          draggable={false}
          alt="Avatar"
          priority
        />
      </Page>
    </main>
  );
}
