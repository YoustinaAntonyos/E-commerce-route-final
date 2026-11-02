import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // images:{
  //   remotePatterns:[
  //     {
  //       protocol: "https",
  //       hostname: "ecommerce.routemisr.com",
  //       pathname: '/*/**'
  //     }
  //   ]
  // },
  // async redirects(){
  //   return[
  //     {
  //       source: "/allorders",
  //       destination: "orders",
  //       permanent: true
  //     }
  //   ]
  // }
};

export default nextConfig;
