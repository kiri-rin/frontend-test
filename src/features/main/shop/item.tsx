import React, { PropsWithChildren } from "react";
export type ShopItem = {
  id: number;
  image: string;
  price: string;
  oldPrice: string;
  sbpPrice: string;
  description: string;
  rating: number;
  reviews: number;
  discount: string;
};
export const ShopItem = ({ item }: { item: ShopItem }) => {
  return (
    <div className={"shop-item"}>
      <div className={"shop-item__image-container"}>
        <img
          src={
            "https://basket-10.wb.ru/vol1413/part141316/141316027/images/c516x688/1.jpg"
          }
          className={"shop-item__image"}
        ></img>
        <div className={"shop-item__image-hover"}>Быстрый просмотр</div>
        <div className={"shop-item__discount"}>{item.discount}</div>
      </div>
      <div className={"shop-item__info"}>
        <div className={"shop-item__main-price-container"}>
          <div className={"shop-item__main-price"}>{item.price}</div>
          <div className={"shop-item__old-price"}>{item.oldPrice}</div>
        </div>
        <div className={"shop-item__sbp-price"}>{item.sbpPrice}</div>
        <div className={"shop-item__description"}>{item.description}</div>
        <div className={"shop-item__rating-container"}>
          <div className={"shop-item__rating"} />
          <div className={"shop-item__reviews"}>{item.reviews}</div>
        </div>
        <button className={"shop-item__installment-button"}>
          РАССРОЧКА 0-0-6
        </button>
        <div className={"shop-item__bottom-container"}>
          <button className={"shop-item__buy-button"}>Купить</button>
          <button className={"shop-item__like-button"}></button>
        </div>
      </div>
    </div>
  );
};
