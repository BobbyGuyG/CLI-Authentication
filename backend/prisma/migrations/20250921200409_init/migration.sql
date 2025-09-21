-- CreateTable
CREATE TABLE "public"."IspAdmin" (
    "id" TEXT NOT NULL,
    "ispName" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "ownerEmail" TEXT NOT NULL,
    "firebaseUid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IspAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IspAdmin_ownerEmail_key" ON "public"."IspAdmin"("ownerEmail");

-- CreateIndex
CREATE UNIQUE INDEX "IspAdmin_firebaseUid_key" ON "public"."IspAdmin"("firebaseUid");
