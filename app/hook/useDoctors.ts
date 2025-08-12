"use client"
import { useQuery } from "@tanstack/react-query";

import { useSession } from "next-auth/react";
import UseAxiosNormal from "./UseAxiosNormal";

const useDoctors = () => {
  const axiossecure = UseAxiosNormal();
  const {data:session,status}=useSession()
  //console.log('session',session)
//   console.log(session)
  const { data: doctorpatientinfo = [] } = useQuery({
    queryKey: ['doctor', session?.user?.email],
    queryFn: async () => {
      const res = await axiossecure.get(`/find/role/${session?.user?.email}`);
      
      return res.data.PatientData;
    },
    enabled: !!session?.user?.email,
  });

  const { data: roleinfo = []} = useQuery({
    queryKey: ['doctorrole'],
    queryFn: async () => {
      const res = await axiossecure.get(`/doctor/doctor`);
      
      return res.data.data;
    },
  });
  const { data: doctorinfo = [] ,refetch} = useQuery({
    queryKey: ['doctor', session?.user?.email],
    queryFn: async () => {
        //console.log('email',session?.user?.email)
      const res = await axiossecure.get(`/signin/${session?.user?.email}`);
       console.log('doctoinfo',res.data)
      return res.data.userInfo;
    },
    enabled: status ==='authenticated' && !!session?.user?.email,
  });

  return {doctorpatientinfo,roleinfo,doctorinfo,refetch};
};

export default useDoctors;
