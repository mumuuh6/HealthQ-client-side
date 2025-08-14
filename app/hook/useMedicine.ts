"use client"
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import UseAxiosNormal from "./UseAxiosNormal";

const useMedicines = (slug?: string) => {
  const axiossecure = UseAxiosNormal();
  const { data: session, status } = useSession();

  // Fetch all medicines
  const { data: medicineinfo = [], refetch, isLoading:isMedicineLoading } = useQuery({
    queryKey: ['medicineinfo', session?.user?.email],
    queryFn: async () => {
      const res = await axiossecure.get(`medicines`);
      return res.data?.user;
    },
    // enabled: !!session?.user?.email,
  });

  // Fetch a single medicine dynamically if slug is provided
  const { data: PerMedicineInfo = [],isLoading:isPerMedicineLoading } = useQuery({
    queryKey: ['PerMedicine', slug], // add slug to query key
    queryFn: async () => {
      if (!slug) return null; // avoid calling API if no slug
      const res = await axiossecure.get(`/medicines/${slug}`);
      return res.data.medicine;
    },
    enabled: !!slug, // only fetch if slug exists
  });

  return { medicineinfo, PerMedicineInfo, refetch, isPerMedicineLoading,isMedicineLoading };
};

export default useMedicines;
