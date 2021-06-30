import { builder, Builder } from "@builder.io/react";
import styles from "../builder.module.scss";
builder.init(process.env.NEXT_PUBLIC_BUILDER_IO_KEY as string);

export const GreenLinkButtonComponent = (props: {
  link: string;
  text: string;
}) => (
  <a
    className={`${styles["link-button"]} ${styles["link-button-green"]}`}
    href={props.link}
  >
    {props.text}
  </a>
);

export const OrangeLinkButtonComponent = (props: {
  link: string;
  text: string;
}) => (
  <a
    className={`${styles["link-button"]} ${styles["link-button-orange"]}`}
    href={props.link}
  >
    {props.text}
  </a>
);

Builder.registerComponent(GreenLinkButtonComponent, {
  name: "Green Link Button",
  inputs: [
    {
      name: "text",
      type: "string",
      defaultValue: "Green Button",
    },
  ],
});

Builder.registerComponent(OrangeLinkButtonComponent, {
  name: "Orange Link Button",
  inputs: [
    {
      name: "text",
      type: "string",
      defaultValue: "Orange Button",
    },
  ],
});
