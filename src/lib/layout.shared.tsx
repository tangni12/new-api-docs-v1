import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { i18n } from '@/lib/i18n';
import Image from 'next/image';
import type { LinkItemType } from 'fumadocs-ui/layouts/docs';
import { withBasePath } from '@/lib/base-path';

export const linkItems: LinkItemType[] = [];

export const logo = (
  <Image
    alt="ApiFlow"
    src={withBasePath('/assets/newapi.svg')}
    width={20}
    height={20}
    className="size-5"
    priority
    unoptimized
  />
);

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    i18n,
    nav: {
      title: (
        <>
          {logo}
          <span className="font-medium in-[header]:text-[15px] [.uwu_&]:hidden">
            ApiFlow
          </span>
        </>
      ),
    },
  };
}
