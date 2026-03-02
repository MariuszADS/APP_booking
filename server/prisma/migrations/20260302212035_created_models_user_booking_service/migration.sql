-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" INTEGER NOT NULL,
    "booked_date" INTEGER NOT NULL,
    "appoitment_date" INTEGER NOT NULL,
    "comment" TEXT
);

-- CreateTable
CREATE TABLE "Service" (
    "id" INTEGER NOT NULL,
    "type_service" TEXT NOT NULL,
    "comment" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_id_key" ON "Booking"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Service_id_key" ON "Service"("id");
