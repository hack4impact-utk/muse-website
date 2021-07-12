import type { AppProps } from "next/app";
import "styles/globals.scss";
import { useRouter } from 'next/router';
import { useState, useEffect, Fragment } from 'react';
import LoadingOverlay from "../components/Loading/LoadingOverlay";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => { setLoading(true); };
    const handleComplete = () => { setLoading(false); };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);

  return(
    <Fragment>{loading ? (<LoadingOverlay/>) : (<Component {...pageProps} />) }</Fragment>
  )

}
export default MyApp;
