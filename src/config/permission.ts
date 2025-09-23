export const ALL_PERMISSIONS = {
  PERMISSIONS: {
    GET_PAGINATE: { method: "GET", apiPath: '/api/permissions', module: "PERMISSIONS" },
    CREATE: { method: "POST", apiPath: '/api/permissions', module: "PERMISSIONS" },
    UPDATE: { method: "PATCH", apiPath: '/api/permissions/:id', module: "PERMISSIONS" },
    DELETE: { method: "DELETE", apiPath: '/api/permissions/:id', module: "PERMISSIONS" },
  },
  ROLES: {
    GET_PAGINATE: { method: "GET", apiPath: '/api/roles', module: "ROLES" },
    CREATE: { method: "POST", apiPath: '/api/roles', module: "ROLES" },
    UPDATE: { method: "PATCH", apiPath: '/api/roles/:id', module: "ROLES" },
    DELETE: { method: "DELETE", apiPath: '/api/roles/:id', module: "ROLES" },
  },
  USERS: {
    GET_PAGINATE: { method: "GET", apiPath: '/api/users', module: "USERS" },
    CREATE: { method: "POST", apiPath: '/api/users', module: "USERS" },
    UPDATE: { method: "PATCH", apiPath: '/api/users/:id', module: "USERS" },
    DELETE: { method: "DELETE", apiPath: '/api/users/:id', module: "USERS" },
  },
}

export const ALL_MODULES = {
  AUTH: 'AUTH',
  FILES: 'FILES',
  PERMISSIONS: 'PERMISSIONS',
  ROLES: 'ROLES',
  USERS: 'USERS',
}
