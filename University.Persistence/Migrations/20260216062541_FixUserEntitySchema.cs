using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace University.Data.Migrations
{
    /// <inheritdoc />
    public partial class FixUserEntitySchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CoursesLecturers_Lecturers_LectureId",
                schema: "dbo",
                table: "CoursesLecturers");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentCourses_Students_StudentId",
                schema: "dbo",
                table: "StudentCourses");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentGrades_Students_StudentId",
                schema: "dbo",
                table: "StudentGrades");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentLecturers_Lecturers_LecturerId",
                schema: "dbo",
                table: "StudentLecturers");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentLecturers_Students_StudentId",
                schema: "dbo",
                table: "StudentLecturers");

            migrationBuilder.DropTable(
                name: "Lecturers",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Students",
                schema: "dbo");

            migrationBuilder.DropColumn(
                name: "IsAdmin",
                schema: "dbo",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "LecturerId",
                schema: "dbo",
                table: "StudentLecturers",
                newName: "LecturerUserId");

            migrationBuilder.RenameColumn(
                name: "StudentId",
                schema: "dbo",
                table: "StudentLecturers",
                newName: "StudentUserId");

            migrationBuilder.RenameIndex(
                name: "IX_StudentLecturers_LecturerId",
                schema: "dbo",
                table: "StudentLecturers",
                newName: "IX_StudentLecturers_LecturerUserId");

            migrationBuilder.RenameColumn(
                name: "StudentId",
                schema: "dbo",
                table: "StudentGrades",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_StudentGrades_StudentId",
                schema: "dbo",
                table: "StudentGrades",
                newName: "IX_StudentGrades_UserId");

            migrationBuilder.RenameColumn(
                name: "StudentId",
                schema: "dbo",
                table: "StudentCourses",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "LectureId",
                schema: "dbo",
                table: "CoursesLecturers",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_CoursesLecturers_LectureId",
                schema: "dbo",
                table: "CoursesLecturers",
                newName: "IX_CoursesLecturers_UserId");

            migrationBuilder.AddColumn<int>(
                name: "UserType",
                schema: "dbo",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_CoursesLecturers_Users_UserId",
                schema: "dbo",
                table: "CoursesLecturers",
                column: "UserId",
                principalSchema: "dbo",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentCourses_Users_UserId",
                schema: "dbo",
                table: "StudentCourses",
                column: "UserId",
                principalSchema: "dbo",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentGrades_Users_UserId",
                schema: "dbo",
                table: "StudentGrades",
                column: "UserId",
                principalSchema: "dbo",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentLecturers_Users_LecturerUserId",
                schema: "dbo",
                table: "StudentLecturers",
                column: "LecturerUserId",
                principalSchema: "dbo",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentLecturers_Users_StudentUserId",
                schema: "dbo",
                table: "StudentLecturers",
                column: "StudentUserId",
                principalSchema: "dbo",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CoursesLecturers_Users_UserId",
                schema: "dbo",
                table: "CoursesLecturers");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentCourses_Users_UserId",
                schema: "dbo",
                table: "StudentCourses");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentGrades_Users_UserId",
                schema: "dbo",
                table: "StudentGrades");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentLecturers_Users_LecturerUserId",
                schema: "dbo",
                table: "StudentLecturers");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentLecturers_Users_StudentUserId",
                schema: "dbo",
                table: "StudentLecturers");

            migrationBuilder.DropColumn(
                name: "UserType",
                schema: "dbo",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "LecturerUserId",
                schema: "dbo",
                table: "StudentLecturers",
                newName: "LecturerId");

            migrationBuilder.RenameColumn(
                name: "StudentUserId",
                schema: "dbo",
                table: "StudentLecturers",
                newName: "StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_StudentLecturers_LecturerUserId",
                schema: "dbo",
                table: "StudentLecturers",
                newName: "IX_StudentLecturers_LecturerId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                schema: "dbo",
                table: "StudentGrades",
                newName: "StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_StudentGrades_UserId",
                schema: "dbo",
                table: "StudentGrades",
                newName: "IX_StudentGrades_StudentId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                schema: "dbo",
                table: "StudentCourses",
                newName: "StudentId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                schema: "dbo",
                table: "CoursesLecturers",
                newName: "LectureId");

            migrationBuilder.RenameIndex(
                name: "IX_CoursesLecturers_UserId",
                schema: "dbo",
                table: "CoursesLecturers",
                newName: "IX_CoursesLecturers_LectureId");

            migrationBuilder.AddColumn<bool>(
                name: "IsAdmin",
                schema: "dbo",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "Lecturers",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lecturers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Lecturers_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "dbo",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Students",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Students_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "dbo",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Lecturers_UserId",
                schema: "dbo",
                table: "Lecturers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Students_UserId",
                schema: "dbo",
                table: "Students",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_CoursesLecturers_Lecturers_LectureId",
                schema: "dbo",
                table: "CoursesLecturers",
                column: "LectureId",
                principalSchema: "dbo",
                principalTable: "Lecturers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentCourses_Students_StudentId",
                schema: "dbo",
                table: "StudentCourses",
                column: "StudentId",
                principalSchema: "dbo",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentGrades_Students_StudentId",
                schema: "dbo",
                table: "StudentGrades",
                column: "StudentId",
                principalSchema: "dbo",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentLecturers_Lecturers_LecturerId",
                schema: "dbo",
                table: "StudentLecturers",
                column: "LecturerId",
                principalSchema: "dbo",
                principalTable: "Lecturers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentLecturers_Students_StudentId",
                schema: "dbo",
                table: "StudentLecturers",
                column: "StudentId",
                principalSchema: "dbo",
                principalTable: "Students",
                principalColumn: "Id");
        }
    }
}
