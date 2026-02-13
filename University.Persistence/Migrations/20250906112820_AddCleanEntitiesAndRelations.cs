using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace University.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddCleanEntitiesAndRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "dbo");

            migrationBuilder.EnsureSchema(
                name: "dbo");

            migrationBuilder.CreateTable(
                name: "Courses",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CourseName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Courses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Faculties",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FacultyName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Faculties", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Lecturers",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    SurName = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Age = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lecturers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(70)", maxLength: 70, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FacultyCourse",
                schema: "dbo",
                columns: table => new
                {
                    FacultyId = table.Column<int>(type: "int", nullable: false),
                    CourseId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FacultyCourse", x => new { x.CourseId, x.FacultyId });
                    table.ForeignKey(
                        name: "FK_FacultyCourse_Courses_CourseId",
                        column: x => x.CourseId,
                        principalSchema: "dbo",
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FacultyCourse_Faculties_FacultyId",
                        column: x => x.FacultyId,
                        principalSchema: "dbo",
                        principalTable: "Faculties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CoursesLecturers",
                schema: "dbo",
                columns: table => new
                {
                    CourseId = table.Column<int>(type: "int", nullable: false),
                    LectureId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CoursesLecturers", x => new { x.CourseId, x.LectureId });
                    table.ForeignKey(
                        name: "FK_CoursesLecturers_Courses_CourseId",
                        column: x => x.CourseId,
                        principalSchema: "dbo",
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CoursesLecturers_Lecturers_LectureId",
                        column: x => x.LectureId,
                        principalSchema: "dbo",
                        principalTable: "Lecturers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserProfiles",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Age = table.Column<int>(type: "int", nullable: false),
                    FacultyId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProfiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserProfiles_Faculties_FacultyId",
                        column: x => x.FacultyId,
                        principalSchema: "dbo",
                        principalTable: "Faculties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserProfiles_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "dbo",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UsersCourses",
                schema: "dbo",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CourseId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersCourses", x => new { x.UserId, x.CourseId });
                    table.ForeignKey(
                        name: "FK_UsersCourses_Courses_CourseId",
                        column: x => x.CourseId,
                        principalSchema: "dbo",
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UsersCourses_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "dbo",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UsersLecturers",
                schema: "dbo",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    LecturerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersLecturers", x => new { x.UserId, x.LecturerId });
                    table.ForeignKey(
                        name: "FK_UsersLecturers_Lecturers_LecturerId",
                        column: x => x.LecturerId,
                        principalSchema: "dbo",
                        principalTable: "Lecturers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UsersLecturers_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "dbo",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CoursesLecturers_LectureId",
                schema: "dbo",
                table: "CoursesLecturers",
                column: "LectureId");

            migrationBuilder.CreateIndex(
                name: "IX_FacultyCourse_FacultyId",
                schema: "dbo",
                table: "FacultyCourse",
                column: "FacultyId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProfiles_FacultyId",
                schema: "dbo",
                table: "UserProfiles",
                column: "FacultyId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProfiles_UserId",
                schema: "dbo",
                table: "UserProfiles",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UsersCourses_CourseId",
                schema: "dbo",
                table: "UsersCourses",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_UsersLecturers_LecturerId",
                schema: "dbo",
                table: "UsersLecturers",
                column: "LecturerId");

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "Users",
                columns: new[] { "Id", "Username", "PasswordHash", "IsActive" },
                columnTypes: new[] { "int", "nvarchar(20)", "nvarchar(70)", "bit" }, // ADD THIS
                values: new object[,]
                {
                    { 1, "university-admin", "$2a$11$y9J8rFwDESrMfhKNAho/peEU2Xn0grSwO6ZIlvt2HHG9YAZt1XFtC", true },
                });


            migrationBuilder.InsertData(
                schema: "dbo",
                table: "Faculties",
                columns: new[] { "Id", "FacultyName", "IsActive" },
                columnTypes: new[] { "int", "nvarchar(50)", "bit" }, // ADD THIS
                values: new object[,]
                {
                    { 1, "უნივერსიტეტის ადმინისტრაცია", true },
                });

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "UserProfiles",
                columns: new[] { "Id", "UserId", "FirstName", "LastName", "Age", "FacultyId" },
                columnTypes: new[] { "int", "int", "nvarchar(50)", "nvarchar(50)", "int", "int" }, // ADD THIS
                values: new object[,]
                {
                    { 1, 1, "უნივერსიტეტის", "ადმინისტრატორი", 0, 1 },
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CoursesLecturers",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "FacultyCourse",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "UserProfiles",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "UsersCourses",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "UsersLecturers",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Faculties",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Courses",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Lecturers",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Users",
                schema: "dbo");
        }
    }
}
