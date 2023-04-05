-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "otp" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "pid" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "refId" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("pid")
);

-- CreateTable
CREATE TABLE "Article" (
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "markdown" TEXT NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("title")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "autID" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "cid" TEXT NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("autID")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_refId_fkey" FOREIGN KEY ("refId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_cid_fkey" FOREIGN KEY ("cid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
