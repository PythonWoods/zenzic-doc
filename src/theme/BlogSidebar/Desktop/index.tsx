/**
 * Swizzled BlogSidebar/Desktop
 * D106: The Active Archive — "All posts" title links to the blog root (locale-aware).
 *
 * @see https://docusaurus.io/docs/swizzling
 */
import React, {memo} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import {
  useVisibleBlogSidebarItems,
  BlogSidebarItemList,
} from '@docusaurus/plugin-content-blog/client';
import BlogSidebarContent from '@theme/BlogSidebar/Content';
import type {Props} from '@theme/BlogSidebar/Desktop';
import styles from './styles.module.css';

const ListComponent = ({items}: Parameters<typeof BlogSidebarItemList>[0]) => (
  <BlogSidebarItemList
    items={items}
    ulClassName={clsx(styles.sidebarItemList, 'clean-list')}
    liClassName={styles.sidebarItem}
    linkClassName={styles.sidebarItemLink}
    linkActiveClassName={styles.sidebarItemLinkActive}
  />
);

function BlogSidebarDesktop({sidebar}: Props): React.JSX.Element {
  const items = useVisibleBlogSidebarItems(sidebar.items);

  // Derive locale-aware blog root from the first sidebar item's permalink.
  // EN: /blog/post-slug → /blog
  // IT: /it/blog/post-slug → /it/blog
  const blogHref =
    sidebar.items.length > 0
      ? sidebar.items[0].permalink.split('/').slice(0, -1).join('/')
      : '/blog';

  return (
    <aside className="col col--3">
      <nav
        className={clsx(styles.sidebar, 'thin-scrollbar')}
        aria-label={translate({
          id: 'theme.blog.sidebar.navAriaLabel',
          message: 'Blog recent posts navigation',
          description: 'The ARIA label for recent posts in the blog sidebar',
        })}>
        <div className={clsx(styles.sidebarItemTitle, 'margin-bottom--md')}>
          <Link to={blogHref} className="blog-sidebar-all-posts-link">
            {sidebar.title}
          </Link>
        </div>
        <BlogSidebarContent
          items={items}
          ListComponent={ListComponent}
          yearGroupHeadingClassName={styles.yearGroupHeading}
        />
      </nav>
    </aside>
  );
}

export default memo(BlogSidebarDesktop);
