import React, {type ReactNode} from 'react';
import LocaleDropdownNavbarItem from '@theme-original/NavbarItem/LocaleDropdownNavbarItem';
import type LocaleDropdownNavbarItemType from '@theme/NavbarItem/LocaleDropdownNavbarItem';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof LocaleDropdownNavbarItemType>;

import {useLocation} from '@docusaurus/router';

export default function LocaleDropdownNavbarItemWrapper(props: Props): ReactNode {
  const {pathname} = useLocation();
  
  // Hide the locale dropdown if the user is on a blog page
  // We use visibility: hidden instead of null to preserve the exact same layout space
  // so the navbar components don't shift their position.
  if (pathname.includes('/blog')) {
    if (props.mobile) {
      return null;
    }
    return (
      <div style={{ visibility: 'hidden', pointerEvents: 'none' }}>
        <LocaleDropdownNavbarItem {...props} />
      </div>
    );
  }

  return (
    <>
      <LocaleDropdownNavbarItem {...props} />
    </>
  );
}
