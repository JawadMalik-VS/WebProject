-- CreateTable
CREATE TABLE "Meetups" (
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "address" TEXT,
    "description" TEXT,

    CONSTRAINT "Meetups_pkey" PRIMARY KEY ("title")
);
