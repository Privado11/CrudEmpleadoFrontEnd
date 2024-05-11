import React, { FC, useRef, useState } from "react";
import { MdAddBox, MdAccountCircle, MdExpandMore } from "react-icons/md";
import {
  IoIosAddCircleOutline,
  IoMdHome,
  IoMdSettings,
  IoMdClose,
} from "react-icons/io";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import ".//style.css";

const menuItems = [
  {
    name: "Home",
    icon: <IoHomeOutline />,
    linkTo: "/",
  },
  {
    name: "Create",
    icon: <IoIosAddCircleOutline />,
    items: [
      { name: "Employee", linkTo: "/create/employee" },
      { name: "Position", linkTo: "/create/position" },
      { name: "Division", linkTo: "/create/division" },
    ],
  },
  {
    name: "Settings",
    icon: <IoSettingsOutline />,
    items: [
      { name: "Display" },
      { name: "Display" },
      { name: "Display" },
      { name: "Display" },
    ],
  },

  {
    name: "Account",
    icon: <VscAccount />,
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
    <span></span>
  </header>
);

const NavButton = ({ onClick, name, icon, isActive, hasSubNav, linkTo }) => (
  <button
    type="button"
    onClick={() => {
      const argument = linkTo ? linkTo : name;
      onClick && onClick(argument);
    }}
    className={isActive ? "active" : ""}
  >
    {icon && <Icon icon={icon} />}
    <span>{name}</span>
    {hasSubNav && <Icon icon={<MdExpandMore />} />}
  </button>
);

const SubMenu = ({ item, activeItem, handleClickLink }) => {
  const navRef = useRef(null);

  const isSubNavOpen = (item, items) =>
    items.some((i) => i === activeItem) || item === activeItem;

  return (
    <div
      className={`sub-nav ${
        isSubNavOpen(item.name, item.items) ? "open" : "container-menu"
      }`}
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
            linkTo={subItem.linkTo}
            onClick={handleClickLink}
          />
        ))}
      </div>
    </div>
  );
};

function Sidebar({ toggleSidebar }) {
  const [activeItem, setActiveItem] = useState("");
  const navigate = useNavigate();

  const handleClick = (item) => {
    setActiveItem(item !== activeItem ? item : "");
  };

  const handleClickLink = (link) => {
    navigate(link);
    //toggleSidebar();
  };

  return (
    <aside className="sidebar">
      <NavHeader toggleSidebar={toggleSidebar} />
      {menuItems.map((item, index) => (
        <div key={index}>
          {!item.items && (
            <NavButton
              onClick={item.linkTo ? handleClickLink : handleClick}
              name={item.name}
              icon={item.icon}
              isActive={activeItem === item.name}
              hasSubNav={!!item.items}
              linkTo={item.linkTo}
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
                handleClickLink={handleClickLink}
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
