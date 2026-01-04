"use client";
import { ProductWithRelations } from "@/@types/prisma";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Title } from "./title";
import { Button } from "../ui";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ProductChooser } from "./product-chooser";
import { sizeLables, typesLables } from "@/lib/consts";

export interface ProductModalProps {
  product: ProductWithRelations;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product }) => {
  const router = useRouter();

  const defaultSize = product.options[0].size;
  const defaultType = product.options[0].type;

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

  function onCloseModal() {
    router.back();
  }

  return (
    <Dialog open={Boolean(product)} onOpenChange={onCloseModal}>
      <DialogContent
        className="w-auto max-w-231"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        <VisuallyHidden asChild>
          <DialogTitle>{product.name}</DialogTitle>
        </VisuallyHidden>
        <div className="flex gap-8 items-center">
          <Image
            width={452}
            height={452}
            src={product.imageUrl}
            alt={product.name}
          />
          <div className="pr-10 py-4">
            <Title size="xl">{product.name}</Title>

            <p className="text-gray-500 text-lg max-w-75 mb-3">
              Состав: тесто, хрючево, майонез, жир и холестерин. Размер 30 см,
              520 г.
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
                <div className="flex flex-wrap gap-3 max-h-65 overflow-y-auto">
                  {product.ingredients.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className={`flex flex-col gap-2 p-2 rounded-xl w-27 text-center mt-2 mb-0.5 cursor-pointer border border-gray-100 transition-all hover:mt-1 hover:mb-1.5 ${
                          selectedIng.indexOf(item.id) !== -1 && "bg-green-50"
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

            <Button className="mt-10 cursor-pointer">
              Добавить в корзину за {totalPrice}₽
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
