const Login = () => {
    return (
        <>
            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <a
                    href={route("login")}
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                    Sign in
                </a>
                <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                <a
                    href={route("register")}
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                    Create account
                </a>
            </div>
        </>
    );
};

export default Login;
