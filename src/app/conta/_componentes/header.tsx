"use client";

import logout from "@/actions/logout";
import { useUserContext } from "@/context/user-context";
import useMedia from "@/hooks/use-media";
import AdicionarFoto from "@/icons/adicionar-icon";
import Estatisticas from "@/icons/estatisticas-icon";
import FeedIcon from "@/icons/feed-icon";
import Sair from "@/icons/sair-icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "./header.module.css";

function obterTitulo(pathname: string) {
  switch (pathname) {
    case "/conta/postar":
      return "Poste Sua Foto";
    case "/conta/estatisticas":
      return "Estatísticas";
    default:
      return "Minha Conta";
  }
}

export default function ContaHeaderNav() {
  const mobile = useMedia("(max-width: 40rem)");
  const [mobileMenu, setMobileMenu] = React.useState(false);

  const pathname = usePathname();
  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  const { setUser } = useUserContext();

  async function handleLogout() {
    await logout();
    setUser(null);
  }

  return (
    <header className={styles.header}>
      <h1 className="title">{obterTitulo(pathname)}</h1>
      {mobile && (
        <button
          aria-label="Menu"
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}

      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <Link href="/conta" className={pathname === "/conta" ? "active" : ""}>
          <FeedIcon />
          {mobile && "Minhas Fotos"}
        </Link>
        <Link
          href="/conta/estatisticas"
          className={pathname === "/conta/estatisticas" ? "active" : ""}
        >
          <Estatisticas />
          {mobile && "Estatísticas"}
        </Link>
        <Link
          href="/conta/postar"
          className={pathname === "/conta/postar" ? "active" : ""}
        >
          <AdicionarFoto />
          {mobile && "Adicionar Foto"}
        </Link>
        <button onClick={handleLogout}>
          <Sair />
          {mobile && "Sair"}
        </button>
      </nav>
    </header>
  );
}
