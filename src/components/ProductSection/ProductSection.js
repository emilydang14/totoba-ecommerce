import React from "react";
//
import Aux from "../../hoc/Aux";
import CollectionSlide from "./CollectionSlide/CollectionSlide";

const ProductSection = (props) => {
  const productCollections = props.productCollections.map(
    (productCollection) => (
      <CollectionSlide
        key={productCollection.collectionID}
        collectionHeading={productCollection.collectionName}
        products={productCollection.collectionProducts}
        addToCartClicked={props.addToCartClicked}
      />
    )
  );
  return (
    <Aux>
      {/* productIntro */}
      {productCollections}
    </Aux>
  );
};

export default ProductSection;
