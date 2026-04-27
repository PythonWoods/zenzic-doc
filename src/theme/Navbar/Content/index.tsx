import React from 'react';
import {useLocation} from '@docusaurus/router';
import NavbarContentNative from '@theme-original/Navbar/Content';
import type NavbarContentNativeType from '@theme/Navbar/Content';

type WrapperProps = React.ComponentProps<typeof NavbarContentNativeType>;

export default function NavbarContentWrapper(props: WrapperProps): React.JSX.Element | null {
  const {pathname} = useLocation();

  // "Sovereign Entry": The homepage has no navbar.
  // Returning null here physically removes the navbar items but keeps the
  // parent layout container intact, avoiding `clientHeight` crashes!
  if (pathname === '/' || pathname === '/it/') {
    return null;
  }

  // "Blog Sovereignty": The Obsidian Journal is English-only.
  // Add data-blog-route attribute so CSS can suppress the locale switcher
  // on blog routes without misdirecting readers to the IT home page.
  if (pathname.startsWith('/blog')) {
    return (
      <div data-blog-route>
        <NavbarContentNative {...(props as object)} />
      </div>
    );
  }

  // "Native Bastion": For all other pages, use pure Docusaurus native navbar.
  return <NavbarContentNative {...(props as object)} />;
}
