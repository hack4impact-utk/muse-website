import {
  builder,
  BuilderComponent,
  BuilderContent,
  Builder,
} from "@builder.io/react";
import { GetStaticPropsContext } from "next";
import Layout from "components/shared/Layout";
import "components/Builder/Button";
//All of this code below comes from the Builder.io GitHub
//https://github.com/BuilderIO/builder/blob/master/examples/next-js-builder-site/src/pages/%5B...page%5D.tsx
builder.init(process.env.NEXT_PUBLIC_BUILDER_IO_KEY as string);
const USE_CODEGEN = false;
interface Props {
  builderPage: BuilderContent;
}

const MyComponent: React.FC<Props> = ({ builderPage }) => {
  const heroText = builderPage
    ? `${builderPage.data.pageTitle || builderPage.data.title}`
    : "Muse Knoxville";
  return (
    <Layout
      options={{
        hero: true,
        heroSize: "md",
        heroText: heroText,
        initialView: false,
        wrapperDisabled: false,
      }}
    >
      {builderPage || Builder.isEditing || Builder.isPreviewing ? (
        <BuilderComponent
          content={builderPage}
          name="page"
          codegen={USE_CODEGEN}
        />
      ) : (
        <>
          <h1>404</h1>
        </>
      )}
    </Layout>
  );
};

export default MyComponent;

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<any> {
  const path = `/${(context.params?.page as string[])?.join("/") || ""}`;
  // Don't target on url and device for better cache efficiency
  const targeting = { urlPath: "_", device: "_" } as any;

  const page = await builder
    .get("page", {
      userAttributes: { ...targeting, urlPath: path },
      ...(!USE_CODEGEN
        ? {}
        : {
            format: "react",
          }),
    })
    .promise();

  // If there is a Builder page for this URL, this will be an object, otherwise it'll be null
  return {
    props: { builderPage: page || null },
    revalidate: true,
    notFound: !page,
  };
}

export async function getStaticPaths(): Promise<any> {
  const results = await builder.getAll("page", {
    key: "pages:all",
    fields: "data.url",
    limit: 200,
    options: {
      noTargeting: true,
    },
  });

  const paths = results
    .filter(item => !item.data?.url?.startsWith("/c/"))
    .filter(item => item.data?.url !== "/")
    .map(item => ({
      params: { page: (item.data?.url?.replace("/", "") || "_").split("/") },
    }));
  return {
    paths,
    fallback: true,
  };
}
