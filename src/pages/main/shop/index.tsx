import React from "react";
import "./styles.scss";
import { ShopItem } from "./item";

const items: ShopItem[] = [
  {
    id: 1,
    reviews: 87,
    description: `Apple / Смартфон IPhone 12 Pro 128 GB / 6.1" / OLED`,
    sbpPrice: "16 158 ₽",
    oldPrice: "23 999 ₽",
    price: "16 333 ₽",
    discount: "-14%",
    image: "",
    rating: 5,
  },
  {
    id: 2,
    reviews: 87,
    description: `Apple / Смартфон IPhone 12 Pro 128 GB / 6.1" / OLED`,
    sbpPrice: "16 158 ₽",
    oldPrice: "23 999 ₽",
    price: "16 333 ₽",
    discount: "-14%",
    image: "",
    rating: 5,
  },
  {
    id: 3,
    reviews: 87,
    description: `Apple / Смартфон IPhone 12 Pro 128 GB / 6.1" / OLED`,
    sbpPrice: "16 158 ₽",
    oldPrice: "23 999 ₽",
    price: "16 333 ₽",
    discount: "-14%",
    image: "",
    rating: 5,
  },
];
export const ShopPage = () => {
  return (
    <div className={"shop"}>
      {items.map((item) => (
        <ShopItem key={item.id} item={item} />
      ))}
    </div>
  );
};
