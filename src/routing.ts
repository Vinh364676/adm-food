import { ROUTE_PATHS } from "./constants/url-config";
import { PERMISSION } from "./guards/role-guard";

import CategoryPage from "./pages/category/CategoryPage";
import CreateCategory from "./pages/category/create/CreateCategory";
import EditCategory from "./pages/category/edit/EditCategory";
import CreateCustomer from "./pages/customer/Create/CreateCustomer";
import CustomerPage from "./pages/customer/CustomerPage";
import EditCustomer from "./pages/customer/Edit/EditCustomer";

import HomePage from './pages/home/home';
import OrderPage from "./pages/order/Order";
import CreateOrder from "./pages/order/create/CreateOrder";
import CreateProduct from "./pages/product/create/CreateProduct";
import EditProduct from "./pages/product/edit/EditProduct";
import ProductPage from "./pages/product/productPage";
import SignIn from './pages/sign-in/sign-in';

import VoucherPage from "./pages/voucher/Voucher";
import CreateVoucher from "./pages/voucher/create/CreateVoucher";
import EditVoucher from "./pages/voucher/edit/EditVoucher";

export interface Route {
    groupIndex?: number
    href: string
    exact: boolean
    component: any
    title: string
    hidden?: boolean
    icon?: any
    forAdmin?: boolean
    loginRequired?: boolean
    permissions: PERMISSION[]
    subMenu?: SubMenu[]
}

interface SubMenu {
    href: string
    title: string
}

const anonymousPage: Route[] = [
    {
        href: ROUTE_PATHS.SignIn,
        title: "",
        exact: true,
        component: SignIn,
        hidden: true,
        permissions: [],
        loginRequired: true,

    },
]

const authorizedPage: Route[] = [
    {
        href: ROUTE_PATHS.Home,
        exact: true,
        component: HomePage,
        title: "Home",
        permissions: [],
        loginRequired: true,
    },
  
    {
        href: ROUTE_PATHS.Order,
        exact: true,
        component: OrderPage,
        title: "Order",
        permissions: [],
        loginRequired: true,
    },
    {
        href: ROUTE_PATHS.CreateOrder,
        exact: true,
        component: CreateOrder,
        title: "CreateOrder",
        permissions: [],
        loginRequired: true,
    },

    {
        href: ROUTE_PATHS.Product,
        exact: true,
        component: ProductPage,
        title: "Product",
        permissions: [],
        loginRequired: true,
    },
    {
        href: ROUTE_PATHS.CreateProduct,
        exact: true,
        component: CreateProduct,
        title: "CreateProduct",
        permissions: [],
        loginRequired: true,
    },
    {
        href: ROUTE_PATHS.EditProduct,
        exact: true,
        component: EditProduct,
        title: "EditProduct",
        permissions: [],
        loginRequired: true,
    },
    {
        href: ROUTE_PATHS.Category,
        exact: true,
        component: CategoryPage,
        title: "Category",
        permissions: [],
        loginRequired: true,
    },
    {
        href: ROUTE_PATHS.CreateCategory,
        exact: true,
        component: CreateCategory,
        title: "CreateCategory",
        permissions: [],
        loginRequired: true,
    },
    {
        href: ROUTE_PATHS.EditCategory,
        exact: true,
        component: EditCategory,
        title: "EditCategory",
        permissions: [],
        loginRequired: true,
    },
   
    {
        href: ROUTE_PATHS.Customer,
        exact: true,
        component: CustomerPage,
        title: "Customer",
        permissions: [],
        loginRequired: true,
    },
    {
        href: ROUTE_PATHS.CreateCustomer,
        exact: true,
        component: CreateCustomer,
        title: "CreateCustomer",
        permissions: [],
        loginRequired: true,
    },
    {
        href: ROUTE_PATHS.EditCustomer,
        exact: true,
        component: EditCustomer,
        title: "EditCustomer",
        permissions: [],
        loginRequired: true,
    },
    {
        href: ROUTE_PATHS.Voucher,
        exact: true,
        component: VoucherPage,
        title: "VoucherPage",
        permissions: [],
        loginRequired: true,
    },
    {
        href: ROUTE_PATHS.CreateVoucher,
        exact: true,
        component: CreateVoucher,
        title: "CreateVoucher",
        permissions: [],
        loginRequired: true,
    },
    {
        href: ROUTE_PATHS.EditVoucher,
        exact: true,
        component: EditVoucher,
        title: "EditVoucher",
        permissions: [],
        loginRequired: true,
    },
]

export const routes: Route[] = [...anonymousPage, ...authorizedPage]