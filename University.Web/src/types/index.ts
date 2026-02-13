// Auth Models
export interface AuthModel {
    username: string;
    password?: string;
}

export interface AuthTokenResponse {
    accessToken: string;
    tokenType?: string;
    expiresIn?: number;
    refreshToken?: string;
    refreshTokenExpiresIn?: number;
    userName?: string;
    userId?: number;
    userType?: number; // Added
    roles?: string[];
}

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    errors?: string[];
    count?: number;
}

export interface GetDtoWithCount<T> {
    data: T;
    count: number;
}

// Common
export interface PagedResult<T> {
    items: T[];
    totalCount: number;
}

// User Models
export const UserType = {
    Admin: 0,
    Student: 1,
    Lecturer: 2
} as const;

export type UserType = (typeof UserType)[keyof typeof UserType];

export interface UserOnlyDto {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
}

export interface UserGetDto extends UserOnlyDto {
    faculty?: FacultyOnlyDto;
    lecturers: LecturerOnlyDto[];
    students?: UserOnlyDto[]; // Added for lecturer's students
    courses: CourseOnlyDto[];
    profilePictureUrl?: string;
    userType: UserType;
}

export interface UserPostDto {
    userName: string;
    firstName: string;
    lastName: string;
    age: number;
    facultyId: number;
    password?: string;
    userType: UserType;
    courseIds?: number[];
    lecturerIds?: number[];
    profilePictureUrl?: string;
}

export interface UserPutDto extends UserPostDto {
    id: number;
}

// Faculty Models
export interface FacultyOnlyDto {
    id?: number;
    facultyName?: string;
}

export interface FacultyGetDto extends FacultyOnlyDto {
    users: UserOnlyDto[];
    courses: CourseOnlyDto[];
}

export interface FacultyPostDto {
    facultyName: string;
}

export interface FacultyPutDto extends FacultyPostDto {
    id: number;
}

// Course Models
export interface CourseOnlyDto {
    id: number;
    courseName: string;
}

export interface CourseGetDto extends CourseOnlyDto {
    faculties: FacultyOnlyDto[];
    lecturers: LecturerOnlyDto[];
    users: UserOnlyDto[];
}

export interface CoursePostDto {
    courseName: string;
    facultyIds?: number[];
    lecturerIds?: number[];
    userIds?: number[];
}

export interface CoursePutDto extends CoursePostDto {
    id: number;
}

// Lecturer Models
export interface LecturerOnlyDto {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    email?: string;
}





// Assignment Models
export interface Assignment {
    id: number;
    title: string;
    description?: string;
    courseId: number;
    courseName?: string;
    maxPoints: number;
    dueDate?: string;
}

export interface Grade {
    id: number;
    assignmentId: number;
    assignmentTitle: string;
    userId: number;
    userName: string;
    points: number;
    feedback?: string;
    gradedDate: string;
}

// Schedule Models
export interface ClassSession {
    id: number;
    courseId: number;
    courseName?: string;
    dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
    startTime: string; // "HH:mm:ss"
    endTime: string; // "HH:mm:ss"
    location: string;
}

export interface ClassSessionPostDto {
    courseId: number;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    location: string;
}

export interface ClassSessionPutDto extends ClassSessionPostDto {
    id: number;
}

export interface ScheduleGetFilter {
    courseId?: number;
    userId?: number;
    studentId?: number;
    lecturerId?: number;
    dayOfWeek?: number;
    offset?: number;
    limit?: number;
}
