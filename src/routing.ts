import { ROUTE_PATHS } from "./constants/url-config";
import { PERMISSION } from "./guards/role-guard";
import Accessory from "./pages/accessory/Accessory";
import BrandPage from "./pages/brand/BrandPage";
import CreateBrand from "./pages/brand/create/CreateBrand";
import EditBrand from "./pages/brand/edit/EditBrand";
import CategoryPage from "./pages/category/CategoryPage";
import CreateCategory from "./pages/category/create/CreateCategory";
import EditCategory from "./pages/category/edit/EditCategory";
import CreateCustomer from "./pages/customer/Create/CreateCustomer";
import CustomerPage from "./pages/customer/CustomerPage";
import EditCustomer from "./pages/customer/Edit/EditCustomer";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import HomePage from './pages/home/home';
import OrderPage from "./pages/order/Order";
import CreateOrder from "./pages/order/create/CreateOrder";
import CreateProduct from "./pages/product/create/CreateProduct";
import EditProduct from "./pages/product/edit/EditProduct";
import ProductPage from "./pages/product/productPage";
import ReceiptPage from "./pages/receipt/Receipt";
import CreateReceipt from "./pages/receipt/create/CreateReceipt";
import SignIn from './pages/sign-in/sign-in';
import SupplierPage from "./pages/supplier/Supplier";
import CreateSupplier from "./pages/supplier/create/CreateSupplier";
import EditSupplier from "./pages/supplier/edit/EditSupplier";
import UserPage from "./pages/user/User";
import CreateUser from "./pages/user/create/CreateUser";
import EditUserPage from "./pages/user/edit/EditUser";
import EditUser from "./pages/user/edit/EditUser";
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
        href: ROUTE_PATHS.ForgotPassword,
        exact: true,
        component: ForgotPassword,
        title: "ForgotPassword",
        permissions: [],
        loginRequired: false,
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
        href: ROUTE_PATHS.User,
        exact: true,
        component: UserPage,
        title: "User",
        permissions: [],
        loginRequired: true,
    },
    {
        href: ROUTE_PATHS.CreateUser,
        exact: true,
        component: CreateUser,
        title: "CreateUser",
        permissions: [],
        loginRequired: true,
    },
    {
        href: ROUTE_PATHS.EditUser,
        exact: true,
        component: EditUserPage,
        title: "EditUserPage",
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
        href: ROUTE_PATHS.Brand,
        exact: true,
        component: BrandPage,
        title: "Brand",
        permissions: [],
        loginRequired: true,
    },
    {
        href: ROUTE_PATHS.CreateBrand,
        exact: true,
        component: CreateBrand,
        title: "CreateBrand",
        permissions: [],
        loginRequired: true,
    },
    {
        href: ROUTE_PATHS.EditBrand,
        exact: true,
        component: EditBrand,
        title: "CreateBrand",
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
        href: ROUTE_PATHS.Receipt,
        exact: true,
        component: ReceiptPage,
        title: "Receipt",
        permissions: [],
        loginRequired: true,
    },
    {
        href: ROUTE_PATHS.CreateReceipt,
        exact: true,
        component: CreateReceipt,
        title: "CreateReceipt",
        permissions: [],
        loginRequired: true,
    },
    {
        href: ROUTE_PATHS.Supplier,
        exact: true,
        component: SupplierPage,
        title: "Supplier",
        permissions: [],
        loginRequired: true,
    },
    {
        href: ROUTE_PATHS.CreateSupplier,
        exact: true,
        component: CreateSupplier,
        title: "CreateSupplier",
        permissions: [],
        loginRequired: true,
    },
    {
        href: ROUTE_PATHS.EditSupplier,
        exact: true,
        component: EditSupplier,
        title: "EditSupplier",
        permissions: [],
        loginRequired: true,
    },

    {
        href: ROUTE_PATHS.Accessory,
        exact: true,
        component: Accessory,
        title: "Accessory",
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