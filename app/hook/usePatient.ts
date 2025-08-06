"use client"
import { useQuery } from "@tanstack/react-query";

import { useSession } from "next-auth/react";
import UseAxiosNormal from "./Instances/page";
type Appointment = {
  doctorId: number
  doctor: string
  specialty: string
  date: Date
  time: string
  status: "upcoming" | "completed" | "cancelled"
  location?: string
  notes: string
}
const usePatients = () => {
  const axiossecure = UseAxiosNormal();
  const {data:session} = useSession();

  const { data: patientinfo = [] ,refetch} = useQuery({
    queryKey: ['doctor', session?.user?.email],
    queryFn: async () => {
      const res = await axiossecure.get(`/signin/${session?.user?.email}`);
      return res.data.userInfo;
    },
    enabled: !!session?.user?.email,
  });




  return {patientinfo,refetch};
};

export default usePatients;
