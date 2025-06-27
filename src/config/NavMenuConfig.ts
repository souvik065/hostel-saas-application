import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faBell,
  faBuildingNgo,
  faBuildingShield,
  faCalendarDay,
  faComments,
  faFileInvoice,
  faHandshake,
  faHome,
  faHotel,
  faIdCard,
  faInbox,
  faMoneyBills,
  faPeopleRoof,
  faUser,
  faUserShield,
} from '@fortawesome/free-solid-svg-icons';

export interface SubmenuItem {
  title: string;
  path: string;
  icon: IconProp;
  allowedRoles: string[];
}

export interface SidebarItem {
  title: string;
  path: string;
  icon: IconProp;
  allowedRoles: string[];
  subitems?: SubmenuItem[];
}
export const NavMenuItems: SidebarItem[] = [
  // {
  //   title: 'Dashboard',
  //   path: '/admin/dashboard',
  //   icon: faHome,
  // },
  {
    title: 'Hostel',
    path: '/hostel',
    icon: faHotel,
    allowedRoles: ['Admin', 'Warden', 'Super Admin'],
    // subitems: [
    //   {
    //     title: 'Hostel',
    //     path: '/hostel',
    //     icon: faBuildingNgo,
    //   },
    //   {
    //     title: 'Building',
    //     path: '/hostel/building',
    //     icon: faBuildingNgo,
    //   },
    //   {
    //     title: 'Floor',
    //     path: '/hostel/floor',
    //     icon: faUser,
    //   },
    //   {
    //     title: 'Rooms',
    //     path: '/hostel/rooms',
    //     icon: faUser,
    //   },
    //   {
    //     title: 'Assign Warden',
    //     path: '/hostel/assign-warden',
    //     icon: faUser,
    //   },
    // ],
  },
  // {
  //   title: 'Guardian',
  //   path: '/guardian',
  //   icon: faPeopleRoof,
  //   subitems: [
  //     {
  //       title: 'Leave',
  //       path: '/guardian/leave',
  //       icon: faUser,
  //     },
  //     {
  //       title: 'Compliants',
  //       path: '/guardian/compliants',
  //       icon: faUser,
  //     },
  //     {
  //       title: 'Profile',
  //       path: '/guardian/profile',
  //       icon: faUser,
  //     },
  //     {
  //       title: 'Leave Application',
  //       path: '/guardian/leave-application',
  //       icon: faUser,
  //     },
  //     {
  //       title: 'Leave Approval',
  //       path: '/guardian/leave-approval',
  //       icon: faUser,
  //     },
  //     {
  //       title: 'Apply Compliant',
  //       path: '/guardian/apply-compliant',
  //       icon: faUser,
  //     },
  //     {
  //       title: 'Fee Structure',
  //       path: '/guardian/fee-structure',
  //       icon: faUser,
  //     },
  //     {
  //       title: 'Fees',
  //       path: '/guardian/fees',
  //       icon: faUser,
  //     },
  //     {
  //       title: 'Compliant',
  //       path: '/guardian/compliant',
  //       icon: faUser,
  //     },
  //     {
  //       title: 'Late Coming',
  //       path: '/guardian/late-compliant',
  //       icon: faUser,
  //     },
  //   ],
  // },
  {
    title: 'Faclities',
    path: '/facility',
    icon: faBuildingShield,
    allowedRoles: ['Admin', 'Warden', 'Super Admin'],
  },
  // {
  //   title: 'Notification',
  //   path: '/admin/notifications',
  //   icon: faBell,
  // },
  {
    title: 'Warden',
    path: '/warden',
    icon: faUserShield,
    allowedRoles: ['Admin', 'Super Admin'],
  },
  {
    title: 'Invoice',
    path: '/invoice',
    icon: faFileInvoice,
    allowedRoles: ['Warden', 'Admin', 'Super Admin'],
  },
  // {
  //   title: 'Complaints',
  //   path: '/admin/complaints',
  //   icon: faEnvelopeOpenText,
  // },
  // {
  //   title: 'Leaves',
  //   path: '/leave/warden-approval',
  //   icon: faCalendarDay,
  //   allowedRoles: ['Admin', 'Warden', 'Super Admin'],
  //   subitems: [
  //     {
  //       title: 'Leave Approval',
  //       path: '/leave/approval',
  //       icon: faUser,
  //       allowedRoles: ['Admin', 'Warden'],
  //     },
  //     {
  //       title: 'Late Comming Approval',
  //       path: '/late-comming/approval',
  //       icon: faUser,
  //       allowedRoles: ['Admin', 'Warden', 'Super Admin'],
  //     },
  //   ],
  // },
  // {
  //   title: 'Aggrements',
  //   path: '/admin/aggrements',
  //   icon: faHandshake,
  // },
  // {
  //   title: 'Dashboard',
  //   path: 'warden/',
  //   icon: faHome,
  // },
  {
    title: 'Enquiry',
    path: '/enquiry',
    icon: faComments,
    allowedRoles: ['Admin', 'Warden', 'Super Admin'],
  },
  {
    title: 'Registration',
    path: '/registration',
    icon: faIdCard,
    allowedRoles: ['Admin', 'Warden', 'Super Admin'],
  },
  {
    title: 'Fees Structure',
    path: '/fees-structure',
    icon: faMoneyBills,
    allowedRoles: ['Admin', 'Warden', 'Super Admin'],
  },
  // {
  //   title: 'Notification',
  //   path: 'warden/notifications',
  //   icon: faBell,
  // },
  // {
  //   title: 'Profile',
  //   path: 'warden/myprofile',
  //   icon: faUser,
  // },
  // {
  //   title: 'Complaint',
  //   path: 'warden/complaints',
  //   icon: faPersonCircleExclamation,
  // },
  // {
  //   title: 'User Complaint',
  //   path: 'warden/complaints/user',
  //   icon: faPersonCircleXmark,
  // },
  // {
  //   title: 'Leaves',
  //   path: 'warden/leaves',
  //   icon: faCalendarDay,
  //   subitems: [
  //     {
  //       title: 'Leave Approval',
  //       path: 'warden/leave/approval',
  //       icon: faUser,
  //     },
  //     {
  //       title: 'Leave Apply',
  //       path: 'warden/leave/apply',
  //       icon: faUser,
  //     },
  //     {
  //       title: 'Late Comming Approval',
  //       path: 'warden/late/approval',
  //       icon: faUser,
  //     },
  //   ],
  // },
  // {
  //   title: 'My Profile',
  //   path: 'hostelite/myprofie',
  //   icon: faUser,
  // },
  // {
  //   title: 'Notification',
  //   path: 'hostelite/notifications',
  //   icon: faUser,
  // },
  // {
  //   title: 'Complaints',
  //   path: 'hostelite/complaints',
  //   icon: faUser,
  // },
  {
    title: 'Leaves',
    path: '/leaves',
    icon: faCalendarDay,
    allowedRoles: ['Warden', 'Hostelite', 'Super Admin'],
    subitems: [
      {
        title: 'Leave Apply',
        path: '/leave/apply-leave',
        icon: faUser,
        allowedRoles: ['Warden', 'Hostelite', 'Super Admin'],
      },
      {
        title: 'Leave Approval',
        path: '/leave/approve-leave',
        icon: faUser,
        allowedRoles: ['Parent', 'Warden', 'Super Admin'],
      },
      {
        title: 'Out Pass Apply',
        path: '/leave/apply-out-pass',
        icon: faUser,
        allowedRoles: ['Warden', 'Hostelite', 'Super Admin'],
      },
      {
        title: 'Out Pass Approval',
        path: '/leave/approve-out-pass',
        icon: faUser,
        allowedRoles: ['Parent', 'Warden', 'Super Admin'],
      },
    ],
  },

  {
    title: 'Complaint',
    path: '/complaint',
    icon: faCalendarDay,
    allowedRoles: ['Warden', 'Hostelite', 'Parent', 'Super Admin'],
  },

  {
    title: 'Profile',
    path: '/profile',
    icon: faUser,
    allowedRoles: ['Parent', 'Warden', 'Super Admin', 'Hostelite'],
  },
  {
    title: 'Agreement',
    path: '/agreement',
    icon: faHandshake,
    allowedRoles: ['Admin', 'Super Admin'],
  },

  // {
  //   title: 'Notification',
  //   path: 'parent/notifications',
  //   icon: faUser,
  // },
  // {
  //   title: 'Complaints',
  //   path: 'parent/complaints',
  //   icon: faUser,
  // },
  // {
  //   title: 'Leaves',
  //   path: 'parent/leaves',
  //   icon: faUser,
  //   subitems: [
  //     {
  //       title: 'Leave Approval',
  //       path: 'parent/leave/approval',
  //       icon: faUser,
  //     },
  //     {
  //       title: 'Late Comming Approval',
  //       path: 'parent/late/approval',
  //       icon: faUser,
  //     },
  //   ],
  // },
];
