import React, { FC, useRef, useState } from "react";
import { MdAddBox, MdAccountCircle, MdExpandMore } from "react-icons/md";
import { IoMdHome, IoMdSettings, IoMdClose } from "react-icons/io";
import ".//style.css";
import { Link } from "react-router-dom";

const menuItems = [
  {
    name: "Home",
    icon: <IoMdHome />,
    linkTo: "/home",
  },
  {
    name: "Create",
    icon: <MdAddBox />,
    items: [
      { name: "Employee", linkTo: "/create/employee" },
      { name: "Position", linkTo: "/create/position" },
      { name: "Division", linkTo: "/create/division" },
    ],
  },
  {
    name: "Settings",
    icon: <IoMdSettings />,
    items: [
      { name: "Display" },
      { name: "Display" },
      { name: "Display" },
      { name: "Display" },
    ],
  },

  {
    name: "Account",
    icon: <MdAccountCircle />,
    items: [{ name: "Edit" }, { name: "Logout" }],
  },
];

const Icon = ({ icon }) => (
  <span className="material-symbols-outlined">{icon}</span>
);

const NavHeader = ({ toggleSidebar }) => (
  <header className="sidebar-header">
    <button type="button" onClick={toggleSidebar}>
      <Icon icon={<IoMdClose />} />
    </button>
    <span>Admin</span>
  </header>
);

const NavButton = ({ onClick, name, icon, isActive, hasSubNav }) => (
  <button
    type="button"
    onClick={() => {
      onClick && onClick(name);
    }}
    className={isActive ? "active" : ""}
  >
    {icon && <Icon icon={icon} />}
    <span>{name}</span>
    {hasSubNav && <Icon icon={<MdExpandMore />} />}
  </button>
);

const SubMenu = ({ item, activeItem, handleClick }) => {
  const navRef = useRef(null);

  const isSubNavOpen = (item, items) =>
    items.some((i) => i === activeItem) || item === activeItem;

  return (
    <div
      className={`sub-nav ${isSubNavOpen(item.name, item.items) ? "open" : ""}`}
      style={{
        height: !isSubNavOpen(item.name, item.items)
          ? 0
          : navRef.current?.clientHeight,
      }}
    >
      <div ref={navRef} className="sub-nav-inner">
        {item?.items.map((subItem, index) => (
          <NavButton
            key={index}
            name={subItem.name}
            isActive={activeItem === subItem.name}
          />
        ))}
      </div>
    </div>
  );
};

function Sidebar({ toggleSidebar }) {
  const [activeItem, setActiveItem] = useState("");

  const handleClick = (item) => {
    setActiveItem(item !== activeItem ? item : "");
  };

  return (
    <aside className="sidebar">
      <NavHeader toggleSidebar={toggleSidebar} />
      {menuItems.map((item, index) => (
        <div key={index}>
          {!item.items && (
            <NavButton
              onClick={handleClick}
              name={item.name}
              icon={item.icon}
              isActive={activeItem === item.name}
              hasSubNav={!!item.items}
            />
          )}
          {item.items && (
            <>
              <NavButton
                onClick={handleClick}
                name={item.name}
                icon={item.icon}
                isActive={activeItem === item.name}
                hasSubNav={!!item.items}
              />
              <SubMenu
                activeItem={activeItem}
                handleClick={handleClick}
                item={item}
              />
            </>
          )}
        </div>
      ))}
    </aside>
  );
}

export { Sidebar };
