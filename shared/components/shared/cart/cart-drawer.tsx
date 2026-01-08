import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  Button,
} from "../../ui";
import React, { ReactNode } from "react";
import Image from "next/image";
import { Title } from "../title";

export interface CartDrawerProps {
  children: ReactNode;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ children }) => {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>

      <SheetContent className="bg-[#F4F1EE]">
        <SheetHeader>
          <SheetTitle className="text-2xl">
            В корзине <span className="font-bold">5 товаров</span>
          </SheetTitle>
          <SheetDescription>Это будет очень вкусно!</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 overflow-y-auto">
          <div className="flex gap-2 items-start bg-white px-4 py-2">
            <Image
              src="/products/product-1.png"
              alt="Гавайская"
              width={75}
              height={75}
            />
            <div>
              <Title size="xs">Гавайская</Title>
              <p className="text-gray-600 text-sm">Большая, итальянская</p>
              <p className="text-gray-600 text-sm">
                + маринованные огурчики, сырный соус
              </p>
              <div className="mt-2 py-4 border-t flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Button
                    className="px-2! py-0.5! h-auto! rounded-sm border border-primary text-primary font-bold cursor-pointer"
                    variant="outline"
                  >
                    -
                  </Button>
                  <div className="text-lg">2</div>
                  <Button
                    className="px-2! py-0.5! h-auto! rounded-sm border border-primary text-primary font-bold cursor-pointer"
                    variant="outline"
                  >
                    +
                  </Button>
                </div>
                <p className="font-bold">320 руб.</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-start bg-white px-4 py-2">
            <Image
              src="/products/product-10.png"
              alt="Гавайская"
              width={75}
              height={75}
            />
            <div className="w-full">
              <Title size="xs">Том ямчик</Title>
              <div className="mt-2 py-4 border-t flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="rounded-sm border border-primary px-2 text-primary font-bold">
                    -
                  </div>
                  <div className="text-lg">2</div>
                  <div className="rounded-sm border border-primary px-2 text-primary font-bold">
                    +
                  </div>
                </div>
                <p className="font-bold">320 руб.</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-start bg-white px-4 py-2">
            <Image
              src="/products/product-1.png"
              alt="Гавайская"
              width={75}
              height={75}
            />
            <div>
              <Title size="xs">Гавайская</Title>
              <p className="text-gray-600 text-sm">Большая, итальянская</p>
              <p className="text-gray-600 text-sm">
                + маринованные огурчики, сырный соус
              </p>
              <div className="mt-2 py-4 border-t flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="rounded-sm border border-primary px-2 text-primary font-bold">
                    -
                  </div>
                  <div className="text-lg">2</div>
                  <div className="rounded-sm border border-primary px-2 text-primary font-bold">
                    +
                  </div>
                </div>
                <p className="font-bold">320 руб.</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-start bg-white px-4 py-2">
            <Image
              src="/products/product-1.png"
              alt="Гавайская"
              width={75}
              height={75}
            />
            <div>
              <Title size="xs">Гавайская</Title>
              <p className="text-gray-600 text-sm">Большая, итальянская</p>
              <p className="text-gray-600 text-sm">
                + маринованные огурчики, сырный соус
              </p>
              <div className="mt-2 py-4 border-t flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="rounded-sm border border-primary px-2 text-primary font-bold">
                    -
                  </div>
                  <div className="text-lg">2</div>
                  <div className="rounded-sm border border-primary px-2 text-primary font-bold">
                    +
                  </div>
                </div>
                <p className="font-bold">320 руб.</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-start bg-white px-4 py-2">
            <Image
              src="/products/product-1.png"
              alt="Гавайская"
              width={75}
              height={75}
            />
            <div>
              <Title size="xs">Гавайская</Title>
              <p className="text-gray-600 text-sm">Большая, итальянская</p>
              <p className="text-gray-600 text-sm">
                + маринованные огурчики, сырный соус
              </p>
              <div className="mt-2 py-4 border-t flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="rounded-sm border border-primary px-2 text-primary font-bold">
                    -
                  </div>
                  <div className="text-lg">2</div>
                  <div className="rounded-sm border border-primary px-2 text-primary font-bold">
                    +
                  </div>
                </div>
                <p className="font-bold">320 руб.</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-start bg-white px-4 py-2">
            <Image
              src="/products/product-1.png"
              alt="Гавайская"
              width={75}
              height={75}
            />
            <div>
              <Title size="xs">Гавайская</Title>
              <p className="text-gray-600 text-sm">Большая, итальянская</p>
              <p className="text-gray-600 text-sm">
                + маринованные огурчики, сырный соус
              </p>
              <div className="mt-2 py-4 border-t flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="rounded-sm border border-primary px-2 text-primary font-bold">
                    -
                  </div>
                  <div className="text-lg">2</div>
                  <div className="rounded-sm border border-primary px-2 text-primary font-bold">
                    +
                  </div>
                </div>
                <p className="font-bold">320 руб.</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-start bg-white px-4 py-2">
            <Image
              src="/products/product-1.png"
              alt="Гавайская"
              width={75}
              height={75}
            />
            <div>
              <Title size="xs">Гавайская</Title>
              <p className="text-gray-600 text-sm">Большая, итальянская</p>
              <p className="text-gray-600 text-sm">
                + маринованные огурчики, сырный соус
              </p>
              <div className="mt-2 py-4 border-t flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="rounded-sm border border-primary px-2 text-primary font-bold">
                    -
                  </div>
                  <div className="text-lg">2</div>
                  <div className="rounded-sm border border-primary px-2 text-primary font-bold">
                    +
                  </div>
                </div>
                <p className="font-bold">320 руб.</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-start bg-white px-4 py-2">
            <Image
              src="/products/product-1.png"
              alt="Гавайская"
              width={75}
              height={75}
            />
            <div>
              <Title size="xs">Гавайская</Title>
              <p className="text-gray-600 text-sm">Большая, итальянская</p>
              <p className="text-gray-600 text-sm">
                + маринованные огурчики, сырный соус
              </p>
              <div className="mt-2 py-4 border-t flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="rounded-sm border border-primary px-2 text-primary font-bold">
                    -
                  </div>
                  <div className="text-lg">2</div>
                  <div className="rounded-sm border border-primary px-2 text-primary font-bold">
                    +
                  </div>
                </div>
                <p className="font-bold">320 руб.</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-start bg-white px-4 py-2">
            <Image
              src="/products/product-1.png"
              alt="Гавайская"
              width={75}
              height={75}
            />
            <div>
              <Title size="xs">Гавайская</Title>
              <p className="text-gray-600 text-sm">Большая, итальянская</p>
              <p className="text-gray-600 text-sm">
                + маринованные огурчики, сырный соус
              </p>
              <div className="mt-2 py-4 border-t flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="rounded-sm border border-primary px-2 text-primary font-bold">
                    -
                  </div>
                  <div className="text-lg">2</div>
                  <div className="rounded-sm border border-primary px-2 text-primary font-bold">
                    +
                  </div>
                </div>
                <p className="font-bold">320 руб.</p>
              </div>
            </div>
          </div>
        </div>

        <SheetFooter>
          <Button className="cursor-pointer">Оформить заказ</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
