import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

export const App = () => {
  const menulist = [
    { title: 'Pep', isSelected: false, route: '/pep' },
    { title: 'Matchory', isSelected: false, route: '/matchory' },
    { title: 'Searchv1', isSelected: false, route: '/searchv1' },
    { title: 'Scheduler', isSelected: false, route: '/ladder' },
    { title: 'JsonToPdf', isSelected: false, route: '/jsontopdf' },
    { title: 'Exp', isSelected: false, route: '/exp' },
  ];
  return (
    <div className="app flex flex-col w-[1200px]">
      <div className="welcome-home-container m-[12px] text-[24px] font-inter font-[700]">
        <span>My Components!</span>
      </div>
      <div className="list-menu-container flex gap-[12px] w-full font-inter font-[500] text-[19px] p-[12px] border border-[#08000]">
        {menulist.map((item, idx) => (
          <Link
            to={item.route}
            key={idx}
            className="menu-container cursor-pointer"
          >
            <span className="menu-item flex justify-center min-w-[87px] text-center border border-green-500 rounded py-[12px] px-[6px]">
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
