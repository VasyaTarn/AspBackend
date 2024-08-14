using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AspBackend.Migrations
{
    /// <inheritdoc />
    public partial class ChangeAppDateType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "appointmentDate",
                table: "Doctors",
                newName: "AppointmentDate");

            migrationBuilder.AlterColumn<string>(
                name: "AppointmentDate",
                table: "Doctors",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "IsClientEmpty",
                table: "Doctors",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AppointmentDate",
                table: "Doctors",
                newName: "appointmentDate");

            migrationBuilder.AlterColumn<string>(
                name: "IsClientEmpty",
                table: "Doctors",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "appointmentDate",
                table: "Doctors",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}
