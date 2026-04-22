/**
 * Swizzled BlogArchivePage — D107: The Obsidian Archive Reconstruction
 *
 * Replaces the default bullet-list archive with a card-based catalogue.
 * Each card shows: post title (link), date chip, and description excerpt.
 * Year sections are visually anchored with an Indigo accent rule.
 *
 * @see https://docusaurus.io/docs/swizzling
 */
import React from 'react';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import {PageMetadata} from '@docusaurus/theme-common';
import {useDateTimeFormat} from '@docusaurus/theme-common/internal';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import type {Props} from '@theme/BlogArchivePage';
import type {ArchiveBlogPost} from '@theme/BlogArchivePage';

type YearGroup = {year: string; posts: readonly ArchiveBlogPost[]};

function listPostsByYears(
  blogPosts: readonly ArchiveBlogPost[],
): YearGroup[] {
  const postsByYear = blogPosts.reduce<Map<string, ArchiveBlogPost[]>>(
    (acc, post) => {
      const year = (post.metadata.date as string).split('-')[0];
      const yearPosts = acc.get(year) ?? [];
      return acc.set(year, [post, ...yearPosts]);
    },
    new Map(),
  );
  return Array.from(postsByYear, ([year, posts]) => ({year, posts}));
}

function ArchivePostCard({post}: {post: ArchiveBlogPost}): React.JSX.Element {
  const dateTimeFormat = useDateTimeFormat({
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
  const formattedDate = dateTimeFormat.format(
    new Date(post.metadata.date as string),
  );

  return (
    <article className="archive-card">
      <time
        dateTime={post.metadata.date as string}
        className="archive-card__date">
        {formattedDate}
      </time>
      <Heading as="h3" className="archive-card__title">
        <Link to={post.metadata.permalink}>{post.metadata.title}</Link>
      </Heading>
      {post.metadata.description && (
        <p className="archive-card__description">{post.metadata.description}</p>
      )}
    </article>
  );
}

function YearSection({year, posts}: YearGroup): React.JSX.Element {
  return (
    <section className="archive-year-section" aria-label={year}>
      <Heading as="h2" id={year} className="archive-year-heading">
        {year}
      </Heading>
      <div className="archive-cards-grid">
        {posts.map((post) => (
          <ArchivePostCard key={post.metadata.permalink} post={post} />
        ))}
      </div>
    </section>
  );
}

export default function BlogArchivePage({archive}: Props): React.JSX.Element {
  const title = translate({
    id: 'theme.blog.archive.title',
    message: 'Archive',
    description: 'The page & hero title of the blog archive page',
  });
  const description = translate({
    id: 'theme.blog.archive.description',
    message: 'Archive',
    description: 'The page & hero description of the blog archive page',
  });

  const years = listPostsByYears(archive.blogPosts);

  return (
    <>
      <PageMetadata title={title} description={description} />
      <Layout>
        <header className="archive-hero">
          <div className="container">
            <Heading as="h1" className="archive-hero__title">
              The Obsidian Journal
            </Heading>
            <p className="archive-hero__subtitle">
              Engineering insights, security chronicles, and the evolution of
              Zenzic — indexed by year.
            </p>
          </div>
        </header>
        <main className="archive-main">
          <div className="container">
            {years.map(({year, posts}) => (
              <YearSection key={year} year={year} posts={posts} />
            ))}
          </div>
        </main>
      </Layout>
    </>
  );
}
