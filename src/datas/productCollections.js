//FOFELIA Collection
import FOFELIA_Snow from "../assets/Products/FOFELIA/FOFELIA_Snow.png";
import FOFELIA_Coffee from "../assets/Products/FOFELIA/FOFELIA_Coffee.png";
import FOFELIA_Cream from "../assets/Products/FOFELIA/FOFELIA_Cream.png";
//ONEA Collection
import ONEA_Banana from "../assets/Products/ONEA/ONEA_Banana.png";
import ONEA_Coconut from "../assets/Products/ONEA/ONEA_Coconut.png";
import ONEA_Strawberry from "../assets/Products/ONEA/ONEA_Strawberry.png";
//DARA Collection
import DARA_Yang from "../assets/Products/DARA/DARA_Yang.png";
import DARA_Yin from "../assets/Products/DARA/DARA_Yin.png";
import DARA_Yinyang from "../assets/Products/DARA/DARA_Yinyang.png";

const productCollections = [
  {
    collectionID: "FOFELIA",
    collectionName: "FOFELIA Collection",
    collectionProducts: [
      {
        productID: "FOFELIA01",
        productName: "FOFELIA Snow",
        productImg: FOFELIA_Snow,
        productShortDescription: "Back to basics",
        productLongDescription: "",
        productPrice: 24.99,
      },
      {
        productID: "FOFELIA02",
        productName: "FOFELIA Coffee",
        productImg: FOFELIA_Coffee,
        productShortDescription: "Your fresh start",
        productLongDescription: "",
        productPrice: 24.99,
      },
      {
        productID: "FOFELIA03",
        productName: "FOFELIA Cream",
        productImg: FOFELIA_Cream,
        productShortDescription: "Something special",
        productLongDescription: "",
        productPrice: 24.99,
      },
    ],
  },
  {
    collectionID: "ONEA",
    collectionName: "ONEA Collection",
    collectionProducts: [
      {
        productID: "ONEA01",
        productName: "ONEA Strawberry",
        productImg: ONEA_Strawberry,
        productShortDescription: "Be berry special today",
        productLongDescription: "",
        productPrice: 27.99,
      },
      {
        productID: "ONEA02",
        productName: "ONEA Banana",
        productImg: ONEA_Banana,
        productShortDescription: "Smile like a banana",
        productLongDescription: "",
        productPrice: 27.99,
      },
      {
        productID: "ONEA03",
        productName: "ONEA Coconut",
        productImg: ONEA_Coconut,
        productShortDescription: "Happy like a coconut",
        productLongDescription: "",
        productPrice: 27.99,
      },
    ],
  },
  {
    collectionID: "DARA",
    collectionName: "DARA Collection",
    collectionProducts: [
      {
        productID: "DARA01",
        productName: "DARA Yin",
        productImg: DARA_Yin,
        productShortDescription: "Comforts in black",
        productLongDescription: "",
        productPrice: 19.99,
      },
      {
        productID: "DARA02",
        productName: "DARA Yinyang",
        productImg: DARA_Yinyang,
        productShortDescription: "Fresh start for the day",
        productLongDescription: "",
        productPrice: 19.99,
      },
      {
        productID: "DARA03",
        productName: "Dara Yang",
        productImg: DARA_Yang,
        productShortDescription: "Something special",
        productLongDescription: "",
        productPrice: 19.99,
      },
    ],
  },
];

export default productCollections;
