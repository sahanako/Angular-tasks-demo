export const sideMenuList = [
    {
      title: "Dashboard",
      icon: "desktop_windows",
      link: "enterprise/dashboard",
    //   permission: UserPermissions?.viewDashboardEnt,
    },
    {
      title: "Dashboard",
      icon: "desktop_windows",
      link: "partner/dashboard",
    //   permission: UserPermissions?.viewDashboardPart,
    },
    {
      title: "Templates",
      icon: "file_copy",
      link: "enterprise/templates",
    //   permission: UserPermissions?.viewAllTemplatesEnt,
    },
    {
      title: "Initiate Request",
      icon: "nest_wake_on_press",
      link: "enterprise/initiate-request",
    //   permission: UserPermissions?.singleInitiateEnt,
    },
    {
      title: "Reverification",
      icon: "cycle",
      link: "enterprise/reverification",
    //   permission: UserPermissions?.recurringDataEnt,
    },
    {
      title: "Track requests",
      icon: "trending_up",
      link: "enterprise/track-requests",
    //   permission: UserPermissions?.statusReportEnt,
    },
    {
      title: "Reports",
      icon: "bar_chart_4_bars",
      link: "enterprise/reports",
    //   permission: UserPermissions?.report,
    },
    {
      title: "Reports",
      icon: "bar_chart_4_bars",
      link: "/reports",
    //   permission: UserPermissions?.statusReportEnt,
      subItem: [
        {
          title: "Summary",
          icon: "article",
          link: "/reports/summary",
        //   permission: UserPermissions?.summaryReportEnt,
        },
        {
          title: "Detailed",
          icon: "contract",
          link: "/reports/detailed",
        //   permission: UserPermissions?.detailedReportEnt,
        },
        {
          title: "History",
          icon: "update",
          link: "/reports/history",
          permission: "",
        },
      ],
    },
  ];