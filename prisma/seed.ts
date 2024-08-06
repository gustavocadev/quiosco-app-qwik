import { PrismaClient } from '@prisma/client';
import { productos, categorias } from './data';

const prisma = new PrismaClient();

const seed = async () => {
  try {
    // we need to delete all products and categories first
    await prisma.product.deleteMany();

    // then delete categories
    await prisma.category.deleteMany();

    // seed categories first because products depend on them
    for (const c of categorias) {
      await prisma.category.create({
        data: {
          name: c.name,
          icon: c.icon,
          id: c.id,
          slug: c.slug,
        },
      });
    }

    // then seed products
    for (const p of productos) {
      await prisma.product.create({
        data: {
          name: p.name,
          price: p.price,
          categoryId: p.categoryId,
          image: p.image,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

seed();
