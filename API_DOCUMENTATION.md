# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### 1. Register Student
**POST** `/auth/register`

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "rollNumber": "CSE001",
  "password": "password123",
  "department": "Computer Science",
  "semester": 6,
  "phone": "9876543210"
}
```

Response (201):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "student": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "rollNumber": "CSE001"
  }
}
```

---

### 2. Login
**POST** `/auth/login`

Request body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response (200):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "student": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "rollNumber": "CSE001",
    "isTeacher": false
  }
}
```

---

### 3. Get Current User
**GET** `/auth/me` (Protected)

Response (200):
```json
{
  "success": true,
  "student": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "rollNumber": "CSE001",
    "department": "Computer Science",
    "semester": 6,
    "phone": "9876543210",
    "isTeacher": false,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## Student Endpoints

### 1. Get All Students
**GET** `/students`

Query parameters (optional):
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 10)

Response (200):
```json
{
  "success": true,
  "count": 25,
  "students": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "rollNumber": "CSE001",
      "department": "Computer Science",
      "semester": 6,
      "phone": "9876543210"
    }
  ]
}
```

---

### 2. Get Student by ID
**GET** `/students/:id`

Response (200):
```json
{
  "success": true,
  "student": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "rollNumber": "CSE001",
    "department": "Computer Science",
    "semester": 6,
    "phone": "9876543210",
    "profilePicture": "https://..."
  }
}
```

---

### 3. Update Student Profile
**PUT** `/students/:id` (Protected)

Request body (all optional):
```json
{
  "name": "Jane Doe",
  "department": "Electronics",
  "semester": 7,
  "phone": "9876543211",
  "profilePicture": "https://..."
}
```

Response (200):
```json
{
  "success": true,
  "message": "Student updated successfully",
  "student": { ... }
}
```

---

### 4. Delete Student
**DELETE** `/students/:id` (Protected)

Response (200):
```json
{
  "success": true,
  "message": "Student deleted successfully"
}
```

---

### 5. Get Students by Department
**GET** `/students/department/:department`

Example: `/students/department/Computer Science`

Response (200):
```json
{
  "success": true,
  "count": 15,
  "students": [ ... ]
}
```

---

## Feedback Endpoints

### 1. Create Feedback
**POST** `/feedback` (Protected)

Request body:
```json
{
  "subject": "Course Content Review",
  "feedbackType": "academic",
  "description": "The course content is comprehensive and well-structured...",
  "rating": 5,
  "teacher": "Dr. Smith",
  "isAnonymous": false,
  "tags": ["excellent", "interactive", "engaging"]
}
```

Response (201):
```json
{
  "success": true,
  "message": "Feedback created successfully",
  "feedback": {
    "_id": "507f1f77bcf86cd799439012",
    "student": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "rollNumber": "CSE001"
    },
    "subject": "Course Content Review",
    "feedbackType": "academic",
    "description": "The course content is comprehensive...",
    "rating": 5,
    "teacher": "Dr. Smith",
    "status": "pending",
    "tags": ["excellent", "interactive"],
    "comments": [],
    "isAnonymous": false,
    "createdAt": "2024-01-15T10:45:00Z"
  }
}
```

---

### 2. Get All Feedback
**GET** `/feedback`

Query parameters (optional):
- `status` - Filter by status (pending, in-review, resolved, closed)
- `feedbackType` - Filter by type (academic, behavioral, performance, general)
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 10)

Example: `/feedback?status=pending&feedbackType=academic&page=1`

Response (200):
```json
{
  "success": true,
  "count": 10,
  "total": 45,
  "pages": 5,
  "feedback": [ ... ]
}
```

---

### 3. Get Feedback by ID
**GET** `/feedback/:id`

Response (200):
```json
{
  "success": true,
  "feedback": {
    "_id": "507f1f77bcf86cd799439012",
    "student": { ... },
    "subject": "Course Content Review",
    "feedbackType": "academic",
    "description": "...",
    "rating": 5,
    "status": "pending",
    "comments": [
      {
        "_id": "507f1f77bcf86cd799439013",
        "userId": { ... },
        "name": "Admin",
        "comment": "Thank you for your feedback",
        "createdAt": "2024-01-15T11:00:00Z"
      }
    ],
    "tags": ["excellent"],
    "createdAt": "2024-01-15T10:45:00Z"
  }
}
```

---

### 4. Get User's Feedback
**GET** `/feedback/user/my-feedback` (Protected)

Response (200):
```json
{
  "success": true,
  "count": 3,
  "feedback": [ ... ]
}
```

---

### 5. Update Feedback
**PUT** `/feedback/:id` (Protected)

Request body (all optional):
```json
{
  "subject": "Updated Subject",
  "description": "Updated description...",
  "rating": 4,
  "status": "in-review",
  "teacher": "Dr. Johnson"
}
```

Response (200):
```json
{
  "success": true,
  "message": "Feedback updated successfully",
  "feedback": { ... }
}
```

---

### 6. Delete Feedback
**DELETE** `/feedback/:id` (Protected)

Response (200):
```json
{
  "success": true,
  "message": "Feedback deleted successfully"
}
```

---

### 7. Add Comment to Feedback
**POST** `/feedback/:id/comment` (Protected)

Request body:
```json
{
  "comment": "Thank you for your feedback. We will look into this matter."
}
```

Response (200):
```json
{
  "success": true,
  "message": "Comment added successfully",
  "feedback": {
    "_id": "507f1f77bcf86cd799439012",
    "comments": [
      {
        "_id": "507f1f77bcf86cd799439014",
        "userId": "507f1f77bcf86cd799439015",
        "name": "Admin",
        "comment": "Thank you for your feedback...",
        "createdAt": "2024-01-15T11:15:00Z"
      }
    ]
  }
}
```

---

### 8. Get Feedback Statistics
**GET** `/feedback/stats`

Response (200):
```json
{
  "success": true,
  "stats": {
    "totalFeedback": 45,
    "byStatus": [
      { "_id": "pending", "count": 20 },
      { "_id": "in-review", "count": 15 },
      { "_id": "resolved", "count": 8 },
      { "_id": "closed", "count": 2 }
    ],
    "byType": [
      { "_id": "academic", "count": 25 },
      { "_id": "behavioral", "count": 10 },
      { "_id": "performance", "count": 7 },
      { "_id": "general", "count": 3 }
    ],
    "avgRating": 4.2
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Please provide email and password"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Feedback not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing or invalid token |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal server error |

---

## Feedback Types

- `academic` - Academic feedback
- `behavioral` - Behavioral feedback
- `performance` - Performance feedback
- `general` - General feedback

---

## Feedback Status

- `pending` - Newly submitted feedback
- `in-review` - Currently being reviewed
- `resolved` - Issue has been addressed
- `closed` - Feedback closed/archived

---

## Rate Limiting

Currently no rate limiting implemented. Consider adding for production.

---

## Pagination Example

```
/feedback?page=2&limit=10
```

Will return feedback from result 11-20 (skipping first 10 results)
