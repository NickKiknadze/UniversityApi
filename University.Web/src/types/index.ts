// Auth Models
export interface AuthModel {
    username?: string;
    password?: string;
}

export interface AuthTokenResponse {
    accessToken?: string;
    tokenType?: string;
    expiresIn?: number;
    refreshToken?: string;
    refreshTokenExpiresIn?: number;
}

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    innerException?: string;
    data?: T;
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
export interface UserOnlyDto {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
}

export interface UserGetDto extends UserOnlyDto {
    faculty?: FacultyOnlyDto;
    lecturers: LecturerOnlyDto[];
    courses: CourseOnlyDto[];
}

export interface UserPostDto {
    userName: string;
    firstName: string;
    lastName: string;
    age: number;
    facultyId: number;
    password?: string;
    courseIds?: number[];
    lecturerIds?: number[];
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
    name: string;
    surName: string;
    age: number;
}

export interface LecturerGetDto extends LecturerOnlyDto {
    users: UserOnlyDto[];
    courses: CourseOnlyDto[];
}

export interface LecturerPostDto {
    name: string;
    surName: string;
    age: number; // Assuming age is required based on GET DTO
    courseIds?: number[];
    userIds?: number[];
}

export interface LecturerPutDto extends LecturerPostDto {
    id: number;
}
