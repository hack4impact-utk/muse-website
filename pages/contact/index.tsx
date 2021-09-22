import Layout from "components/shared/Layout";
import { NextPage } from "next";
import ContactForm from "components/contact/ContactForm";
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
