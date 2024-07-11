import { 
    faHouse, 
    faPersonChalkboard, 
    faBookmark, 
    faMessage, 
    faBuilding, 
    faTableList, 
    faArrowTrendUp,
    faBriefcase
} from "@fortawesome/free-solid-svg-icons"

const MENU_ITEMS = {
    home: {
        title: 'Trang chủ',
        icon: {
            name: faHouse,
            size: 'lg',
        },
        rolePaths: {
            admin: '/admin',
            business: '/business',
            teacher: '/teacher',
            student: '/student',
            "manage_app": '/manage-app'
        }
    },
    intern: {
        title: 'Thực tập',
        icon: {
            name: faPersonChalkboard,
            size: 'lg',
        },
        rolePaths: {
            admin: '/admin/manage-intern',
            business: '/business/manage-intern',
            teacher: '/teacher',
            student: '/student/intern',
            "manage_app": ''
        }
    },
    library: {
        title: 'Thư viện',
        icon: {
            name: faBookmark,
            size: 'lg',
        },
        rolePaths: {
            admin: '',
            business: '',
            teacher: '',
            student: '/student/library',
            "manage_app": ''
        }
    },
    contact: {
        title: 'Trao đổi',
        icon: {
            name: faMessage,
            size: 'lg',
        },
        rolePaths: {
            admin: '',
            business: '/business/contact',
            teacher: '/teacher/contact',
            student: '/student/contact',
            "manage_app": ''
        }
    },
    business: {
        title: 'Doanh nghiệp',
        icon: {
            name: faBuilding,
            size: 'lg',
        },
        rolePaths: {
            admin: '/admin/manage-business',
            business: '',
            teacher: '',
            student: '',
            "manage_app": ''
        }
    },
    score: {
        title: 'Bảng điểm',
        icon: {
            name: faTableList,
            size: 'lg',
        },
        rolePaths: {
            admin: '',
            business: '',
            teacher: '/teacher/manage-score',
            student: '',
            "manage_app": ''
        }
    },
    trending: {
        title: 'Xu hướng',
        icon: {
            name: faArrowTrendUp,
            size: 'lg',
        },
        rolePaths: {
            admin: '',
            business: '',
            teacher: '',
            student: '/student/job-trending',
            "manage_app": ''
        }
    },
    todo: {
        title: 'Gợi ý công việc',
        icon: {
            name: faBriefcase,
            size: 'lg',
        },
        rolePaths: {
            admin: '',
            business: '/business/todo',
            teacher: '',
            student: '/student/todo',
            "manage_app": ''
        }
    }
}

export const ADMIN_MENU = [
    MENU_ITEMS.home,
    MENU_ITEMS.intern,
    MENU_ITEMS.business,
]

export const TEACHER_MENU = [
    MENU_ITEMS.home,
    MENU_ITEMS.score,
    // MENU_ITEMS.contact
]

export const STUDENT_MENU = [
    MENU_ITEMS.home,
    MENU_ITEMS.trending,
    MENU_ITEMS.intern,
    MENU_ITEMS.library,
    MENU_ITEMS.contact,
    MENU_ITEMS.todo
]

export const BUSINESS_MENU = [
    MENU_ITEMS.home,
    MENU_ITEMS.intern,
    // MENU_ITEMS.todo,
    MENU_ITEMS.contact
]

export const MANAGE_APP_MENU = [
    MENU_ITEMS.home,
]