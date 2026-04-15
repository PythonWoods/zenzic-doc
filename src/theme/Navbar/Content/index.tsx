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

  // "Native Bastion": For all other pages, use pure Docusaurus native navbar.
  return <NavbarContentNative {...(props as object)} />;
}
