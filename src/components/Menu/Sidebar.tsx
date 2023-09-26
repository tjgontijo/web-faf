'use client'

import classNames from "classnames";
import React, { useState } from "react";
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BarChart3, ChevronsLeft, GanttChartSquare, LogOut, Menu, Play, Shield, Split } from "lucide-react";


const menuItems = [
  { id: 1, label: "Dashboard", icon: BarChart3, link: "/dashboard" },
  { id: 2, label: "Instituições", icon: Shield, link: "/dashboard/instituition" },
  { id: 3, label: "Área Temática", icon: Split, link: "/dashboard/thematic_area" }, 
  { id: 4, label: "Ações", icon: Play, link: "/dashboard/action" },
  { id: 5, label: "Planos de Ação", icon: GanttChartSquare, link: "/dashboard/action-plan" },  
];

interface MenuItem {
  id: number;
  label: string;
  icon: React.ComponentType;
  link: string;
}

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(true);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const wrapperClasses = classNames(
    "h-screen px-4 pt-8 pb-4 flex justify-between flex-col border-e-2 border-zinc-100 shadow	",
    {
      ["w-80"]: !toggleCollapse,
      ["w-25"]: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-zinc-200 text-zinc-800 absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative ">
          <div className="flex pl-3 gap-4">
            <Menu size={32} />
            <span
              className={classNames("mt-2 text-md text-zinc-500", {
                hidden: toggleCollapse,
              })}
            >
              Plano de Ação Online
            </span>
          </div>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <ChevronsLeft size={22} />
            </button>
          )}
        </div>

        <div className="flex flex-col items-start mt-8 ">
          {menuItems.map((menu: MenuItem) => {
            return (
              <div key={menu.id} className="flex items-center cursor-pointer hover:bg-[#e5eeff] rounded w-full overflow-hidden whitespace-nowrap mb-1">
                <Link href={menu.link}>
                  <div className="flex p-4 items-center w-full h-full">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <menu.icon />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{menu.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    {!toggleCollapse && (
                      <span
                        className={classNames(
                          "pl-3 text-md text-zinc-500"
                        )}
                      >
                        {menu.label}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className='flex p-4 w-full cursor-pointer rounded hover:bg-zinc-200'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex">
                <Link href="/">                 
                    <LogOut />                 
                </Link>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Sair</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {!toggleCollapse && (
          <span className={classNames("text-md text-zinc-500 pl-3")}>
            Sair
          </span>
        )}
      </div>

    </div>
  );
};

export default Sidebar;
