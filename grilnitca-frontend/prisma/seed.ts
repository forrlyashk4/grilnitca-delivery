import { INGREDIENTS_LIST, CATEGORIES_LIST, PRODUCTS_LIST } from "./const";
import { prisma } from "../lib/prisma";
import { Prisma } from "../generated/prisma/browser";
import { hashSync } from "bcrypt";

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

function generateOption({
  productId,
  price,
  size = 0,
  type = 1,
}: {
  productId: number;
  price: number;
  size?: number;
  type?: number;
}) {
  return {
    productId,
    type,
    size,
    price,
  } as Prisma.ProductOptionUncheckedCreateInput;
}

async function up() {
  await prisma.user.createMany({
    data: [
      {
        email: "user@gmail.com",
        name: "User LName",
        password: hashSync("example11", 10),
        provider: "github",
        providerId: "1",
        role: "USER",
        verifiedAt: new Date(),
      },
      {
        email: "admin@grilnitca.ru",
        name: "Admin Ipsum",
        password: hashSync("adminpassword", 10),
        role: "ADMIN",
        verifiedAt: new Date(),
      },
    ],
  });

  await prisma.ingredient.createMany({
    data: INGREDIENTS_LIST,
  });

  await prisma.category.createMany({
    data: CATEGORIES_LIST,
  });

  for (let i = 0; i < PRODUCTS_LIST.length; i++) {
    const data = {
      ...PRODUCTS_LIST[i],
      ingredients:
        i < 5
          ? {
              connect: INGREDIENTS_LIST.slice(0, 3),
            }
          : i < 8
          ? {
              connect: INGREDIENTS_LIST.slice(2, 6),
            }
          : undefined,
    };

    await prisma.product.create({
      data,
    });
  }

  // Шаурма
  await prisma.productOption.createMany({
    data: PRODUCTS_LIST.slice(0, 5)
      .map((item) => {
        return [
          generateOption({ productId: item.id, price: 300, size: 1 }),
          generateOption({ productId: item.id, price: 375, size: 2 }),
          generateOption({ productId: item.id, price: 400, size: 3 }),
        ];
      })
      .flat(1),
  });

  // Пицца
  await prisma.productOption.createMany({
    data: PRODUCTS_LIST.slice(5, 8)
      .map((item) => {
        return [
          generateOption({ productId: item.id, price: 400, size: 1, type: 1 }),
          generateOption({ productId: item.id, price: 600, size: 2, type: 1 }),
          generateOption({ productId: item.id, price: 600, size: 2, type: 2 }),
          generateOption({ productId: item.id, price: 650, size: 3, type: 1 }),
          generateOption({ productId: item.id, price: 650, size: 3, type: 2 }),
        ];
      })
      .flat(1),
  });

  // Остальное (без доп. опций)
  await prisma.productOption.createMany({
    data: PRODUCTS_LIST.slice(8).map((item) => {
      return generateOption({
        productId: item.id,
        price: randomNumber(190, 490),
      });
    }),
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        amount: 0,
        token: "723198132891",
      },
      {
        userId: 2,
        amount: 0,
        token: "1089209123",
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productId: 1,
      cartId: 1,
      quantity: 1,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }],
      },
    },
  });

  await prisma.story.createMany({
    data: [
      {
        previewUrl:
          "https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496",
      },
      {
        previewUrl:
          "https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640",
      },
      {
        previewUrl:
          "https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020",
      },
      {
        previewUrl:
          "https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958",
      },
      {
        previewUrl:
          "https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737",
      },
      {
        previewUrl:
          "https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284",
      },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE",
      }, // todo: поменять на другие сторис и засунуть их в паблик
    ],
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductOption" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
