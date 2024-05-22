"use client";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Fira_Code } from "next/font/google";
import React from "react";
import "./globals.css";

const Fira = Fira_Code({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (typeof window !== "undefined") {
    window.onload = function () {
      if (localStorage.getItem("theme"))
        document
          .querySelector<HTMLElement>(":root")
          ?.style.setProperty("--card-rgb", localStorage.getItem("theme"));
    };
  }

  function calcAge(dateString: Date) {
    let birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / 31557600000);
  }

  function birthday(date = "Jun 29") {
    if (Date().includes(date)) {
      return (
        <>
          Today is my birthday, turning {calcAge(new Date("2008-02-04"))} years
          old{" "}
        </>
      );
    } else
      return (
        <>I&apos;m currently {calcAge(new Date("2008-02-04"))} years old </>
      );
  }
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Me.png" type="image/png" sizes="any" />
        <meta property="og:title" content="Snowi - Portfolio" />
        <title>snowi.dev</title>
        <meta name="theme-color" content="#4ca6ca" />
        <meta name="msapplication-TileColor" content="#4ca6ca" />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:image"
          content="https://snowi.dev/Me.png"
        />
        <meta
          name="description"
          content={`Hello, my name is Snowi. ${birthday()} and I've been coding for ${calcAge(
            new Date("2019-07-03")
          )} years. I enjoy creating projects on my free time.`}
        />
        <meta
          property="og:description"
          content={`Hello, my name is Snowi. ${birthday()} and I've been coding for ${calcAge(
            new Date("2019-07-03")
          )} years. I enjoy creating projects on my free time.`}
        />
      </head>
      <body className={Fira.className}>
        <SpeedInsights />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
