-- CreateTable
CREATE TABLE "City" (
    "name" TEXT NOT NULL,
    "temp" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "City_name_key" ON "City"("name");
