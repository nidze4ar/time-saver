import React from 'react';
import { NavLink } from 'react-router-dom'
import { Menu, Icon  } from "antd";
import { mainL }  from './../../lang'
const { SubMenu } = Menu;

const Navigation = ({ lang }) => {
  return(
    <Menu theme='dark' mode="horizontal">
    <SubMenu
        title={
          <span className="submenu-title-wrapper">
            <Icon type="unordered-list" />
            { mainL[lang].task }
          </span>
        }
      >        
          <Menu.Item >      
            <NavLink to='/'>{ mainL[lang].schedule }</NavLink>
          </Menu.Item>
          <Menu.Item >      
            <NavLink to='/compl'>{ mainL[lang].job }</NavLink>
          </Menu.Item>        
          <Menu.Item >      
            <NavLink to='/'>{ mainL[lang].schedule }</NavLink>
          </Menu.Item>
          <Menu.Item >      
            <NavLink to='/'>{ mainL[lang].schedule }</NavLink>
          </Menu.Item>        
      </SubMenu>

    <SubMenu
        title={
          <span className="submenu-title-wrapper">
            <Icon type="bar-chart" />
            { mainL[lang].statistic }
          </span>
        }
      >        
          <Menu.Item >      
            <NavLink to='/'>{ mainL[lang].schedule }</NavLink>
          </Menu.Item>
          <Menu.Item >      
            <NavLink to='/'>{ mainL[lang].schedule }</NavLink>
          </Menu.Item>        
          <Menu.Item >      
            <NavLink to='/'>{ mainL[lang].schedule }</NavLink>
          </Menu.Item>
          <Menu.Item >      
            <NavLink to='/'>{ mainL[lang].schedule }</NavLink>
          </Menu.Item>        
      </SubMenu>

  

      <SubMenu
        title={
          <span className="submenu-title-wrapper">
            <Icon type="setting" />
            { mainL[lang].preference }
          </span>
        }
      >        
          <Menu.Item >      
            <NavLink to='/set'>{ mainL[lang].preference }</NavLink>
          </Menu.Item>
          <Menu.Item >      
            <NavLink to='/tep'>{ mainL[lang].tep }</NavLink>
          </Menu.Item>        
          <Menu.Item >      
           <NavLink to='/set'>{ mainL[lang].preference }</NavLink>
          </Menu.Item>
          <Menu.Item >      
           <NavLink to='/set'>{ mainL[lang].preference }</NavLink>
          </Menu.Item>        
      </SubMenu>
        
      <SubMenu
        title={
          <span className="submenu-title-wrapper">
            <Icon type="setting" />
            {mainL[lang].preference}
          </span>
        }
      >        
          <Menu.Item >      
            <NavLink to='/set'>{mainL[lang].preference}</NavLink>
          </Menu.Item>
          <Menu.Item >      
            <NavLink to='/set'>{mainL[lang].preference}</NavLink>
          </Menu.Item>        
          <Menu.Item >      
           <NavLink to='/set'>{mainL[lang].preference}</NavLink>
          </Menu.Item>
          <Menu.Item >      
           <NavLink to='/set'>{mainL[lang].preference}</NavLink>
          </Menu.Item>        
      </SubMenu>
      <SubMenu
        title={
          <span className="submenu-title-wrapper">
            <Icon type="setting" />
            {mainL[lang].preference}
          </span>
        }
      >        
          <Menu.Item >      
            <NavLink to='/set'>{mainL[lang].preference}</NavLink>
          </Menu.Item>
          <Menu.Item >      
            <NavLink to='/set'>{mainL[lang].preference}</NavLink>
          </Menu.Item>        
          <Menu.Item >      
           <NavLink to='/set'>{mainL[lang].preference}</NavLink>
          </Menu.Item>
          <Menu.Item >      
           <NavLink to='/set'>{mainL[lang].preference}</NavLink>
          </Menu.Item>        
      </SubMenu>

      <SubMenu
        title={
          <span className="submenu-title-wrapper">
            <Icon type="setting" />
            {mainL[lang].preference}
          </span>
        }
      >        
          <Menu.Item >      
            <NavLink to='/set'>{mainL[lang].preference}</NavLink>
          </Menu.Item>
          <Menu.Item >      
            <NavLink to='/set'>{mainL[lang].preference}</NavLink>
          </Menu.Item>        
          <Menu.Item >      
           <NavLink to='/set'>{mainL[lang].preference}</NavLink>
          </Menu.Item>
          <Menu.Item >      
           <NavLink to='/set'>{mainL[lang].preference}</NavLink>
          </Menu.Item>        
      </SubMenu>

      <SubMenu
        title={
          <span className="submenu-title-wrapper">
            <Icon type="setting" />
            {mainL[lang].preference}
          </span>
        }
      >        
          <Menu.Item >      
            <NavLink to='/set'>{mainL[lang].preference}</NavLink>
          </Menu.Item>
          <Menu.Item >      
            <NavLink to='/set'>{mainL[lang].preference}</NavLink>
          </Menu.Item>        
          <Menu.Item >      
           <NavLink to='/set'>{mainL[lang].preference}</NavLink>
          </Menu.Item>
          <Menu.Item >      
           <NavLink to='/set'>{mainL[lang].preference}</NavLink>
          </Menu.Item>        
      </SubMenu>
  </Menu>
  )
}
export default Navigation

