'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormatLogoIfNoImage } from "../../../utils/Formataion"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import React, { useState } from "react"
import NotificationPanel from "../Notification/NotificationPanel"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Bell, ChevronDown, Cog, Search, Users } from "lucide-react"
import CompanyUsers from "../company/Users/CompanyUsers"
import SalesOrderCreation from "../company/modules/Sales/Sales-Orders/SalesOrdersCreation"
import CompanyConfig from "../company/Config/Company-Config"
import Dashboard from "../company/Dashboard/DashBoard"

const userImageURL = "";
const userName = "Test";
const emptyUserName = FormatLogoIfNoImage(userName);
const companyName = "Teste Company";
const emptyCompanyName = FormatLogoIfNoImage(companyName);


export default function Template() {
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);
  const [selectedComponent, setSelectedComponent] = useState("Dashboard");

  const renderComponent = () => {
    switch (selectedComponent) {
      case "Dashboard":
        return <Dashboard />;
      case "Company-users":
        return <CompanyUsers />;
      case "Sales-Orders":
        return //<SalesOrderCreation />
      case "Company-Config":
        return <CompanyConfig />
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <div className="flex items-center p-1">
          <a href="" className="flex items-center p-4">
            <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-[1.58]">
              {emptyCompanyName}
            </div>
            <span className="ml-2 font-semibold">{companyName}</span>
          </a>
        </div>
        <nav className="p-4 flex flex-col ">
          <h2 className="text-xs font-semibold text-gray-500 uppercase mb-4">Main Menu</h2>
          <ul className="space-y-2">
            <li>
              <Button variant="ghost" className="w-full justify-start bg-gray-100"
              onClick={() => setSelectedComponent("Dashboard")}>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                Dashboard
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start" 
              onClick={() => setSelectedComponent("Sales-Orders")}>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Orders  
              </Button>
            </li> 
            <li>
              <Button variant="ghost" className="w-full justify-start" 
              onClick={() => setSelectedComponent("Requests")}>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Requests
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start"
              onClick={() => setSelectedComponent("Shop-floor")}>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Shop Floor
              </Button> 
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
                Production Plan
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start" 
              onClick={() => setSelectedComponent("Forecast")}>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8v8m-4-5v5M8 8v8m-5 0h18a2 2 0 002-2V6a2 2 0 00-2-2H3a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Forecast
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start"
              onClick={() => setSelectedComponent("Company-users")}>
                <Users className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" />
                Company Users
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start"
              onClick={() => setSelectedComponent("Company-Config")}>
                <Cog className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" />
                Configurations
              </Button>
            </li>
          </ul> 
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/company" className="p-1">
                    <div className="w-8 h-8 bg-blue-600 text-white font-semibold flex items-center justify-center rounded-[1.58]">
                      {emptyCompanyName}
                    </div>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-pretty text-base">Users</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Buscar..."
                className="w-80 pl-10 text-[#111111] bg-[#F7F9FB] border-none"
              />
              <Search className="absolute left-3 top-2 h-5 w-5 text-[#969696] text-opacity-90" />
            </div>
            <Sheet open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <NotificationPanel />
              </SheetContent>
            </Sheet>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src={userImageURL} />
                    <AvatarFallback className="bg-[#0085FF] bg-opacity-10 text-[#0085FF] text-sm font-bold">
                      {emptyUserName}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-block">{userName}</span>
                  <ChevronDown className="h-5 w-5" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Profile</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <a href="">
                    Profile
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="">
                    Configurations
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="">
                    Logout
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="overflow-y-auto custom-scrollbar">
        {renderComponent()}
        </div>
      </div>
    </div>
  )
}