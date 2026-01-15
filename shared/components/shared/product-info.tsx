"use client";
import { ProductWithRelations } from "@/shared/types/prisma";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Title } from "./title";
import { Button } from "../ui";
import { ProductChooser } from "./product-chooser";
import { sizeLables, typesLables } from "@/shared/lib/consts";
import { useCart } from "@/shared/hooks";
import toast from "react-hot-toast";

export interface ProductInfoProps {
  product: ProductWithRelations;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const router = useRouter();
  const { addCartItem } = useCart();

  const defaultSize = product.options[0].size;
  const defaultType = product.options[0].type;

  const [currentOption, setCurrentOption] = useState<number>(
    product.options[0].id
  );

  const [size, setSize] = React.useState(defaultSize);

  function onSizeChange(nextSize: number) {
    const nextOption = product.options.find(
      (item) => nextSize === item.size && item.type === type
    );
    if (!nextOption) {
      const nextType = product.options.find(
        (item) => nextSize === item.size
      )?.type;
      if (!nextType) {
        console.error("Выбран невозможный размер");
        return;
      }
      setType(nextType);
    }
    setSize(nextSize);
  }

  const sizesList = new Set(
    product.options.map((option) => {
      return option.size;
    })
  );

  const [type, setType] = React.useState(defaultType);

  function onTypeChange(nextType: number) {
    const nextOption = product.options.find(
      (item) => nextType === item.type && item.size === size
    );
    if (!nextOption) {
      const nextSize = product.options.find(
        (item) => nextType === item.type
      )?.type;
      if (!nextSize) {
        console.error("Выбран невозможный тип");
        return;
      }
      setSize(nextSize);
    }
    setType(nextType);
  }

  const typesList = new Set(
    product.options.map((option) => {
      return option.type;
    })
  );

  const [selectedIng, setIng] = React.useState<number[]>([]);

  function onChangeIngList(nextId: number) {
    const nextIndex = selectedIng.indexOf(nextId);
    if (nextIndex === -1) {
      setIng((prev) => [...prev, nextId]);
    } else {
      setIng((prev) => prev.filter((_, i) => i !== nextIndex));
    }
  }

  const [totalPrice, setPrice] = React.useState(product.options[0].price);

  React.useEffect(() => {
    const nextOption = product.options.find((item) => {
      return item.size === size && item.type === type;
    })?.id;

    if (nextOption) setCurrentOption(nextOption);
  }, [size, type, product.options]);

  async function onClickAddButton() {
    await toast.promise(addCartItem(currentOption, selectedIng), {
      loading: "Добавляем вкусняшку...",
      success: "Добавили!",
      error: "Ошибка при добавлении",
    });
  }

  React.useEffect(() => {
    const nextOption = product.options.find(
      (item) => item.size === size && item.type === type
    );

    if (!nextOption) {
      console.error("Выбрана невозможная комбинация типа и размера");
      return;
    }

    let nextPrice = nextOption.price;

    selectedIng.forEach((selectedId) => {
      const selectedIngredient = product.ingredients.find(
        (item) => item.id === selectedId
      );
      if (!selectedIngredient) return;
      nextPrice += selectedIngredient.price;
    });

    setPrice(nextPrice);
  }, [size, type, selectedIng, product.options, product.ingredients]);

  return (
    <div className="flex gap-12 items-center justify-center">
      <Image
        width={512}
        height={512}
        src={product.imageUrl}
        alt={product.name}
      />
      <div className="py-4 max-w-100">
        <Title size="2xl">{product.name}</Title>

        <p className="text-gray-500 mt-3 text-lg max-w-100 mb-5">
          Состав:{" "}
          {product.roster.reduce(
            (str, item, index) => str + (index != 0 ? ", " : "") + item.name,
            ""
          )}
          .
        </p>

        {size !== 0 && (
          <ProductChooser
            options={sizesList}
            optionState={size}
            setOptionState={onSizeChange}
            optionLabels={sizeLables}
          />
        )}
        {type !== 0 && (
          <ProductChooser
            options={typesList}
            optionState={type}
            setOptionState={onTypeChange}
            optionLabels={typesLables[product.categoryId]}
          />
        )}

        {product.ingredients.length > 0 && (
          <>
            <Title size="m" className="mt-5 mb-4">
              Добавить по вкусу:
            </Title>
            <div className="flex flex-wrap gap-3">
              {product.ingredients.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={`flex flex-col gap-2 p-2 rounded-xl w-30 text-center mt-2 mb-0.5 cursor-pointer border border-gray-100 transition-all hover:mt-1 hover:mb-1.5 ${
                      selectedIng.indexOf(item.id) !== -1 && "bg-red-50"
                    }`}
                    onClick={() => onChangeIngList(item.id)}
                  >
                    <Image
                      width={50}
                      height={50}
                      src={item.imageUrl}
                      alt={item.name}
                      className="m-auto"
                    />
                    <p className="text-xs">{item.name}</p>
                    <p className="font-bold">{item.price}₽</p>
                  </div>
                );
              })}
            </div>
          </>
        )}

        <Button
          onClick={onClickAddButton}
          className="mt-10 cursor-pointer"
          size="lg"
        >
          Добавить в корзину за {totalPrice}₽
        </Button>
      </div>
    </div>
  );
};
