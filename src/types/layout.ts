export interface MainLayoutProps {
  children: React.ReactNode;
}

export interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

export interface CopyrightProps {
  collapsed: boolean;
}
