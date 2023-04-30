// src/lucia.d.ts
/// <reference types="lucia-auth" />
declare namespace Lucia {
  type Auth = import('./lib/lucia').Auth;
  type UserAttributes = Omit<
    import('@prisma/client').Customer,
    'id' | 'password'
  >;
}
