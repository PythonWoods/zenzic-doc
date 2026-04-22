/**
 * Swizzled BlogSidebar/Content
 * D106: The Active Archive — year headings link to /blog/archive (locale-aware).
 *
 * @see https://docusaurus.io/docs/swizzling
 */
import React, {memo} from 'react';
import Link from '@docusaurus/Link';
import {useThemeConfig} from '@docusaurus/theme-common';
import {groupBlogSidebarItemsByYear} from '@docusaurus/plugin-content-blog/client';
import type {Props} from '@theme/BlogSidebar/Content';
import Heading from '@theme/Heading';

interface YearGroupProps {
  year: string;
  yearGroupHeadingClassName?: string;
  archiveHref: string;
  children: React.ReactNode;
}

function BlogSidebarYearGroup({
  year,
  yearGroupHeadingClassName,
  archiveHref,
  children,
}: YearGroupProps): React.JSX.Element {
  return (
    <div role="group">
      <Heading as="h3" className={yearGroupHeadingClassName}>
        <Link to={archiveHref} className="blog-sidebar-year-link">
          {year}
        </Link>
      </Heading>
      {children}
    </div>
  );
}

function BlogSidebarContent({
  items,
  yearGroupHeadingClassName,
  ListComponent,
}: Props): React.JSX.Element {
  const themeConfig = useThemeConfig();

  // Derive locale-aware blog base path from the first item's permalink.
  // EN: /blog/post-slug → /blog
  // IT: /it/blog/post-slug → /it/blog
  const archiveHref =
    items.length > 0
      ? `${items[0].permalink.split('/').slice(0, -1).join('/')}/archive`
      : '/blog/archive';

  if (themeConfig.blog.sidebar.groupByYear) {
    const itemsByYear = groupBlogSidebarItemsByYear(items);
    return (
      <>
        {itemsByYear.map(([year, yearItems]) => (
          <BlogSidebarYearGroup
            key={year}
            year={year}
            yearGroupHeadingClassName={yearGroupHeadingClassName}
            archiveHref={archiveHref}>
            <ListComponent items={yearItems} />
          </BlogSidebarYearGroup>
        ))}
      </>
    );
  }

  return <ListComponent items={items} />;
}

export default memo(BlogSidebarContent);
