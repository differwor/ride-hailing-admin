import { AppProps } from "next/app";
import { useRouter } from "next/router";
import "../app/globals.css";
import AdminLayout from "@/components/adm/layout";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import AdmProvider from "@/context/AdmProvider";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith("/adm");

  return (
    <>
      {isAdminRoute ? (
        <AdmProvider>
          <Head>
            <title>Dashboard</title>
          </Head>
          <AdminLayout>
            <Component {...pageProps} />
          </AdminLayout>
        </AdmProvider>
      ) : (
        <>
          <Head>
            <title>Authentication</title>
          </Head>
          <Component {...pageProps} />
        </>
      )}
      <Toaster />
    </>
  );
}
