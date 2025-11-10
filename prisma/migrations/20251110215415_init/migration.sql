/*
  Warnings:

  - You are about to drop the column `genero` on the `funcionarios` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[registro]` on the table `funcionarios` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `registro` to the `funcionarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "funcionarios" DROP COLUMN "genero",
ADD COLUMN     "registro" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "funcionarios_registro_key" ON "funcionarios"("registro");
