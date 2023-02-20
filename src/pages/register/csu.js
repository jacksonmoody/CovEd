import React from "react";
import {graphql } from "gatsby";
import CSUMentee from "../../content/Register/csu.js";
import Layout from "../../components/Layout";


import { Container } from "@material-ui/core";
const RegisterCSUPage = () => {
    return (
    <Layout>
        <Container>
            <CSUMentee/>
        </Container>
    </Layout>)
};

export default RegisterCSUPage;
export const query = graphql`
  query($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
