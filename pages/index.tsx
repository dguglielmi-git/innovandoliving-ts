import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import { getPublishedProducts } from "../api/producto";
import { useTranslation } from "react-i18next";
import ListProductos from "../components/ListProductos";
import Seo from "../components/Seo";
import Footer from "../components/Footer/Footer";
import "../locales/i18n";
import { BUSINESS_NAME, DEFAULT_LIMIT_MAIN_PRODUCTS } from "../utils/constants";

export default function Home() {
  const { t } = useTranslation();
  const [productos, setProductos] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getPublishedProducts(DEFAULT_LIMIT_MAIN_PRODUCTS);
      if (size(response) > 0) setProductos(response);      
      else setProductos([]);
    })();
  }, []);

  return (
    <BasicLayout className="home">
      <Seo title={BUSINESS_NAME} />
      {!productos && <Loader active>{t("indexLoadingProducts")}</Loader>}
      {productos && size(productos) === 0 && (
        <div>
          <h3>{t("indexNotProductFound")}</h3>
        </div>
      )}
      {size(productos) > 0 && (
        <>
          <h2>{t("indexMainTitle")}</h2>
          <ListProductos productos={productos} />
        </>
      )}
      <Footer />
    </BasicLayout>
  );
}
