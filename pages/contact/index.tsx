import Layout from "components/Layout";
import { NextPage } from "next";
import ContactForm from "components/ContactForm";
const contact: NextPage = () => {
  return (
    <Layout
      options={{
        hero: true,
        heroSize: "sm",
        heroText: "Contact Us",
        initialView: false,
        wrapperDisabled: false,
      }}
    >
      <ContactForm />;
    </Layout>
  );
};
export default contact;
