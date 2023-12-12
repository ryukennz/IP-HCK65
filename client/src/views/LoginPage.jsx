export default function LoginPage() {
  return (
    <>
      <section className="relative flex flex-wrap lg:h-screen lg:items-center">
        <div className="w-full px-4 py-12 border sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg border-opacity-70 backdrop-blur bg-secondary">
          <div className="max-w-lg mx-auto text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">
                SIGN IN
            </h1>
            <p className="mt-4 text-gray-500">
              Sign in to your account
            </p>
          </div>
          <form className="max-w-md mx-auto mt-8 mb-0 space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm pe-12"
                  placeholder="Enter email"
                />
                <span className="absolute inset-y-0 grid px-4 end-0 place-content-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm pe-12"
                  placeholder="Enter password"
                />
                <span className="absolute inset-y-0 grid px-4 end-0 place-content-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                No account? 
                <a className="underline" href="">
                  Sign up
                </a>
              </p>
              <button
                type="submit"
                className="inline-block px-5 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
        <div className="relative w-full h-64 sm:h-96 lg:h-full lg:w-1/2">
          <img
            alt="Welcome"
            src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            className="absolute inset-0 object-cover w-full h-full"
          />
        </div>
      </section>
    </>
  );
}
