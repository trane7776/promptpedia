'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useContext } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { useSearch } from '../context/SearchContext';
const Nav = () => {
  const { data: session } = useSession();
  const { setSearchText, setFilteredPrompts, posts } = useSearch();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const handleHomeClick = () => {
    setSearchText('');
    setFilteredPrompts(posts);
  };
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link
        onClick={handleHomeClick}
        href="/"
        className="flex gap-2 flex-center"
      >
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
        />
        <p className="logo_text">Промтопедия</p>
      </Link>
      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Создать пост
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Выйти
            </button>
            <Link href="/profile">
              <Image
                src={session?.user?.image}
                alt="profile"
                width={37}
                height={37}
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    type="button"
                    key="provider.name"
                    className="black_btn"
                    onClick={() => signIn(provider.id)}
                  >
                    Войти
                  </button>
                );
              })}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image}
              alt="profile"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => {
                setToggleDropdown((prev) => !prev);
              }}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Мой профиль
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Создать промпт
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Выйти
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    type="button"
                    key="provider.name"
                    className="black_btn"
                    onClick={() => signIn(provider.id)}
                  >
                    Войти
                  </button>
                );
              })}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
