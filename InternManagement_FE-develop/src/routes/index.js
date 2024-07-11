export const routeConfigs = [
    {
        parent: 'admin',
        children: [
            {
                name: "admin-home",
                path: "/admin",
            },
            {
                name: "admin-business",
                path: "/admin/manage-business",
            },
            {
                name: "admin-intern",
                path: "/admin/manage-intern",
            },
        ],
        isGuarded: true,
        role: "ADMIN"
    },
    {
        parent: 'business',
        children: [
            {
                name: "business-home",
                path: "/business",
            },
            {
                name: "business-intern",
                path: "/business/manage-intern",
            },
        ],
        isGuarded: true,
        role: "BUSINESS"
    },
    {
        parent: 'student',
        children: [
            {
                name: "student-home",
                path: "/student",
            },
            {
                name: "student-contact",
                path: "/student/contact",
            },
            {
                name: "student-library",
                path: "/student/library",
            },
            {
                name: "student-intern",
                path: "/student/intern",
            },
        ],
        isGuarded: true,
        role: "STUDENT"
    },
    {
        parent: 'teacher',
        children: [
            {
                name: "teacher-home",
                path: "/teacher",
            },
            {
                name: "teacher-score",
                path: "/teacher/manage-score",
            },
            {
                name: "teacher-contact",
                path: "/teacher/contact",
            },
        ],
        isGuarded: true,
        role: "TEACHER"
    },
    {
        parent: "login",
        children: null,
        name: "login",
        path: "/login",
        isGuarded: false,
        role: null,
    },
    {
        parent: "reset-password",
        children: null,
        name: "reset-password",
        path: "/reset-password",
        isGuarded: false,
        role: null,
    }
];