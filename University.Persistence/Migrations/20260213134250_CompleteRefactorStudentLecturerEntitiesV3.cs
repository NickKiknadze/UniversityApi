using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace University.Data.Migrations
{
    /// <inheritdoc />
    public partial class CompleteRefactorStudentLecturerEntitiesV3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lecturers_Users_UserId",
                schema: "dbo",
                table: "Lecturers");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Users_UserId",
                schema: "dbo",
                table: "Students");

            migrationBuilder.DropTable(
                name: "UsersCourses",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "UsersLecturers",
                schema: "dbo");

            migrationBuilder.DropColumn(
                name: "Age",
                schema: "dbo",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "FirstName",
                schema: "dbo",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "LastName",
                schema: "dbo",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Age",
                schema: "dbo",
                table: "Lecturers");

            migrationBuilder.DropColumn(
                name: "FirstName",
                schema: "dbo",
                table: "Lecturers");

            migrationBuilder.DropColumn(
                name: "LastName",
                schema: "dbo",
                table: "Lecturers");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                schema: "dbo",
                table: "Students",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                schema: "dbo",
                table: "Lecturers",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "StudentLecturers",
                schema: "dbo",
                columns: table => new
                {
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    LecturerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentLecturers", x => new { x.StudentId, x.LecturerId });
                    table.ForeignKey(
                        name: "FK_StudentLecturers_Lecturers_LecturerId",
                        column: x => x.LecturerId,
                        principalSchema: "dbo",
                        principalTable: "Lecturers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_StudentLecturers_Students_StudentId",
                        column: x => x.StudentId,
                        principalSchema: "dbo",
                        principalTable: "Students",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_StudentLecturers_LecturerId",
                schema: "dbo",
                table: "StudentLecturers",
                column: "LecturerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lecturers_Users_UserId",
                schema: "dbo",
                table: "Lecturers",
                column: "UserId",
                principalSchema: "dbo",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Users_UserId",
                schema: "dbo",
                table: "Students",
                column: "UserId",
                principalSchema: "dbo",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lecturers_Users_UserId",
                schema: "dbo",
                table: "Lecturers");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Users_UserId",
                schema: "dbo",
                table: "Students");

            migrationBuilder.DropTable(
                name: "StudentLecturers",
                schema: "dbo");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                schema: "dbo",
                table: "Students",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "Age",
                schema: "dbo",
                table: "Students",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                schema: "dbo",
                table: "Students",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                schema: "dbo",
                table: "Students",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                schema: "dbo",
                table: "Lecturers",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "Age",
                schema: "dbo",
                table: "Lecturers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                schema: "dbo",
                table: "Lecturers",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                schema: "dbo",
                table: "Lecturers",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

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
                name: "IX_UsersCourses_CourseId",
                schema: "dbo",
                table: "UsersCourses",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_UsersLecturers_LecturerId",
                schema: "dbo",
                table: "UsersLecturers",
                column: "LecturerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lecturers_Users_UserId",
                schema: "dbo",
                table: "Lecturers",
                column: "UserId",
                principalSchema: "dbo",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Users_UserId",
                schema: "dbo",
                table: "Students",
                column: "UserId",
                principalSchema: "dbo",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
