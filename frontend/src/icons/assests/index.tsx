import * as React from "react";
import DefaultAvatar from "./defaultAvatar";
import Notification from "./notification";
import SearchIcon from "./searchIcon";
import RightIcon from "./rightIcon";
import PauseIcon from "./pauseIcon";
import Dashboard from "./dashboard";
import Calender from "./calender";
import Reports from "./reports";
import Settings from "./settings";
import Support from "./support";
import TermsAndCondition from "./termsCondition";

const iconName = {
  defaultAvatar: {
    component: DefaultAvatar,
  },
  notification: {
    component: Notification,
  },
  searchIcon: {
    component: SearchIcon,
  },
  rightIcon: {
    component: RightIcon,
  },
  pauseIcon: {
    component: PauseIcon,
  },
  dashboard: {
    component: Dashboard,
  },
  calender: {
    component: Calender,
  },
  reports: {
    component: Reports,
  },
  settings: {
    component: Settings,
  },
  support: {
    component: Support,
  },
  terms: {
    component: TermsAndCondition,
  },
};

export default iconName;
