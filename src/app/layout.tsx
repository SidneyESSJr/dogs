import type { Metadata } from "next";
import "./globals.css";
import { type_second } from "@/functions/fonts";
import Header from "./_componentes/header/header";
import Footer from "./_componentes/footer/footer";
import { UserContextProvider } from "@/context/user-context";
import obterUsuario from "@/actions/obter-usuario";

export const metadata: Metadata = {
  title: "Dogs Next",
  description: "Rede social para cães",
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const { data: user } = await obterUsuario();

  return (
    <html lang="pt-br">
      <body className={type_second.variable}>
        <UserContextProvider user={user}>
          <div className="App">
            <Header />
            <main className="AppBody ">{children}</main>
            <div>{modal}</div>
            <Footer />
          </div>
        </UserContextProvider>
      </body>
    </html>
  );
}
