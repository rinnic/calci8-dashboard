import "../styles/globals.css";
import { AuthProvider } from "../store/auth-context";
import Layout from "../components/layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
