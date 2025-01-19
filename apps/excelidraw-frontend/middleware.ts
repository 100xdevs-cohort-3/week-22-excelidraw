import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/', '/signin', '/signup'];
const protectedRoutes = ['/canvas', '/create-room', '/logout' , '/node_modulesjoin-room'];

export function middleware(req : NextRequest) {
  const token = req.cookies.get('token');
  const url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;

  const isAuthenticated = Boolean(token);

  if (!isAuthenticated && protectedRoutes.includes(pathname)) {
    url.pathname = '/'; 
    return NextResponse.redirect(url);
  }

  if (isAuthenticated && publicRoutes.includes(pathname) && pathname !== '/') {
    url.pathname = '/'; 
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/signin', '/signup', '/canvas', '/create-room', '/logout'],
};
