# Agent Routes Documentation

This document lists all the routes related to the **Agent** role in both the Frontend (LandGuru Dashboard) and the Backend API.

---

## 🖥️ Frontend Routes (Next.js)
The following routes are accessible within the Agent Dashboard in the LandGuru application.

| Route | Description |
|-------|-------------|
| `/agent/dashboard` | Main dashboard with overview and statistics. |
| `/agent/tasks` | List of tasks assigned to the agent. |
| `/agent/tasks/details/[id]` | Detailed view of a specific task assignment. |
| `/agent/appointment` | Management of agent appointments (Upcoming/Past). |
| `/agent/notifications` | Notifications center for the agent. |
| `/agent/notifications/empty` | Empty state view for notifications. |
| `/agent/profile` | Agent profile overview. |
| `/agent/profile/settings` | Agent account and profile settings. |
| `/auth/agent/login` | Agent login page. |
| `/auth/agent/forgot-password` | Agent password recovery page. |
| `/auth/agent/signup` | Agent registration / signup page. |
| `/auth/agent/signin` | Alternate signin route (redirects to `/auth/agent/login`). |

---

## ⚙️ Backend API Routes (`/agents` Base)
All backend routes are prefixed with `/agents` and generally require JWT authentication and specific roles.

### 👤 Agent Self-Service
| Method | Endpoint | Description | Role Required |
|--------|----------|-------------|---------------|
| `GET` | `/agents/profile` | Get current agent's profile details. | `AGENT` |
| `PATCH` | `/agents/profile` | Update current agent's profile. | `AGENT` |
| `GET` | `/agents/assigned-location` | Get agent's assigned operational location. | `AGENT` |
| `GET` | `/agents/stats` | Get dashboard statistics. | `AGENT` |
| `GET` | `/agents/dashboard/today-schedule` | Get the agent's schedule for today. | `AGENT` |

### 📋 Task & Assignment Management
| Method | Endpoint | Description | Role Required |
|--------|----------|-------------|---------------|
| `GET` | `/agents/agent-task` | List all tasks/assignments for the agent. | `AGENT` |
| `GET` | `/agents/agent-task/:assignmentId` | Get details of a specific task. | `AGENT` |
| `PATCH` | `/agents/agent-task/:assignmentId/accept` | Accept an assigned task. | `AGENT` |
| `POST` | `/agents/agent-task/:assignmentId/appointment` | Set an appointment for a task. | `AGENT` |
| `POST` | `/agents/agent-task/:assignmentId/appointment/reschedule` | Reschedule an existing appointment. | `AGENT` |
| `GET` | `/agents/agent-task/:assignmentId/work-log` | Get work logs for a task. | `AGENT` |
| `POST` | `/agents/agent-task/:assignmentId/work-log` | Submit a new work log entry. | `AGENT` |
| `POST` | `/agents/agent-task/:assignmentId/submit-review` | Submit the task for admin review. | `AGENT` |

### 📅 Appointment Management
| Method | Endpoint | Description | Role Required |
|--------|----------|-------------|---------------|
| `GET` | `/agents/appointments` | List all appointments (Upcoming/Past). | `AGENT` |
| `GET` | `/agents/appointments/:assignmentId` | Get specific appointment details. | `AGENT` |

### 🛡️ Admin/Super Admin Management
| Method | Endpoint | Description | Role Required |
|--------|----------|-------------|---------------|
| `POST` | `/agents/create-agent` | Create a new agent account. | `ADMIN`, `SUPER_ADMIN` |
| `GET` | `/agents/admin/summary` | Get summary of all agents. | `ADMIN`, `SUPER_ADMIN` |
| `GET` | `/agents/admin/all` | List all agents with filtering. | `ADMIN`, `SUPER_ADMIN` |
| `PATCH` | `/agents/admin/bulk-status` | Bulk update agent statuses. | `ADMIN`, `SUPER_ADMIN` |
| `POST` | `/agents/admin/export` | Export agent data to CSV/Excel. | `ADMIN`, `SUPER_ADMIN` |
| `GET` | `/agents/admin/:id` | Get specific agent details by ID. | `ADMIN`, `SUPER_ADMIN` |
| `PATCH` | `/agents/admin/:id` | Update agent details. | `ADMIN`, `SUPER_ADMIN` |
| `PATCH` | `/agents/admin/:id/status` | Toggle single agent status. | `ADMIN`, `SUPER_ADMIN` |
| `GET` | `/agents/admin/:id/completed-services` | Get history of completed services for an agent. | `ADMIN`, `SUPER_ADMIN` |
| `GET` | `/agents/admin/:id/completed-services/export` | Export completed services history. | `ADMIN`, `SUPER_ADMIN` |

### 🎭 Agent Roles Management
| Method | Endpoint | Description | Role Required |
|--------|----------|-------------|---------------|
| `GET` | `/agents/agent-roles/active` | Get list of active agent roles. | Public/All |
| `POST` | `/agents/agent-roles` | Create a new agent role type. | `SUPER_ADMIN` |
| `GET` | `/agents/agent-roles` | List all agent role types. | `SUPER_ADMIN` |
| `GET` | `/agents/agent-roles/:id` | Get details of a role type. | `SUPER_ADMIN` |
| `PATCH` | `/agents/agent-roles/:id` | Update a role type. | `SUPER_ADMIN` |
| `PATCH` | `/agents/agent-roles/:id/status` | Toggle role type status. | `SUPER_ADMIN` |
| `DELETE` | `/agents/agent-roles/:id` | Delete a role type. | `SUPER_ADMIN` |

---

## 🤝 Shared API Routes
Agents also have access to several general endpoints under the `/users` and other modules.

### `/users` Module
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/users/profile/me` | Get basic account profile. |
| `GET` | `/users/profile/summary` | Get account summary. |
| `PATCH` | `/users/profile/me` | Update basic profile information. |
| `PATCH` | `/users/profile/change-password` | Change account password. |
| `GET` | `/users/profile/:id` | View another user's profile (Public). |

### 🏠 Property Modules
Agents can also interact with Buy and Sell posts, often acting as intermediaries or having elevated viewing permissions.
- `/sell-posts`: View and manage property listings.
- `/buy-posts`: View and manage property requirements.
