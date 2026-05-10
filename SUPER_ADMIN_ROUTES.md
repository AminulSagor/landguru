# Super Admin Routes

This document lists backend API routes that are related to or accessible by the `SUPER_ADMIN` role (including routes shared with `ADMIN`).

## Backend API Routes (prefix `/agents`)

### Admin / Super Admin Management (ADMIN, SUPER_ADMIN)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/agents/create-agent` | Create a new agent account. |
| `GET` | `/agents/admin/summary` | Get summary of all agents. |
| `GET` | `/agents/admin/all` | List all agents with filtering. |
| `PATCH` | `/agents/admin/bulk-status` | Bulk update agent statuses. |
| `POST` | `/agents/admin/export` | Export agent data to CSV/Excel. |
| `GET` | `/agents/admin/:id` | Get specific agent details by ID. |
| `PATCH` | `/agents/admin/:id` | Update agent details. |
| `PATCH` | `/agents/admin/:id/status` | Toggle single agent status. |
| `GET` | `/agents/admin/:id/completed-services` | Get history of completed services for an agent. |
| `GET` | `/agents/admin/:id/completed-services/export` | Export completed services history. |

### Agent Roles Management (SUPER_ADMIN)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/agents/agent-roles` | Create a new agent role type. |
| `GET` | `/agents/agent-roles` | List all agent role types. |
| `GET` | `/agents/agent-roles/:id` | Get details of a role type. |
| `PATCH` | `/agents/agent-roles/:id` | Update a role type. |
| `PATCH` | `/agents/agent-roles/:id/status` | Toggle role type status. |
| `DELETE` | `/agents/agent-roles/:id` | Delete a role type. |

## Frontend / Console (UI pages accessible to Super Admin)
- `Admin Console / Super Admin Dashboard` — Super-admin-specific dashboard components exist under the admin dashboard pages in the Next.js app (see admin dashboard and profile components).

## Notes
- Source: extracted from AGENT_ROUTES.md and code references in the frontend.
