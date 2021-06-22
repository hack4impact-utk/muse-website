import Layout from "components/Layout";
import { NextPage } from "next";
import ContactForm from "components/ContactForm";
const contact: NextPage = () => (
  <Layout
    options={{
      initialView: false,
      wrapperDisabled: false,
    }}
  >
    <ContactForm></ContactForm>;
  </Layout>
);
export default contact;
