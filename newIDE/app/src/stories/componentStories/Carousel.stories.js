// @flow
import * as React from 'react';
import { Trans } from '@lingui/macro';
import withMock from 'storybook-addon-mock';
import { action } from '@storybook/addon-actions';

import muiDecorator from '../ThemeDecorator';
import paperDecorator from '../PaperDecorator';

import Carousel from '../../UI/Carousel';
import { indieUserProfile } from '../../fixtures/GDevelopServicesTestData';
import { type Profile } from '../../Utils/GDevelopServices/Authentication';
import { GDevelopUserApi } from '../../Utils/GDevelopServices/ApiConfigs';

const items = [];

export default {
  title: 'Carousel',
  component: Carousel,
  decorators: [paperDecorator, muiDecorator],
};

export const LoadingWithoutTitleSkeleton = () => (
  <Carousel
    title={<Trans>Our Latest Tutorials</Trans>}
    items={null}
    displayItemTitles={false}
  />
);
export const Tutorials = () => {
  type YoutubeThumbnail = {|
    id: string,
    title: string,
    thumbnailUrl: string,
    link: string,
  |};
  const items = [
    {
      id: 'tutorial1',
      title: 'Tutorial 1',
      thumbnailUrl: 'https://img.youtube.com/vi/va9GqIbK_SA/mqdefault.jpg',
      link: 'https://www.youtube.com/watch?v=va9GqIbK_SA',
    },
    {
      id: 'tutorial2',
      title: 'Tutorial 2',
      thumbnailUrl: 'https://img.youtube.com/vi/KpLAYMSgoDI/mqdefault.jpg',
      link: 'https://www.youtube.com/watch?v=KpLAYMSgoDI',
    },
    {
      id: 'tutorial3',
      title: 'Tutorial 3',
      thumbnailUrl: 'https://img.youtube.com/vi/bR2BjT7JG0k/mqdefault.jpg',
      link: 'https://www.youtube.com/watch?v=bR2BjT7JG0k',
    },
    {
      id: 'tutorial4',
      title: 'Tutorial 4',
      thumbnailUrl: 'https://img.youtube.com/vi/1RpH9VQjwNY/mqdefault.jpg',
      link: 'https://www.youtube.com/watch?v=1RpH9VQjwNY',
    },
    {
      id: 'tutorial5',
      title: 'Tutorial 5',
      thumbnailUrl: 'https://img.youtube.com/vi/Q7e3gAWkLZI/mqdefault.jpg',
      link: 'https://www.youtube.com/watch?v=Q7e3gAWkLZI',
    },
  ];
  return (
    <Carousel
      title={<Trans>Our Latest Tutorials</Trans>}
      items={items}
      displayItemTitles={false}
      browseAllLink="https://www.youtube.com/c/GDevelopApp/videos"
    />
  );
};

export const LoadingWithTitleSkeleton = () => (
  <Carousel title={<Trans>Showcase</Trans>} items={null} />
);
export const Showcases = () => {
  type ShowcaseThumbnail = {|
    id: string,
    title: string,
    thumbnailUrl: string,
    onClick: () => void,
  |};
  const items: ShowcaseThumbnail[] = [
    {
      id: 'lil-bub-s-hello-earth',
      title: "Lil BUB's HELLO EARTH",
      onClick: () => console.log('Clicked on lil-bub-s-hello-earth'),
      thumbnailUrl:
        'https://resources.gdevelop-app.com/games-showcase/images/bub-animated-logo.gif',
    },
    {
      id: 'vai-juliette',
      title: 'Vai Juliette!',
      onClick: () => console.log('Clicked on vai-juliette'),
      thumbnailUrl:
        'https://cdn6.aptoide.com/imgs/0/d/3/0d3926b58fd241dc9ecccc1661f187ec_fgraphic.png',
    },
    {
      id: 'alanna-the-princess-of-puzzles',
      title: 'Alanna The Princess Of Puzzles',
      onClick: () => console.log('Clicked on alanna-the-princess-of-puzzles'),
      thumbnailUrl: 'https://i.ytimg.com/vi/PguDpz7TC7g/hqdefault.jpg',
    },
    {
      id: 'miko-adventures-puffball',
      title: 'Miko Adventures Puffball',
      onClick: () => console.log('Clicked on miko-adventures-puffball'),
      thumbnailUrl:
        'https://resources.gdevelop-app.com/games-showcase/images/miko-adventures-puffball/Miko_adventures_puffball_header_logo.png',
    },
    {
      id: 'swamp',
      title: 'Swamp',
      onClick: () => console.log('Clicked on swamp'),
      thumbnailUrl:
        'https://resources.gdevelop-app.com/games-showcase/images/swamp/swamp-banner.jpg',
    },
    {
      id: 'the-mighty-rune-in-development',
      title: 'The Mighty Rune (in development)',
      onClick: () => console.log('Clicked on the-mighty-rune-in-development'),
      thumbnailUrl:
        'https://resources.gdevelop-app.com/games-showcase/images/mighty-rune/mighty-rune-banner.jpg',
    },
    {
      id: 'hyperspace-dogfights',
      title: 'Hyperspace Dogfights',
      onClick: () => console.log('Clicked on hyperspace-dogfights'),
      thumbnailUrl:
        'https://resources.gdevelop-app.com/games-showcase/images/hyperspace-dogfights/hdog_screenshot_dodge.png',
    },
    {
      id: 'uphill-climb-racing-neon',
      title: 'Uphill Climb Racing Neon',
      onClick: () => console.log('Clicked on uphill-climb-racing-neon'),
      thumbnailUrl:
        'https://resources.gdevelop-app.com/games-showcase/images/uphill-climb-racing-neon/uphill-climb-racing-neon-banner.jpg',
    },
    {
      id: 'karambola',
      title: 'Karambola',
      onClick: () => console.log('Clicked on karambola'),
      thumbnailUrl:
        'https://resources.gdevelop-app.com/games-showcase/images/karambola-banner.png',
    },
    {
      id: 'the-research-age',
      title: 'The Research Age',
      onClick: () => console.log('Clicked on the-research-age'),
      thumbnailUrl:
        'https://forums.androidcentral.com/attachments/android-games/333598d1618909711t-game-research-age-senzanome2.jpg',
    },
    {
      id: 'a-pixel-adventure-legion',
      title: 'A Pixel Adventure Legion',
      onClick: () => console.log('Clicked on a-pixel-adventure-legion'),
      thumbnailUrl:
        'https://resources.gdevelop-app.com/games-showcase/images/apx-legion/apx-legion-banner-min.jpg',
    },
  ];
  return (
    <Carousel
      title={<Trans>Showcase</Trans>}
      items={items}
      onBrowseAllClick={() => console.info('Browse all button clicked')}
    />
  );
};
