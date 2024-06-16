export type SiteConfig = typeof siteConfig & typeof siteConfigStudent;



export const siteConfig = {
  name: "Student and Teacher Intereaction",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/dashboard",
    },
    {
      label: "Assignments",
      href: "/assignments",
    },
  ],
};


export const siteConfigStudent = {
  name: "Sturdent and Teacher Intereaction",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/dashboard",
    },
  ],
};