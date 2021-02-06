import React from "react";
import styles from "./builder.module.scss";
import { Tab } from "semantic-ui-react";
import Component from "../Component/Component";
import useTranslation from "../../intl/useTranslation";

export default function Navigation({}) {
  const { t } = useTranslation();

  const panes = [
    {
      menuItem: "Réglages",
      render: () => <Tab.Pane attached={true}>Tab 1 Content</Tab.Pane>,
    },
    {
      menuItem: "Composants",
      render: () => (
        <Tab.Pane attached={true}>
          <Component
            balise={t("titleTag")}
            label={t("titleLabel")}
            color={"orange"}
            tooltip={t("titleTooltip")}
          />
          <Component
            balise={t("imageTag")}
            label={t("imageLabel")}
            color={"yellow"}
            tooltip={t("imageTooltip")}
          />
          <Component
            balise={t("buttonTag")}
            label={t("buttonLabel")}
            color={"teal"}
            tooltip={t("buttonTooltip")}
          />
          <Component
            balise={t("tableTag")}
            label={t("tableLabel")}
            color={"purple"}
            tooltip={t("tableTooltip")}
          />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <div className={styles.navigation}>
        <Tab panes={panes} />
        <div>
          <button>test</button>
        </div>
      </div>
    </>
  );
}
