import Layout from "components/Layout";
import { NextPage } from "next";
import ContactForm from "components/ContactForm";
const contact: NextPage = () => {
  return (
    <Layout>
      <ContactForm></ContactForm>;
    </Layout>
  );
};
export default contact;
