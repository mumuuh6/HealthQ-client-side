"use client"
import { useQuery } from "@tanstack/react-query";
import UseAxiosNormal from "../Instances/page";

const useDoctors = () => {
  const axiossecure = UseAxiosNormal();
  // const { data: doctorinfo = [] } = useQuery({
  //   queryKey: ['doctor', session?.user?.email],
  //   queryFn: async () => {
  //     const res = await axiossecure.get(`/find/role/${session?.user?.email}`);
  //     return res.data;
  //   },
  //   enabled: !!session?.user?.email,
  // });

  const { data: roleinfo = []} = useQuery({
    queryKey: ['doctorrole'],
    queryFn: async () => {
      const res = await axiossecure.get(`/doctor/doctor`);
      return res.data.data;
    },
  });


  return roleinfo;
};

export default useDoctors;
