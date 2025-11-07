/*
  Warnings:

  - Added the required column `genero` to the `funcionarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "funcionarios" ADD COLUMN     "genero" TEXT NOT NULL;
