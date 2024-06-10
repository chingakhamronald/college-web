import { withAuth, NextRequestWithAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const { pathname } = request.nextUrl;
    const { token } = request.nextauth;

    console.log({ 'token': token, 'pathname': pathname });


    // Redirect to login if user is not authenticated
    if (!token) {
      return Response.redirect('/');
    }

    // Allow access to all pages for admin role
    if (token?.role === 'teacher') {
      return;
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Allow access if the user has any role
        return !!token;
      },
    },
  },

);


export const config = { matcher: ["/dashboard"] };