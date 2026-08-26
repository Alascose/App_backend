-- CreateTable
CREATE TABLE "Stock" (
    "id" SERIAL NOT NULL,
    "categorie" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);
