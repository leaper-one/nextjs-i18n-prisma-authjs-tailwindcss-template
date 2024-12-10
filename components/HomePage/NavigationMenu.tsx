'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { LayoutDashboard, MoreHorizontal, Wrench, InboxIcon, MenuIcon } from 'lucide-react';

const dashboardItems: { title: string; icon: React.ElementType; href: string; description: string }[] = [
  {
    title: 'Dashboard',
    icon: InboxIcon,
    href: '/dashboard',
    description: 'All here',
  },
];

const moreItems: { title: string; icon: React.ElementType; href: string; description: string }[] = [
  {
    title: 'Tools',
    icon: Wrench,
    href: '/tools',
    description: 'Your best toolbox',
  },
];

export function HomePageNavigationMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link
            href="/dashboard"
            legacyBehavior
            passHref>
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'group')}>
              <LayoutDashboard className="mr-2 size-4 transition-transform" />
              Dashboard
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <MenuItem
          title="Features"
          icon={MenuIcon}
          items={dashboardItems}
        />
        <MenuItem
          title="More"
          icon={MoreHorizontal}
          items={moreItems}
        />
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MenuItem({
  title,
  icon: Icon,
  items,
}: {
  title: string;
  icon: React.ElementType;
  items: { title: string; icon: React.ElementType; href: string; description: string }[];
}) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="group">
        <Icon className="mr-2 size-4 transition-transform" />
        {title}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
          {items.map((item) => (
            <ListItem
              key={item.title}
              {...item}
            />
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { icon: React.ElementType; description: string }
>(({ className, title, description, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 ease-in-out hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group hover:scale-105',
            className,
          )}
          {...props}>
          <div className="flex items-center space-x-2">
            <Icon className="size-5 transition-transform group-hover:scale-110" />
            <div className="text-sm font-medium leading-none transition-colors">{title}</div>
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-snug text-muted-foreground transition-colors">
            {description}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
