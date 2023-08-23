'use client'
import classNames from "classnames";
import React, { useState, useMemo } from "react";
import { Notepad, CaretDoubleLeft, SignOut, Power } from "@phosphor-icons/react";

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const wrapperClasses = classNames(
    "h-screen px-4 pt-8 pb-4 bg-zinc-100 flex justify-between flex-col",
    {
      ["w-80"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
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
        <div className="flex items-center justify-between relative">
          <div className="flex pl-1 gap-4">
            <Notepad size={40}/>
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
              <CaretDoubleLeft />
            </button>
          )}
        </div>

        <div className="flex flex-col items-start mt-24">

        </div>
      </div>

      <div className='flex px-4 py-3'>
        <div style={{ width: "2.5rem" }}>
          <SignOut size={24} />
        </div>
        {!toggleCollapse && (
          <span className={classNames("text-md text-zinc-500")}>
Sair          </span>
        )}
      </div>
    </div>
  );
};

export default Sidebar;