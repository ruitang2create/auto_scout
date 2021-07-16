import React from "react";
import { Helmet } from "react-helmet";
import TopNav from "./TopNav";
import styles from '../styles/Layout.module.css'

export default function Layout(props) {
  return (
    <div className={styles.pageLayout} style={{ height: "100vh" }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
        {/* <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"
        ></link> */}
        <meta
          name="description"
          content="An application that help you find auto models information"
        />
      </Helmet>
      <TopNav />
      {props.children}
    </div>
  );
}
