"use client";

import {
  CreditCardIcon,
  FolderOpenIcon,
  HistoryIcon,
  KeyIcon,
  LogOutIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubItem,
} from "./ui/sidebar";
import { authclient } from "@/lib/auth-client";
import { useHasActiveSubscription } from "@/features/subscriptions/hooks/use-subscription";

const menuItems = [
  {
    title: "Main",
    items: [
      { title: "Workflows", icon: FolderOpenIcon, url: "/workflows" },
      { title: "Credentials", icon: KeyIcon, url: "/credentials" },
      { title: "Executions", icon: HistoryIcon, url: "/executions" },
    ],
  },
];

const AppSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { hasActiveSubscription, isLoading } = useHasActiveSubscription();
  return (
    <Sidebar
      collapsible="icon"
      className="bg-white/60 backdrop-blur-sm border-r border-slate-100/60 shadow-sm z-20 overflow-hidden"
    >
      {/* HEADER */}
      <SidebarHeader className="px-2 py-3">
        <SidebarMenuSubItem>
          <SidebarMenuButton
            asChild
            className="gap-x-4 h-10 px-3 hover:bg-transparent focus:bg-transparent cursor-pointer"
          >
            <Link href={"/"} prefetch>
              <Image
                src="/logo.svg"
                alt="Nexiflow-Icon"
                width={26}
                height={26}
              />

              <span className="font-semibold text-sm text-slate-900 tracking-tight select-none">
                Nexiflow
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuSubItem>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title} className="mt-1">
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const active =
                    item.url === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.url);

                  return (
                    <SidebarMenuSubItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={active}
                        asChild
                        className="relative group flex items-center gap-x-3 h-10  rounded-md transition-colors duration-180
                                   hover:bg-slate-100/60 focus-visible:bg-slate-100/60"
                      >
                        <Link
                          href={item.url}
                          prefetch
                          className="flex items-center w-full gap-x-3"
                        >
                          {/* ICON: fixed-size container so it never disappears when collapsed */}
                          <span className="flex items-center justify-center w-10 h-10 ">
                            <item.icon
                              className={`h-4 w-4 shrink-0 transition-colors duration-150 ${
                                active
                                  ? "text-indigo-600"
                                  : "text-slate-500 group-hover:text-indigo-600"
                              }`}
                            />
                          </span>

                          {/* LABEL: when the sidebar collapses the label will be hidden by the sidebar UI;
                              keeping it here keeps layout stable so icons don't shift */}
                          <span
                            className={`text-sm transition-opacity duration-150 ${
                              active
                                ? "text-slate-900 font-medium"
                                : "text-slate-700"
                            }`}
                          >
                            {item.title}
                          </span>

                          {/* tiny active indicator */}
                          <span className="ml-auto">
                            {active ? (
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-600" />
                            ) : null}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="px-2 py-3">
        <SidebarMenu className="space-y-2">
          {!hasActiveSubscription && !isLoading && (
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Upgrade to Pro"
                className={`w-full justify-center sm:justify-start gap-x-3 h-10 px-3 rounded-lg
                          bg-gradient-to-r from-white via-orange-200 to-orange-500
                          text-orange-900 sm:text-black font-semibold shadow-md shadow-orange-300/30
                          transition-transform duration-200 `}
                onClick={() => authclient.checkout({ slug: "Nexiflow-Pro" })}
              >
                <StarIcon className="h-4 w-4" />
                <span className="text-sm ml-1">Upgrade to Pro</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Billing Portal"
              className="gap-x-4 h-10 px-3 rounded-md hover:bg-slate-100/60 transition-colors duration-150"
              onClick={() => authclient.customer.portal()}
            >
              <CreditCardIcon className="h-4 w-4 text-slate-600" />
              <span className="text-sm text-slate-700">Billing Portal</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sign Out"
              className="gap-x-4 h-10 px-3 rounded-md hover:bg-slate-100/60 transition-colors duration-150"
              onClick={() =>
                authclient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/login");
                    },
                  },
                })
              }
            >
              <LogOutIcon className="h-4 w-4 text-slate-600" />
              <span className="text-sm text-slate-700">Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
