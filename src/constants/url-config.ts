
const API_URL = process.env.REACT_APP_API_ENDPOINT
enum ROUTE_PATHS {
	"Home" = "/",
	"SignIn" = "/sign-in",
	"SignUp" = "/sign-up",
	"ForgotPassword" = "/forgot-password",
	"Profile" = "/profile",
	// order
	"Order" = "/order",
	"CreateOrder" = "/order/create",

	// user
	"User" ="/user",
	"CreateUser" ="/user/create",
	"EditUser" = `/user/edit/:id`,
	// product
	"Product" = "/product",
	"CreateProduct" ="/product/create",
	"EditProduct" ="/product/edit/:id",
	//brand
	"Brand" = "/brand",
	"CreateBrand" = "/brand/create",
	"EditBrand" = `/brand/edit/:id`,
	// category
	"Category" = "/category",
	"CreateCategory" = "/category/create",
	"EditCategory" = "/category/edit/:id",
	// receipt
	"Receipt" = "/receipt",
	"CreateReceipt" = "/receipt/create",
	"EditReceipt" = "/receipt/edit",
	// supplier
	"Supplier" = "/supplier",
	"CreateSupplier" = "/supplier/create",
	"EditSupplier" = "/supplier/edit/:id",

	// accessory 
	"Accessory" = "/accessory",

	// Customer
	"Customer" = "/customer",
	"CreateCustomer" = "/customer/create",
	"EditCustomer" = "/customer/edit/:id",
	//Voucher
	"Voucher" = "/voucher",
	"CreateVoucher" = "/voucher/create",
	"EditVoucher" = "/voucher/edit/:id"
	
}

//this variable is using for params url
const ROUTE_DYNAMIC_VARIABLE_LIST = [":id"]

//this variable is using for replace params url with real data
enum ROUTE_DYNAMIC_VARIABLE {
	"id" = ":id",
}
export default API_URL

export { ROUTE_PATHS, ROUTE_DYNAMIC_VARIABLE_LIST, ROUTE_DYNAMIC_VARIABLE }
