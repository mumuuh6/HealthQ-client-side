"use client"
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import UseAxiosNormal from "../Instances/page";

const UseDoctors = () => {
  const axiossecure = UseAxiosNormal();
  const { data: session } = useSession();

  const { data: doctorinfo = [] } = useQuery({
    queryKey: ['doctor', session?.user?.email],
    queryFn: async () => {
      const res = await axiossecure.get(`/find/role/${session?.user?.email}`);
      return res.data;
    },
    enabled: !!session?.user?.email,
  });

  const { data: roleinfo = [] ,isLoading} = useQuery({
    queryKey: ['doctorrole', doctorinfo?.userType],
    queryFn: async () => {
      const res = await axiossecure.get(`/doctor/doctor`);
      return res.data.data;
    },
  });
    if (isLoading) {
        <p>Loading...</p>
    }

  return { doctorinfo, roleinfo};
};

export default UseDoctors;
