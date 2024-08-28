import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { Liff } from "@line/liff";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {

  // Provide `liff` object and `liffError` object
  // to page component as property
  // pageProps.liff = liffObject;
  // pageProps.liffError = liffError;
  return <Component {...pageProps} />;
}

export default MyApp;
