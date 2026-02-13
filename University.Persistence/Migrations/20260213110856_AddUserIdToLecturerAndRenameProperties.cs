using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace University.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddUserIdToLecturerAndRenameProperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                schema: "dbo",
                table: "Lecturers");

            migrationBuilder.DropColumn(
                name: "SurName",
                schema: "dbo",
                table: "Lecturers");

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

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                schema: "dbo",
                table: "Lecturers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Lecturers_UserId",
                schema: "dbo",
                table: "Lecturers",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lecturers_Users_UserId",
                schema: "dbo",
                table: "Lecturers",
                column: "UserId",
                principalSchema: "dbo",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lecturers_Users_UserId",
                schema: "dbo",
                table: "Lecturers");

            migrationBuilder.DropIndex(
                name: "IX_Lecturers_UserId",
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

            migrationBuilder.DropColumn(
                name: "UserId",
                schema: "dbo",
                table: "Lecturers");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                schema: "dbo",
                table: "Lecturers",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SurName",
                schema: "dbo",
                table: "Lecturers",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");
        }
    }
}
