import React, { useRef, useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { IoIosAddCircleOutline, IoMdClose } from "react-icons/io";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { apiRecursosHumanos } from "../../services/apiRecursosHumanos";

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
    items: [
      { name: "Edit", linkTo: "edit/account" },
      { name: "Logout", linkTo: "/login" },
    ],
  },
];

const Icon = ({ icon }) => (
  <span className="material-symbols-outlined">{icon}</span>
);

const NavHeader = ({ user }) => (
  <header className="sidebar-header">
    <button type="button">
      <Icon icon={<IoMdClose />} />
      <span>{user}</span>
    </button>
  </header>
);

const NavButton = ({
  onClick,
  name,
  icon,
  isActive,
  hasSubNav,
  linkTo,
  user,
}) => {
  const handleClick = () => {
    if (user !== "user" || name !== "Create") {
      const argument = linkTo ? linkTo : name;
      onClick && onClick(argument);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={
        user !== "admin" && name === "Create"
          ? "disabled"
          : isActive
          ? "active"
          : ""
      }
    >
      {icon && <Icon icon={icon} />}
      <span>{name}</span>
      {hasSubNav && <Icon icon={<MdExpandMore />} />}
    </button>
  );
};

const SubMenu = ({ item, activeItem, handleClickLink, session }) => {
  const navRef = useRef(null);

  const isSubNavOpen = (item, items) =>
    items.some((i) => i.name === activeItem) || item === activeItem;

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
            user={session.user.app_metadata.userrole}
            onClick={handleClickLink}
          />
        ))}
      </div>
    </div>
  );
};

function Sidebar({ session, setSession }) {
  const navigate = useNavigate();
  const { signOut } = apiRecursosHumanos();
  const [activeItem, setActiveItem] = useState("");

  const handleClick = (item) => {
    setActiveItem(item !== activeItem ? item : "");
  };

  const handleClickLink = async (link) => {
    if (link === "/login") {
      try {
        await signOut();
        setSession(null);
      } catch (error) {
        console.error("Error during logout:", error);
        return;
      }
    }

    navigate(link);
  };

  return (
    <aside className="sidebar">
      <NavHeader user={session.user.app_metadata.userrole} />
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
              user={session.user.app_metadata.userrole}
            />
          )}
          {item.items && (
            <>
              <NavButton
                onClick={() => handleClick(item.name)}
                name={item.name}
                icon={item.icon}
                isActive={activeItem === item.name}
                hasSubNav={!!item.items}
                user={session.user.app_metadata.userrole}
              />
              <SubMenu
                session={session}
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
